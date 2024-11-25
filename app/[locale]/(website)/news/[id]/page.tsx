import React from 'react'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import BreadCrumb from '@/component/ui/BreadCrumb'
import { Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import { getNewsById } from '@/actions/new'

const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    const { t } = await initTranslations(locale, ['website'])
    const data = await getNewsById(id)

    if (data == null) return <NoData label={t("noData")} />

    return (
        <>
            <BreadCrumb prevLink={"news"} pageLink={locale === "en" ? data.title : data.titleAr} />
            <PageInfo data={data} locale={locale} />
        </>
    )
}

export default Page

const PageInfo = ({ data, locale }: { data: any, locale: string }) => {
    return (
        <Container maxWidth="lg">
            <Stack spacing={2} alignItems={"center"} my={4}>
                <Image
                    src={data.imagePath}
                    alt={data.title}
                    width={500}
                    height={500}
                    objectFit="cover"
                />
                <Typography variant="h6" fontSize={25} textAlign={"center"}>{locale === "en" ? data.title : data.titleAr}</Typography>
                <div
                    dangerouslySetInnerHTML={{ __html: locale === "en" ? data.description : data.descriptionAr }}
                />
            </Stack>
        </Container>
    )
}
