// src/app/api/incidents/[id]/resolve/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id }:any = params.id;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  try {
    const updated = await prisma.incident.update({
      where: { id: parseInt(id, 10) },
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
