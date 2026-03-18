import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { GalleryPhoto } from '@/lib/models';
import { DEFAULT_GALLERY_PHOTOS } from '@/lib/seeds';

export async function GET() {
  try {
    await connectDB();
    let photos = await GalleryPhoto.find().sort({ order: 1 });

    if (photos.length === 0) {
      await GalleryPhoto.insertMany(DEFAULT_GALLERY_PHOTOS);
      photos = await GalleryPhoto.find().sort({ order: 1 });
    }

    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ photos: DEFAULT_GALLERY_PHOTOS });
  }
}
