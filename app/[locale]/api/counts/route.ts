import { NextRequest, NextResponse } from 'next/server';
import db from '@/db/db';

// Handle GET requests
export async function GET(request: NextRequest) {
    const highlightsCount = await db.highlights.count()
    const branchesCount = await db.branches.count()
    const clientsCount = await db.clients.count()
    const contactsCount = await db.contacts.count()
    const jobsCount = await db.jobs.count()
    const newsCount = await db.news.count()
    const servicesCount = await db.services.count()

    return NextResponse.json({
        highlightsCount: highlightsCount,
        branchesCount: branchesCount,
        clientsCount: clientsCount,
        contactsCount: contactsCount,
        jobsCount: jobsCount,
        newsCount: newsCount,
        servicesCount: servicesCount,
    });
}