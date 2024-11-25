import ServicesProfile from '@/component/sections/ServicesProfile'
import React from 'react'
import { Metadata } from "next";

type Props = {
    params: { locale: string, id: string };
};

async function fetchServicesFromAPI(id: string, allData?: boolean) {
    const response = await fetch(`${process.env.BACKEND}/api/serviceById?id=${id}${allData ? "&allData=ok" : ""}`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch service data");
    }
    return response.json();
}


export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const serviceData = await fetchServicesFromAPI(params.id);
    const service = serviceData.data

    return {
        title: params.locale === "ar" ? service?.titleAr ?? "لا يوجد خدمة" : service?.title ?? "No Service",
    };
};


const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    const serviceData = await fetchServicesFromAPI(id, true);    

    return (
        <div>
            <ServicesProfile data={serviceData.data} />
        </div>
    )
}

export default Page
