import StackImageTitle from '@/component/sections/StackImageTitle'
import BreadCrumb from '@/component/ui/BreadCrumb'
import NoData from '@/component/ui/NoData'
import db from '@/db/db'
import React from 'react'

async function getClientsNqData() {
    const data = await db.clients.findMany({
        where: { type: "syndicates" },
        select: {
            id: true,
            name: true,
            nameAr: true,
            imagePath: true,
        }
    })
    return data
}

async function getClientsCoData() {
    const data = await db.clients.findMany({
        where: { type: "contractingCompanies" },
        select: {
            id: true,
            name: true,
            nameAr: true,
            imagePath: true,
        }
    })
    return data
}

async function getClientsHcData() {
    const data = await db.clients.findMany({
        where: { type: "healthcareCompanies" },
        select: {
            id: true,
            name: true,
            nameAr: true,
            imagePath: true,
        }
    })
    return data
}

async function getClientsDcData() {
    const data = await db.clients.findMany({
        where: { type: "discountContractCompanies" },
        select: {
            id: true,
            name: true,
            nameAr: true,
            imagePath: true,
        }
    })
    return data
}

const Page = async () => {
    const [clientsNqData, clientsCoData, clientsHcData, clientsDcData] = await Promise.all([
        getClientsNqData(),
        getClientsCoData(),
        getClientsHcData(),
        getClientsDcData()
    ])

    return (
        <div>
            <BreadCrumb pageLink={"clients"} />
            {(clientsNqData.length === 0 && clientsCoData.length === 0 && clientsHcData.length === 0 && clientsDcData.length === 0) &&
                <NoData label={"noData"} />}
            {clientsNqData.length > 0 && <StackImageTitle
                sectionTitle={"syndicates"}
                data={clientsNqData}
            />}
            {clientsCoData.length > 0 && <StackImageTitle
                sectionTitle={"contractingCompanies"}
                data={clientsCoData}
            />}
            {clientsHcData.length > 0 && <StackImageTitle
                sectionTitle={"healthcareCompanies"}
                data={clientsHcData}
            />}
            {clientsDcData.length > 0 && <StackImageTitle
                sectionTitle={"discountContractCompanies"}
                data={clientsDcData}
            />}
        </div>
    )
}

export default Page
