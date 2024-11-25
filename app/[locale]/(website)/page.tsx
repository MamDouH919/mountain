import About from '@/component/sections/About'
import BannerSwiper from '@/component/sections/BannerSwiper'
import Branches from '@/component/sections/Branches'
import Clients from '@/component/sections/Clients'
import Contact from '@/component/sections/Contact'
import Highlights from '@/component/sections/Highlights'
import Services from '@/component/sections/Services'
import React from 'react'

async function fetchHighlightsFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/highlights`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}

async function fetchBranchesFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/branches`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}
async function fetchClientsFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/clients`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}
async function fetchServicesFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/services`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}


const Page = async () => {
    const [branchesData, clientsData, servicesData, highlightsData] = await Promise.all([
        fetchBranchesFromAPI(),
        fetchClientsFromAPI(),
        fetchServicesFromAPI(),
        fetchHighlightsFromAPI()
    ])

    return (
        <div>
            <BannerSwiper />
            {!!highlightsData.data.length && <Highlights data={highlightsData.data} />}
            <About />
            {!!servicesData.data.length && <Services data={servicesData.data} />}
            <Contact />
            {!!branchesData.data.length && <Branches data={branchesData.data} />}
            {!!clientsData.data.length && <Clients data={clientsData.data} />}
        </div>
    )
}

export default Page
