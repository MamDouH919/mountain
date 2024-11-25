import DataCounter from '@/component/ui/DataCounter'
import db from '@/db/db'
import { cache } from '@/lib/cache'
import {
    AutoFixHighOutlined,
    HouseOutlined,
    Remove,
    RecentActorsOutlined,
    SupervisorAccountOutlined,
    DescriptionOutlined,
    NewspaperOutlined,
    ManageAccountsOutlined
} from '@mui/icons-material'
import { Container } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React from 'react'
async function fetchHighlightsFromAPI() {
    const response = await fetch(`${process.env.BACKEND}/api/counts`, {
        cache: 'no-store', // Disable caching
    });

    if (!response.ok) {
        throw new Error("Failed to fetch highlights data from API");
    }
    return response.json();
}

const Page = async () => {
    const counts = await fetchHighlightsFromAPI()

    return (
        <Container maxWidth={"xl"}>
            <Grid container spacing={2} width={"100%"} m={0}>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<AutoFixHighOutlined fontSize='large' />} title='highlights' total={counts.highlightsCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<HouseOutlined fontSize='large' />} title='branches' total={counts.branchesCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<SupervisorAccountOutlined fontSize='large' />} title='clients' total={counts.clientsCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<RecentActorsOutlined fontSize='large' />} title='contacts' total={counts.contactsCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<DescriptionOutlined fontSize='large' />} title='employments' total={counts.jobsCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<NewspaperOutlined fontSize='large' />} title='news' total={counts.newsCount} />
                </Grid>
                <Grid xs={12} md={4}>
                    <DataCounter icon={<ManageAccountsOutlined fontSize='large' />} title='services' total={counts.servicesCount} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Page
