import { handleUpload } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const jsonResponse = await handleUpload({
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Add any custom validation logic here
        return {
          allowedContentTypes: ['*/*'],
          maximumSizeInBytes: 500 * 1024 * 1024, // 500MB
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: Add any post-upload logic here
        console.log('Upload completed:', blob.pathname);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error.message || 'Upload failed' },
      { status: 400 }
    );
  }
}
