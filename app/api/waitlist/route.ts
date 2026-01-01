import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  instagramId: string;
  createdAt: string;
  userAgent?: string;
  ipAddress?: string;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateInstagramId(instagramId: string): boolean {
  // Remove @ if present and validate
  const cleanId = instagramId.startsWith('@') ? instagramId.slice(1) : instagramId;
  const instagramRegex = /^[\w.]+$/;
  return instagramRegex.test(cleanId) && cleanId.length >= 1 && cleanId.length <= 30;
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, instagramId } = body;

    // Validation
    const errors: string[] = [];

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }

    if (!email || !validateEmail(email)) {
      errors.push('Please provide a valid email address');
    }

    if (!instagramId || !validateInstagramId(instagramId)) {
      errors.push('Please provide a valid Instagram username');
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, errors },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email.toLowerCase());
    const sanitizedInstagramId = sanitizeInput(
      instagramId.startsWith('@') ? instagramId.slice(1) : instagramId
    );

    // Get MongoDB database
    const db = await getDatabase();
    const collection = db.collection<WaitlistEntry>('waitlist');

    // Check for duplicate email
    const existingEntry = await collection.findOne({ 
      email: sanitizedEmail 
    });

    if (existingEntry) {
      return NextResponse.json(
        { 
          success: false, 
          errors: ['This email is already on the waitlist'] 
        },
        { status: 409 }
      );
    }

    // Get current count for spot number
    const currentCount = await collection.countDocuments();

    // Create new entry
    const newEntry: WaitlistEntry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: sanitizedName,
      email: sanitizedEmail,
      instagramId: sanitizedInstagramId,
      createdAt: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || undefined,
      ipAddress: request.headers.get('x-forwarded-for') || 
                 request.headers.get('x-real-ip') || 
                 'unknown',
    };

    // Insert into MongoDB
    await collection.insertOne(newEntry);

    // Log for monitoring
    console.log(`[Waitlist] New signup: ${sanitizedEmail} (@${sanitizedInstagramId})`);

    // Return success with spot number
    const spotNumber = currentCount + 1;
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        spotNumber: spotNumber,
        totalSpots: 100,
        spotsRemaining: Math.max(0, 100 - spotNumber),
      }
    });

  } catch (error) {
    console.error('[Waitlist API Error]:', error);
    return NextResponse.json(
      { 
        success: false, 
        errors: ['Something went wrong. Please try again.'] 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check waitlist status (admin use)
export async function GET(request: NextRequest) {
  try {
    // Simple auth check via query param (in production, use proper auth)
    const { searchParams } = new URL(request.url);
    const adminKey = searchParams.get('key');

    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'preview') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get MongoDB database
    const db = await getDatabase();
    const collection = db.collection<WaitlistEntry>('waitlist');

    const entries = await collection.find({}).toArray();

    // Return summary for preview, full list for admin
    if (adminKey === 'preview') {
      return NextResponse.json({
        success: true,
        count: entries.length,
        spotsRemaining: Math.max(0, 100 - entries.length),
      });
    }

    return NextResponse.json({
      success: true,
      count: entries.length,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      entries: entries.map(({ ipAddress, userAgent, ...rest }) => rest),
    });

  } catch (error) {
    console.error('[Waitlist GET Error]:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch waitlist' },
      { status: 500 }
    );
  }
}
