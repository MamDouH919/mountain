import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const contacts = await db.services.findMany({
        select: {
            id: true,
            title: true,
            titleAr: true,
            iconPath: true,
            description: true,
            descriptionAr: true
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    return NextResponse.json({ data: contacts, page, pageSize });
}