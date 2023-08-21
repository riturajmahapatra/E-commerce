import Razorpay from 'razorpay';
import Stripe from 'stripe';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { Razor } from '@/lib/razorpay';

import prismadb from '@/lib/prismadb';
import { stripe } from '@/lib/stripe';

const corsHeader = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeader });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const { productIds } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse('Product ids are required', { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

  const line_items = [];

  products.forEach((product) => {
    line_items.push({
      quantity: 1,
      price_data: {
        currency: 'INR',
        product_data: {
          name: product.name
        },
        unit_amount: product.price.toNumber() * 100
      }
    });
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId
            }
          }
        }))
      }
    }
  });
}
