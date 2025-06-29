import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from './Button';
import { Layout } from './Layout';

interface Props {
  info: any;
  analytics: any;
}

export default function InfoPanel({ info, analytics }: Props) {
  const [copied, setCopied] = useState(false);

  if (!info && !analytics) return null;

  const handleCopy = () => {
    if (info?.shortCode) {
      navigator.clipboard.writeText(`${window.location.origin}/${info.shortCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-3xl mx-auto text-white"
    >
      <Layout>
        {info && (
          <div className="space-y-6 min-w-[400px]">
            <h2 className="text-2xl font-extrabold mb-4">Short Link Info</h2>
            <div className="bg-gray-800 bg-opacity-70 rounded-lg p-6 space-y-4 divide-y divide-gray-700">
              <div className="flex justify-between items-start pt-1 pb-3 p-[10px]">
                <span className="font-semibold">Original URL:</span>
                <span className="break-all text-right">{info.originalUrl}</span>
              </div>
              <div className="flex justify-between items-start p-[10px]">
                <span className="font-semibold">Short URL:</span>
                <span className="break-all text-right">{`${window.location.origin}/${info.shortCode}`}</span>
              </div>
              <div className="flex justify-between items-center p-[10px]">
                <span className="font-semibold">Created At:</span>
                <span>{new Date(info.createdAt).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-[10px]">
                <span className="font-semibold">Expires At:</span>
                <span>{info.expiresAt ? new Date(info.expiresAt).toLocaleString() : 'Never'}</span>
              </div>
            </div>
            <div className="mt-5 flex justify-center">
              <Button onClick={handleCopy} className="min-w-[160px] mt-[20px]">
                {copied ? 'Copied!' : 'Copy short URL'}
              </Button>
            </div>
          </div>
        )}

        {analytics && (
          <div className="space-y-6 mt-10 min-w-[400px]">
            <h2 className="text-2xl font-extrabold">Analytics</h2>
            <div className="bg-gray-800 bg-opacity-70 rounded-lg p-6 space-y-4 divide-y divide-gray-700">
              <div className="flex justify-between items-center pt-1 pb-3 p-[10px]">
                <span className="font-semibold">Click Count:</span>
                <span>{analytics.clickCount}</span>
              </div>
              <div className="pt-3 p-[10px]">
                <span className="font-semibold">Last IPs:</span>
                <ul className="list-disc list-inside mt-2">
                  {analytics.lastIPs.map((ip: string, idx: number) => (
                    <li key={idx}>{ip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </motion.div>
  );
}
