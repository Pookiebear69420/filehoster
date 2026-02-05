import { handleUpload } from '@vercel/blob/server';

export async function POST(request) {
  return handleUpload({
    request,
    onBeforeGenerateToken: async () => {
      return {
        allowedContentTypes: ['*/*'],
        maximumSize: 500 * 1024 * 1024, // 500MB
      };
    },
  });
}
