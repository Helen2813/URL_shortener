import { useState } from 'react';
import { ShortUrlForm } from './components/ShortUrlForm';
import { ShortUrlActions } from './components/ShortUrlActions';
import InfoPanel from './components/InfoPanel';
import { Layout } from './components/Layout';
import { motion } from 'framer-motion';

function App() {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [info, setInfo] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  return (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        ✂️ URL Shortener
      </h1>

      <div className="flex w-full max-w-6xl space-x-6">
        <motion.div
          animate={showInfo ? { x: '40px' } : { x: 350 }}
          transition={{ duration: 0.5 }}
          className="flex-shrink-0 w-1/2"
        >
          <Layout>
            <ShortUrlForm
              onCreated={(info) => {
                setInfo(info);
                setShowInfo(true);
              }}
            />
            <ShortUrlActions
              onInfoLoaded={(data) => {
                setInfo(data);
                setAnalytics(null);
                setShowInfo(true);
              }}
              onAnalyticsLoaded={(data) => {
                setAnalytics(data);
                setShowInfo(true);
              }}
              onDeleted={() => {
                setInfo(null);
                setAnalytics(null);
                setShowInfo(false);
              }}
            />
          </Layout>
        </motion.div>

        {showInfo && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
            className="flex-grow"
          >
            <InfoPanel info={info} analytics={analytics} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
