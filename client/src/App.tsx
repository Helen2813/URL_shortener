import { useState } from 'react';
import { ShortUrlForm } from './components/ShortUrlForm';
import { ShortUrlActions } from './components/ShortUrlActions';
import InfoPanel from './components/InfoPanel';
import { Layout } from './components/Layout';

function App() {
  const [info, setInfo] = useState<any>(null);
  const [analytics, setAnalytics] = useState<any>(null);

  return (
    <div className="mx-auto min-h-screen flex flex-col items-center justify-center p-6 font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-8">
        ✂️ URL Shortener
      </h1>
        <Layout>
            <ShortUrlForm
              onCreated={(info) => {
                setInfo(info);
                setAnalytics(null);
              }}
            />
            <ShortUrlActions
              onInfoLoaded={(data) => {
                setInfo(data);
                setAnalytics(null);
              }}
              onAnalyticsLoaded={(data) => setAnalytics(data)}
              onDeleted={() => {
                setInfo(null);
                setAnalytics(null);
              }}
            />
            <InfoPanel info={info} analytics={analytics} />
        </Layout>
      </div>
  );
}

export default App;
