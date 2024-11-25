import initTranslations from '@/app/i18n'
import db from '@/db/db'
import { Button, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'
import DeleteItem from '../_component/delete'
import { deleteJob } from './_actions'
import NoData from '@/component/ui/NoData'
import ButtonLink from '@/component/ui/ButtonLink'

const Page = ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    return (
        <div>
            <Grid container spacing={3} m={0}>
                <EmploymentsData locale={locale} />
            </Grid>
        </div>
    )
}

export default Page


const EmploymentsData = async ({ locale }: { locale: string }) => {
    const { t } = await initTranslations(locale, ['dashboard', 'website']);

    const jobs = await db.jobs.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            file: true,
            governorate: true,
            jobName: true,
            phone: true,
            createdAt: true,
        },
        orderBy: { createdAt: "asc" },
    })

    if (jobs.length === 0) return <NoData />

    return jobs.map((highlight) => (
        <Grid display={"flex"} key={highlight.id} xs={12} md={6}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2}>
                    <Typography>{t("name") + ": "}{highlight.name}</Typography>
                    <Typography>{t("email") + ": "}{highlight.email}</Typography>
                    <Stack direction={"row"} spacing={1}>
                        <Typography>{t("phone") + ": "}</Typography>
                        <Typography
                            dir='ltr'
                            component={"a"}
                            href={`tel:${highlight.phone}`}
                            color={"primary.main"}
                        >{highlight.phone}</Typography>
                    </Stack>
                    <Typography>{t("jobName") + ": "}{highlight.jobName}</Typography>
                    <Typography>{t("governorate") + ": "}{highlight.governorate}</Typography>
                    <Stack direction={"row"} spacing={2} width={"100%"}>
                        <Stack width={"100%"}>
                            <ButtonLink fullWidth href={`/admin/employments/${highlight.id}/download`} linkLabel={t("downloadCV")} size='small' />
                        </Stack>
                        <DeleteItem deleteFun={deleteJob} id={highlight.id}>
                            <Button fullWidth color='error' variant='contained' size='small'>
                                {t("delete")}
                            </Button>
                        </DeleteItem>
                    </Stack>
                </Stack>
            </Paper>
        </Grid>
    ))
}