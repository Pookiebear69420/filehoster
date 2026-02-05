async function upload() {
  if (!file) return;

  setLoading(true);

  // 1) Get signed upload URL
  const res = await fetch('/api/blob', { method: 'POST' });
  const { url } = await res.json();

  // 2) Upload directly to Blob
  const uploadRes = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  if (!uploadRes.ok) {
    alert('Upload failed');
    setLoading(false);
    return;
  }

  // 3) FINAL FILE URL (strip query params)
  const cleanUrl = url.split('?')[0];
  setUrl(cleanUrl);

  setLoading(false);
}
