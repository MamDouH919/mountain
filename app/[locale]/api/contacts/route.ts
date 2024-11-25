// app/[locale]/api/contacts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const pageSize = parseInt(searchParams.get('pageSize') || '20');

    const clients = await db.contacts.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            branch: true,
            mobile: true,
            message: true,
            createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * pageSize,
        take: pageSize,
    });

    return NextResponse.json({ data: clients, page, pageSize });
}