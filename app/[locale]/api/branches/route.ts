import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const contacts = await db.branches.findMany({
        select: {
            id: true,
            name: true,
            nameAr: true,
            location: true,
            locationAr: true,
            mobile: true,
            whatsApp: true,
            imageName: true,
            imagePath: true,
            gps: true
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    return NextResponse.json({ data: contacts, page, pageSize });
}