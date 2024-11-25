import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const contacts = await db.clients.findMany({
        select: {
            id: true,
            name: true,
            nameAr: true,
            imageName: true,
            imagePath: true,
            type: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    const totalClients = await db.clients.count()

    return NextResponse.json({ data: contacts, page, pageSize, totalClients });
}