import React from 'react'
import DashboardLayout from './_component/Layout';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const dynamic = "force-dynamic"

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const Layout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const result = await verifyAuth();

    if (!result.user) {
      return redirect('/login');
    }
    await delay(2000); // 2-second delay

    return (
        <div>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </div>
    )
}

export default Layout
