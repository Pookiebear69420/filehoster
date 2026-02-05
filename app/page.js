'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return;

    setLoading(true);
    const form = new FormData();
    form.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: form,
    });

    const data = await res.json();
    setUrl(data.url);
    setLoading(false);
  }

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        border: '1px solid #333',
        padding: 20,
        borderRadius: 12,
        width: 350
      }}>
        <h2>Simple File Host</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          style={{ marginBottom: 12 }}
        />

        <button
          onClick={upload}
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
            <a href={url} style={{ color: '#4ea1ff' }}>{url}</a>
          </p>
        )}
      </div>
    </main>
  );
}
