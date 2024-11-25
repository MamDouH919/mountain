import React from 'react'
import Form from '../_Form'
import NoData from '@/component/ui/NoData'
import initTranslations from '@/app/i18n'
import { getServicesById } from '@/actions/services'

const Page = async ({ params: { id, locale } }: { params: { id: string, locale: string } }) => {
    const { t } = await initTranslations(locale, ['website'])
    const data = await getServicesById(id)
    if (data == null) return <NoData label={t("noData")} />

    let imageOne, imageTwo, imageThree

    if (data.servicesImages.length) {
        imageOne = data.servicesImages[0]
        imageTwo = data.servicesImages[1]
        imageThree = data.servicesImages[2]
    }


    return <Form id={id} data={data} servicesImages={data.servicesImages}/>
}

export default Page