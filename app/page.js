'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function uploadFile() {
    if (!file) return;

    setLoading(true);

    try {
      const { upload } = await import('@vercel/blob/client');

      const blob = await upload(file.name, file, {
        access: 'public',
        maximumSize: 500 * 1024 * 1024,
      });

      setUrl(blob.url);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    }

    setLoading(false);
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'black',
      color: 'white'
    }}>
      <div style={{
        border: '1px solid #333',
        padding: 20,
        borderRadius: 12,
        width: 360
      }}>
        <h2>Simple File Host</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: 12 }}
        />

        <button
          onClick={uploadFile}
          disabled={!file || loading}
          style={{
            width: '100%',
            padding: 10,
            background: 'white',
            color: 'black',
            borderRadius: 8
          }}
        >
          {loading ? 'Uploading…' : 'Upload'}
        </button>

        {url && (
          <p style={{ marginTop: 10, wordBreak: 'break-all' }}>
            <a href={url} style={{ color: '#4ea1ff' }}>
              {url}
            </a>
          </p>
        )}
      </div>
    </main>
  );
}
