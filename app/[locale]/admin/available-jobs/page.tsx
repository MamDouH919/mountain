import React from 'react'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material';
import db from '@/db/db';
import Grid from '@mui/material/Unstable_Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormItem from './component/form';
import { CheckCircleOutline, HighlightOff } from '@mui/icons-material';
import { ListHeaderTitle } from '@/component/ui/ListHeader';
import NoData from '@/component/ui/NoData';
import initTranslations from '@/app/i18n';
import DeleteItem from '../_component/delete';
import { deleteAvailableJob } from './_actions';

const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"availableJobs"} />
                <FormItem>
                    <Button variant="contained" color="primary" size="medium">
                        {t("New")}
                    </Button>
                </FormItem>

            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <HighlightsData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const HighlightsData = async ({ locale }: { locale: string }) => {
    const availableJobs = await db.availableJobs.findMany({
        select: {
            id: true,
            available: true,
            jobNameAr: true,
            jobNameEn: true,
        },
        orderBy: { createdAt: "asc" },
    })

    if (availableJobs.length === 0) return <NoData />

    return availableJobs.map((job) => (
        <Grid display={"flex"} key={job.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2}>
                    <Stack direction={"row"} spacing={2} justifyContent={"space-between"}>
                        <Typography variant="h6" fontSize={30}>{locale === "en" ? job.jobNameEn : job.jobNameAr}</Typography>
                        {job.available ?
                            <CheckCircleOutline fontSize='large' sx={{ color: "green" }} />
                            : <HighlightOff fontSize='large' sx={{ color: "red" }} />}
                    </Stack>
                    <Stack direction={"row"} spacing={1} >
                        <FormItem id={job.id}>
                            <IconButton size="small">
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </FormItem>
                        <DeleteItem id={job.id} deleteFun={deleteAvailableJob}>
                            <IconButton size="small">
                                <DeleteIcon fontSize='small' color='error' />
                            </IconButton>
                        </DeleteItem>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    ))
}