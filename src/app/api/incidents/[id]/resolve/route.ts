// src/app/api/incidents/[id]/resolve/route.ts

import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function PATCH(
  req: NextRequest,
  { params } : { params: { id: string } }
) {
  const paramss = await params;
  const id = paramss.id;

 

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
  }

  const incidentId = parseInt(id, 10);
 
  

  try {
    const updated = await prisma.incident.update({
      where: { id: incidentId},
      data: { resolved: true },
      include: { camera: true },
    });

    return NextResponse.json(updated);
  } catch (e) {
    console.error('Error updating incident:', e);
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }
}
