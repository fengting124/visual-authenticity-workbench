import { useEffect, useState } from 'react';

function fakeHash() {
  const chars = 'abcdef0123456789';
  let result = '';

  for (let i = 0; i < 8; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }

  return result;
}

export function ForensicWatermark() {
  const [hash] = useState(() => fakeHash());
  const [now, setNow] = useState(() => new Date().toISOString().slice(11, 19));

  useEffect(() => {
    const id = window.setInterval(() => {
      setNow(new Date().toISOString().slice(11, 19));
    }, 1000);

    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="forensic-watermark">
      <div>
        <strong>SESSION</strong>VL-{hash.toUpperCase()} · {now}Z
      </div>
      <div>
        <strong>ANALYST</strong>AUTO-PIPELINE-7
      </div>
      <div>
        <strong>CHAIN</strong>SHA-256 {hash}…
      </div>
    </div>
  );
}
