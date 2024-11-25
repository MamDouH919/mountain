import React from 'react'
import { Stack } from '@mui/material';
import db from '@/db/db';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import NoData from '@/component/ui/NoData';
import List from './_List';


const Page = async () => {
    return (
        <Stack spacing={2} height={"100%"} overflow={"hidden"}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"contacts"} />
            </Stack>
            <ContactsData />
        </Stack>
    )
}

export default Page

const ContactsData = async () => {
    const totalContacts = await db.contacts.count();
    if (totalContacts === 0) return <NoData />

    return <List totalContacts={totalContacts} />
}