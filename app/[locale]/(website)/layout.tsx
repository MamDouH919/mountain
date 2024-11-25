import Footer from '@/component/ui/Footer'
import Navbar from '@/component/ui/Navbar'
import React from 'react'

export const dynamic = "force-dynamic"

async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const layout = async ({ children }: { children: React.ReactNode }) => {

    await delay(2000); // 2-second delay

    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}

export default layout
