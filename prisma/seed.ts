import { PrismaClient } from '@prisma/client';
import { join } from 'path';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seeding...');
  // Create cameras
  const camera1 = await prisma.camera.create({
    data: {
      name: 'Shop Floor A',
      location: 'Warehouse - North Section',
    },
  });

  const camera2 = await prisma.camera.create({
    data: {
      name: 'Vault',
      location: 'Main Building - Basement Level',
    },
  });

  const camera3 = await prisma.camera.create({
    data: {
      name: 'Entrance',
      location: 'Main Building - Front Door',
    },
  });

  // Incident types
  const incidentTypes = [
    'Unauthorised Access',
    'Gun Threat',
    'Face Recognised',
    'Suspicious Package',
    'Perimeter Breach',
  ];

  // Generate incidents for the last 24 hours
  const now = new Date();
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  for (let i = 0; i < 12; i++) {
    const cameraId = [camera1.id, camera2.id, camera3.id][Math.floor(Math.random() * 3)];
    const incidentType = incidentTypes[Math.floor(Math.random() * incidentTypes.length)];
    
    // Random time in the last 24 hours
    const tsStart = new Date(oneDayAgo.getTime() + Math.random() * 24 * 60 * 60 * 1000);
    const tsEnd = new Date(tsStart.getTime() + Math.random() * 5 * 60 * 1000); // 0-5 minutes duration
    
    await prisma.incident.create({
      data: {
        cameraId,
        type: incidentType,
        tsStart,
        tsEnd,
        thumbnailUrl: `/images/camera${Math.floor(Math.random() * 3) + 1}.jpeg`|| "image",
        resolved: Math.random() > 0.7, // 30% chance of being resolved
      },
    });
  }
  
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });