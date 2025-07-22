import { NextResponse } from 'next/server';
import prisma from '../../../../lib/db';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  
  const incident = await prisma.incident.update({
    where: { id },
    data: { resolved: true },
    include: {
      camera: true,
    },
  });

  return NextResponse.json(incident);
}