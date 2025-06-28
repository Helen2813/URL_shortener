import { Controller, Post, Body, Get, Param, Delete, Res, Ip } from '@nestjs/common';
import { UrlService } from './url.service';
import { Response } from 'express';
import { IsUrl, IsOptional, IsISO8601, IsAlphanumeric, MaxLength } from 'class-validator';

class CreateUrlDto {
  @IsUrl()
  originalUrl: string;

  @IsOptional()
  @IsISO8601()
  expiresAt?: string;

  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(20)
  alias?: string;
}

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  create(@Body() body: CreateUrlDto) {
    return this.urlService.create(
      body.originalUrl,
      body.expiresAt ? new Date(body.expiresAt) : undefined,
      body.alias,
    );
  }

  @Get('info/:shortCode')
  getInfo(@Param('shortCode') shortCode: string) {
    return this.urlService.getInfo(shortCode);
  }

  @Get('analytics/:shortCode')
  getAnalytics(@Param('shortCode') shortCode: string) {
    return this.urlService.getAnalytics(shortCode);
  }

  @Delete('delete/:shortCode')
  delete(@Param('shortCode') shortCode: string) {
    return this.urlService.delete(shortCode);
  }

  @Get(':shortCode')
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response, @Ip() ip: string) {
    const url = await this.urlService.findByCode(shortCode, ip);
    return res.redirect(url.originalUrl);
  }
}
