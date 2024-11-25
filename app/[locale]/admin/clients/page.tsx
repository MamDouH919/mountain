import React from 'react'
import db from '@/db/db';
import List from './_List';


const Page = async () => {
    return (
        <ClientsData />
    )
}

export default Page

const ClientsData = async () => {
    const totalClients = await db.clients.count();
    return <List totalClients={totalClients}/>
}