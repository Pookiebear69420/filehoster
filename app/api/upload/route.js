import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // You can implement authentication and validation logic here
        // For example, check if the user is authenticated
        // const session = await getSession();
        // if (!session) throw new Error('Unauthorized');

        return {
          allowedContentTypes: [
            'image/jpeg',
            'image/png',
            'image/gif',
            'image/webp',
            'application/pdf',
            'video/mp4',
            'video/quicktime',
            'application/zip',
            'application/x-zip-compressed',
            'text/plain',
            'text/csv',
            'application/json',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/octet-stream',
          ],
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Upload completed successfully:', blob.pathname);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error in upload handler:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

