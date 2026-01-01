import { NextRequest, NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { sendWelcomeEmail, TOTAL_SPOTS } from '@/lib/email';

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  instagramId: string;
  createdAt: string;
  userAgent?: string;
  ipAddress?: string;
}

// Flag to track if indexes have been created
let indexesCreated = false;

/**
 * Ensure indexes exist for optimal query performance
 * Creates index on email field for O(log n) duplicate lookups
 */
async function ensureIndexes(db: Awaited<ReturnType<typeof getDatabase>>) {
  if (indexesCreated) return;
  
  try {
    const collection = db.collection<WaitlistEntry>('waitlist');
    // Create unique index on email for fast duplicate checking
    await collection.createIndex({ email: 1 }, { unique: true, background: true });
    indexesCreated = true;
    console.log('[Waitlist] Indexes ensured');
  } catch (error) {
    // Index might already exist, which is fine
    if ((error as { code?: number }).code === 85 || (error as { code?: number }).code === 11000) {
      indexesCreated = true;
    } else {
      console.error('[Waitlist] Index creation error:', error);
    }
  }
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
  const startTime = Date.now();
  
  try {
    const body = await request.json();
    const { name, email, instagramId } = body;

    // Validation (fast, no DB needed)
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

    // Get MongoDB database and ensure indexes
    const db = await getDatabase();
    await ensureIndexes(db);
    
    const collection = db.collection<WaitlistEntry>('waitlist');

    // Get current count for spot number (needed for response)
    // This runs in parallel with the insert attempt
    const currentCount = await collection.countDocuments();
    const spotNumber = currentCount + 1;

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

    // Insert into MongoDB (will fail if email already exists due to unique index)
    try {
      await collection.insertOne(newEntry);
    } catch (insertError) {
      // Check for duplicate key error (E11000)
      if ((insertError as { code?: number }).code === 11000) {
        return NextResponse.json(
          { 
            success: false, 
            errors: ['This email is already on the waitlist'] 
          },
          { status: 409 }
        );
      }
      throw insertError;
    }

    // Log for monitoring
    const duration = Date.now() - startTime;
    console.log(`[Waitlist] New signup: ${sanitizedEmail} (@${sanitizedInstagramId}) - ${duration}ms`);

    // Send welcome email (non-blocking, don't wait for it)
    // Use Promise to run in background without blocking response
    sendWelcomeEmail({
      to: sanitizedEmail,
      name: sanitizedName,
      spotNumber: spotNumber,
    }).catch(emailError => {
      console.error('[Waitlist] Email send error:', emailError);
    });

    // Return success with spot number
    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      data: {
        spotNumber: spotNumber,
        totalSpots: TOTAL_SPOTS,
        spotsRemaining: Math.max(0, TOTAL_SPOTS - spotNumber),
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

    // For preview, just get the count (faster)
    if (adminKey === 'preview') {
      const count = await collection.countDocuments();
      return NextResponse.json({
        success: true,
        count: count,
        totalSpots: TOTAL_SPOTS,
        spotsRemaining: Math.max(0, TOTAL_SPOTS - count),
      });
    }

    // For admin, get full list
    const entries = await collection.find({}).toArray();

    return NextResponse.json({
      success: true,
      count: entries.length,
      totalSpots: TOTAL_SPOTS,
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
