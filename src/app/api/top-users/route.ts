import { NextResponse } from 'next/server';

interface Supporter {
  name: string;
  instagram: string;
  amount: number;
  currency: string;
}

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

    const data = await response.json();
    
    // Convert IRR amounts to USD (1 USD = 100 IRR)
    const supporters: Supporter[] = data.supporters.map((supporter: Supporter) => {
      if (supporter.currency === 'irr') {
        return {
          ...supporter,
          amount: supporter.amount / 100, // Convert IRR to USD
          currency: 'usd', // Change currency to USD
        };
      }
      return supporter;
    });

    // Sort all supporters by amount in descending order
    supporters.sort((a, b) => b.amount - a.amount);

    // Take top 10 supporters
    const topSupporters = supporters.slice(0, 10);

    return NextResponse.json({ supporters: topSupporters });
  } catch (error) {
    console.error('Error fetching top users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch top users' },
      { status: 500 }
    );
  }
} 