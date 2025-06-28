import { Injectable, NotFoundException, ConflictException, GoneException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './url.entity';
import { Click } from './click.entity';
import * as crypto from 'crypto';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url) private urlRepo: Repository<Url>,
    @InjectRepository(Click) private clickRepo: Repository<Click>,
  ) {}

  async create(originalUrl: string, expiresAt?: Date, alias?: string) {
    let shortCode = alias;

    if (alias) {
      const exists = await this.urlRepo.findOne({ where: { shortCode: alias } });
      if (exists) throw new ConflictException('Alias already in use');
    } else {
      // Генерировать уникальный shortCode
      while (true) {
        shortCode = crypto.randomBytes(3).toString('hex');
        const exists = await this.urlRepo.findOne({ where: { shortCode } });
        if (!exists) break;
      }
    }

    const url = this.urlRepo.create({ originalUrl, shortCode, expiresAt });
    return this.urlRepo.save(url);
  }

  async findByCode(shortCode: string, ip: string) {
    const url = await this.urlRepo.findOne({ where: { shortCode } });
    if (!url) throw new NotFoundException('Short URL not found');

    if (url.expiresAt && url.expiresAt < new Date()) {
      throw new GoneException('Link expired');
    }

    url.clickCount++;
    await this.urlRepo.save(url);

    const click = this.clickRepo.create({ shortCode, ip });
    await this.clickRepo.save(click);

    return url;
  }

  async getInfo(shortCode: string) {
    const url = await this.urlRepo.findOne({ where: { shortCode } });
    if (!url) throw new NotFoundException('Short URL not found');
    return url;
  }

  async delete(shortCode: string) {
    const res = await this.urlRepo.delete({ shortCode });
    if (res.affected === 0) throw new NotFoundException('Short URL not found');
  }

  async getAnalytics(shortCode: string) {
    const url = await this.urlRepo.findOne({ where: { shortCode } });
    if (!url) throw new NotFoundException('Short URL not found');

    const clicks = await this.clickRepo.find({
      where: { shortCode },
      order: { timestamp: 'DESC' },
      take: 5,
    });

    return {
      clickCount: url.clickCount,
      lastIPs: clicks.map(c => c.ip),
    };
  }
}
