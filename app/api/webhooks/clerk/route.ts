import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';
import { WebhookEvent } from '@clerk/nextjs/server';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  try {
    const headerPayload = headers();
    const svixId = headerPayload.get('svix-id');
    const svixTimestamp = headerPayload.get('svix-timestamp');
    const svixSignature = headerPayload.get('svix-signature');

    if (!svixId || !svixTimestamp || !svixSignature) {
      return NextResponse.json(
        { error: 'Missing svix headers' },
        { status: 400 }
      );
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Verify webhook signature (skip if secret not configured)
    if (webhookSecret) {
      const wh = new Webhook(webhookSecret);
      
      try {
        wh.verify(body, {
          'svix-id': svixId,
          'svix-timestamp': svixTimestamp,
          'svix-signature': svixSignature,
        }) as WebhookEvent;
      } catch (err) {
        console.error('Webhook verification failed:', err);
        return NextResponse.json(
          { error: 'Webhook verification failed' },
          { status: 400 }
        );
      }
    }

    const event = payload as WebhookEvent;

    // Handle different event types
    switch (event.type) {
      case 'user.created':
        await handleUserCreated(event.data);
        break;

      case 'user.updated':
        await handleUserUpdated(event.data);
        break;

      case 'user.deleted':
        await handleUserDeleted(event.data);
        break;

      case 'session.created':
        console.log('Session created:', event.data.id);
        break;

      default:
        console.log('Unhandled webhook event:', event.type);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function handleUserCreated(data: any) {
  console.log('User created:', {
    clerkId: data.id,
    email: data.email_addresses[0]?.email_address,
    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
  });

  // TODO: Integrate with Convex to create user record
  // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  // await convex.mutation(api.users.upsert, {
  //   clerkId: data.id,
  //   email: data.email_addresses[0]?.email_address,
  //   name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
  //   imageUrl: data.image_url,
  // });
}

async function handleUserUpdated(data: any) {
  console.log('User updated:', data.id);
  
  // TODO: Update user in Convex
  // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  // await convex.mutation(api.users.upsert, {
  //   clerkId: data.id,
  //   email: data.email_addresses[0]?.email_address,
  //   name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
  //   imageUrl: data.image_url,
  // });
}

async function handleUserDeleted(data: any) {
  console.log('User deleted:', data.id);
  
  // TODO: Handle user deletion in Convex (soft delete or hard delete)
  // const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  // await convex.mutation(api.users.delete, { clerkId: data.id });
}
