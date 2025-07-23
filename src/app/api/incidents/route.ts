import { NextResponse } from 'next/server';
import prisma from '../../lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const resolvedParam = searchParams.get('resolved');

    // Only filter if resolved is 'true' or 'false'
    let whereClause = {};
    if (resolvedParam === 'true') {
      whereClause = { resolved: true };
    } else if (resolvedParam === 'false') {
      whereClause = { resolved: false };
    }

    const incidents = await prisma.incident.findMany({
      where: whereClause,
      include: {
        camera: true,
      },
      orderBy: {
        tsStart: 'desc',
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    console.error("Failed to fetch incidents:", error);
    // Always return valid JSON on error!
    return NextResponse.json(
      { error: "Failed to fetch incidents", details: String(error) },
      { status: 500 }
    );
  }
}
