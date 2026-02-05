'use client';

import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  async function uploadFile() {
    if (!file) return;
    
    setLoading(true);
    setError('');
    setUploadProgress(0);

    try {
      const { upload } = await import('@vercel/blob/client');
      
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
      });

      setUrl(newBlob.url);
      setUploadProgress(100);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Upload failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  const resetUpload = () => {
    setFile(null);
    setUrl('');
    setError('');
    setUploadProgress(0);
  };

  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: '#1e1e1e',
        border: '1px solid #2a2a2a',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '480px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '0 0 8px 0',
            color: '#ffffff'
          }}>
            File Host
          </h1>
          <p style={{
            fontSize: '14px',
            color: '#888',
            margin: 0
          }}>
            Upload files up to 500MB and share instantly
          </p>
        </div>

        {!url ? (
          <>
            <div style={{
              border: '2px dashed #3a3a3a',
              borderRadius: '12px',
              padding: '32px',
              textAlign: 'center',
              marginBottom: '20px',
              background: '#171717',
              transition: 'all 0.2s ease'
            }}>
              <input
                type="file"
                id="fileInput"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                  setError('');
                }}
                style={{ display: 'none' }}
              />
              <label
                htmlFor="fileInput"
                style={{
                  cursor: 'pointer',
                  display: 'block'
                }}
              >
                <div style={{
                  fontSize: '48px',
                  marginBottom: '12px'
                }}>
                  📁
                </div>
                <div style={{
                  fontSize: '16px',
                  color: '#fff',
                  marginBottom: '8px',
                  fontWeight: '500'
                }}>
                  {file ? file.name : 'Choose a file'}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: '#666'
                }}>
                  {file ? formatFileSize(file.size) : 'Click to browse or drag and drop'}
                </div>
              </label>
            </div>

            {error && (
              <div style={{
                background: '#2a1515',
                border: '1px solid #4a2020',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#ff6b6b'
              }}>
                {error}
              </div>
            )}

            <button
              onClick={uploadFile}
              disabled={!file || loading}
              style={{
                width: '100%',
                padding: '14px',
                background: file && !loading ? '#3b82f6' : '#2a2a2a',
                color: file && !loading ? '#ffffff' : '#666',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: file && !loading ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {loading && (
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${uploadProgress}%`,
                  background: 'rgba(59, 130, 246, 0.3)',
                  transition: 'width 0.3s ease'
                }} />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {loading ? `Uploading... ${uploadProgress}%` : 'Upload File'}
              </span>
            </button>
          </>
        ) : (
          <div>
            <div style={{
              background: '#0f2a1f',
              border: '1px solid #1a4d32',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <div style={{
                fontSize: '14px',
                color: '#4ade80',
                marginBottom: '12px',
                fontWeight: '600'
              }}>
                ✓ Upload Successful
              </div>
              <div style={{
                background: '#1a1a1a',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '13px',
                wordBreak: 'break-all',
                color: '#a0a0a0',
                marginBottom: '12px'
              }}>
                {url}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={copyToClipboard}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#2a2a2a',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  Copy Link
                </button>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    textDecoration: 'none',
                    textAlign: 'center',
                    fontWeight: '500'
                  }}
                >
                  Open File
                </a>
              </div>
            </div>

            <button
              onClick={resetUpload}
              style={{
                width: '100%',
                padding: '14px',
                background: 'transparent',
                color: '#888',
                border: '1px solid #2a2a2a',
                borderRadius: '10px',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Upload Another File
            </button>
          </div>
        )}

        <div style={{
          marginTop: '24px',
          paddingTop: '24px',
          borderTop: '1px solid #2a2a2a',
          fontSize: '12px',
          color: '#666',
          textAlign: 'center'
        }}>
          Maximum file size: 500MB
        </div>
      </div>
    </main>
  );
}
