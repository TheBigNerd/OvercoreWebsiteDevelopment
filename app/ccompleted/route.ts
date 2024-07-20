// app/ccompleted/route.ts
import { NextResponse } from 'next/server';
import { Card as CardType } from '../data/customParts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const selectedComponents = JSON.parse(searchParams.get('selectedComponents') || '{}') as {
    [key: string]: CardType | CardType[];
  };

  return NextResponse.json({ selectedComponents });
}
