import { readFileSync } from 'fs';
import { resolve } from 'path';

export async function GET() {
  try {
    const videoPath = resolve(process.cwd(), 'public/hero-video.mp4');
    const buffer = readFileSync(videoPath);

    return new Response(buffer, {
      headers: {
        'Content-Type': 'video/mp4',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return new Response('Video not found', { status: 404 });
  }
}
