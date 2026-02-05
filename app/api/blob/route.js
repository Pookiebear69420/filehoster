import { createUploadUrl } from '@vercel/blob/server';
import { NextResponse } from 'next/server';

export async function POST() {
  const url = await createUploadUrl({
    maxSize: 500 * 1024 * 1024, // 500MB
  });

  return NextResponse.json({ url });
}
