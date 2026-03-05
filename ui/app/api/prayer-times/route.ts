import { NextResponse } from 'next/server';
import { getPrayerTimesData } from '@/lib/prayerTimesServer';

export async function GET() {
  try {
    const { data, districts } = await getPrayerTimesData();
    return NextResponse.json({ data, districts });
  } catch (error) {
    console.error('Error loading prayer times:', error);
    return NextResponse.json({ error: 'Failed to load prayer times' }, { status: 500 });
  }
}
