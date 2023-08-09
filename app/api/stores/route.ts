import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(req: Request) {
  try {
    // Check if user is authenticated
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // The body should contain the name of the store
    const body = await req.json();
    const { name } = body;
    if (!name) {
      return new NextResponse('Name is required', { status: 400 });
    }

    // Create the new instance of store and insert the name and userId
    const store = await prismadb.store.create({
      data: {
        name,
        userId
      }
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
