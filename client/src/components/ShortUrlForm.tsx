import { useState } from 'react';
import { api } from '../hooks/useApi';
import { Input } from './Input';
import { Button } from './Button';

interface Props {
  onCreated: (info: any) => void;
}

export const ShortUrlForm = ({ onCreated }: Props) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [alias, setAlias] = useState<string>('');
  const [expiresAt, setExpiresAt] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const aliasPattern = /^[a-zA-Z0-9-_]*$/;

    const cleanedAlias = alias.trim();
    if (cleanedAlias && !aliasPattern.test(cleanedAlias)) {
      alert("Alias can only contain Latin letters, numbers, hyphens, and underscores.");
      return;
    }

    // Convert expiresAt to UTC ISO string if filled
    const expiresIso = expiresAt
      ? new Date(expiresAt).toISOString()
      : undefined;

    try {
      const res = await api.createShortUrl(
        originalUrl,
        cleanedAlias === '' ? undefined : cleanedAlias,
        expiresIso
      );
      onCreated(res.data);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Error creating short URL');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 bg-opacity-80 rounded-lg shadow-lg p-5 space-y-4 w-full max-w-[700px] mx-auto"
    >
      <h2 className="text-xl font-bold text-white">Create Short URL</h2>

      <Input
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        placeholder="Original URL"
        required
        className="mb-[10px]"
      />

      <Input
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        placeholder="Alias (optional)"
        className="mb-[10px]"
      />

      <Input
        value={expiresAt}
        onChange={(e) => setExpiresAt(e.target.value)}
        placeholder="Expires At (optional)"
        type="datetime-local"
        className="mb-[10px]"
      />
      
      <Button type="submit">Shorten</Button>
    </form>
  );
};
