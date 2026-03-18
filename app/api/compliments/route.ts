import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Compliment } from '@/lib/models';
import { DEFAULT_COMPLIMENTS } from '@/lib/seeds';

export async function GET() {
  try {
    await connectDB();
    let compliments = await Compliment.find().sort({ order: 1 });

    if (compliments.length === 0) {
      await Compliment.insertMany(DEFAULT_COMPLIMENTS);
      compliments = await Compliment.find().sort({ order: 1 });
    }

    return NextResponse.json({ compliments });
  } catch {
    return NextResponse.json({ compliments: DEFAULT_COMPLIMENTS });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const compliment = await Compliment.create(body);
    return NextResponse.json({ compliment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create compliment' }, { status: 500 });
  }
}
