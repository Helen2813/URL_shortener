import { useState } from 'react';
import { api } from '../hooks/useApi';
import { Input } from './Input';
import { Button } from './Button';

interface Props {
  onInfoLoaded: (info: any) => void;
  onAnalyticsLoaded: (analytics: any) => void;
  onDeleted: () => void;
}

export const ShortUrlActions = ({ onInfoLoaded, onAnalyticsLoaded, onDeleted }: Props) => {
  const [shortCode, setShortCode] = useState('');

  const handleInfo = async () => {
    try {
      const res = await api.getInfo(shortCode);
      onInfoLoaded(res.data);
    } catch {
      alert('Short URL not found');
    }
  };

  const handleAnalytics = async () => {
    try {
      const res = await api.getAnalytics(shortCode);
      onAnalyticsLoaded(res.data);
    } catch {
      alert('Short URL not found');
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteShortUrl(shortCode);
      alert('Deleted!');
      onDeleted();
    } catch {
      alert('Short URL not found');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-2 w-full">
      <h2 className="text-xl font-bold">Manage Short URL</h2>
      <Input
        value={shortCode}
        onChange={(e) => setShortCode(e.target.value)}
        placeholder="Short code"
        required
        className="mb-[10px]"
      />
      <div className="flex space-x-2">
        <Button onClick={handleInfo} className="mx-[4px]">
          Get Info
        </Button>

        <Button onClick={handleAnalytics} className="mx-[4px]">
          Get Analytics
        </Button>

        <Button onClick={handleDelete} className="mx-[4px]">
          Delete
        </Button>
      </div>
    </div>
  );
}
