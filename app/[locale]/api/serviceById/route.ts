import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id')
    const allData = searchParams.get('allData')

    if (!id) {
        return NextResponse.json({ data: null })
    }


    const service = await db.services.findUnique({
        where: { id },
        select: {
            id: true,
            title: true,
            titleAr: true,
            ...(allData && {
                description: true,
                descriptionAr: true,
                coverImgPath: true,
                videos: true,
                servicesImages: {
                    select: {
                        imagePath: true
                    }
                },
            })
        },
    });

    return NextResponse.json({ data: service });
}