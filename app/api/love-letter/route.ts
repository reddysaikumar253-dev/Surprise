import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { LoveLetter } from '@/lib/models';
import { DEFAULT_LOVE_LETTER } from '@/lib/seeds';

export async function GET() {
  try {
    await connectDB();
    let letter = await LoveLetter.findOne({ theme: 'birthday' });

    if (!letter) {
      letter = await LoveLetter.create(DEFAULT_LOVE_LETTER);
    }

    return NextResponse.json({ letter });
  } catch {
    return NextResponse.json({ letter: DEFAULT_LOVE_LETTER });
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const letter = await LoveLetter.findOneAndUpdate(
      { theme: 'birthday' },
      body,
      { upsert: true, new: true }
    );
    return NextResponse.json({ letter });
  } catch {
    return NextResponse.json({ error: 'Failed to update letter' }, { status: 500 });
  }
}
