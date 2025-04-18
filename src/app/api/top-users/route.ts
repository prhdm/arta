import { NextResponse } from 'next/server';
import { TopSupportersResponse } from '@/types/supporter';

export async function GET() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/top-users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch top users');
    }

    const data: TopSupportersResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top users' },
      { status: 500 }
    );
  }
} 