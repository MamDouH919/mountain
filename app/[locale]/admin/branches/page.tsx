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
import { deleteBranch, getBranches } from '@/actions/branches';
import DeleteItem from '../_component/delete';
import Image from 'next/image';

const Page = async ({
    params: { locale }
}: {
    params: { locale: string }
}) => {
    const { t } = await initTranslations(locale, ['dashboard']);

    return (
        <Stack spacing={2}>
            <Stack direction={"row"} spacing={2} justifyContent={"space-between"} useFlexGap>
                <ListHeaderTitle title={"branches"} />
                <FormItem>
                    <Button variant="contained" color="primary" size="medium">
                        {t("New")}
                    </Button>
                </FormItem>

            </Stack>
            <Grid container spacing={2} m={0} alignItems={"stretch"}>
                <BranchesData locale={locale} />
            </Grid>
        </Stack>
    )
}

export default Page

const BranchesData = async ({ locale }: { locale: string }) => {
    const branches = await getBranches()

    if (branches.length === 0) return <NoData />    

    return branches.map((branch) => (
        <Grid display={"flex"} key={branch.id} xs={12} sm={6} md={4} lg={3} xl={2}>
            <Paper sx={{ padding: "20px", width: "100%" }}>
                <Stack spacing={2} alignItems={"center"}>
                    <Image
                        src={branch.imagePath}
                        alt={branch.name}
                        width={200}
                        height={200}
                        layout="responsive"
                        objectFit="cover"
                        style={{ width: '100%', maxHeight: '250px', minHeight: '250px' }}
                    />
                    <Typography variant="h6" fontSize={25}>{locale === "en" ? branch.name : branch.nameAr}</Typography>
                    <Typography variant="body1">{locale === "en" ? branch.location : branch.locationAr}</Typography>
                    <Typography variant="body1" sx={{ direction: locale === "en" ? "ltr" : "rtl" }}>{branch.mobile}</Typography>
                    <Typography variant="body1" sx={{ direction: locale === "en" ? "ltr" : "rtl" }}>{branch.whatsApp}</Typography>


                    <Stack direction={"row"} spacing={1} >
                        <FormItem id={branch.id}>
                            <IconButton size="small">
                                <EditIcon fontSize='small' />
                            </IconButton>
                        </FormItem>
                        <DeleteItem id={branch.id} deleteFun={deleteBranch}>
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