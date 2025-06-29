interface Props {
    info: any;
    analytics: any;
  }
  
  export default function InfoPanel({ info, analytics }: Props) {
    if (!info && !analytics) return null;
  
    return (
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 mt-4">
        {info && (
          <div>
            <h2 className="text-lg font-bold">Info</h2>
            <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(info, null, 2)}</pre>
          </div>
        )}
        {analytics && (
          <div>
            <h2 className="text-lg font-bold">Analytics</h2>
            <p>Click Count: {analytics.clickCount}</p>
            <h3 className="font-semibold mt-2">Last IPs:</h3>
            <ul className="list-disc list-inside">
              {analytics.lastIPs.map((ip: string, idx: number) => (
                <li key={idx}>{ip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
  