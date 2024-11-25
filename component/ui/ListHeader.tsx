"use client"
import { Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const ListHeaderTitle = ({ title }: { title: string }) => {
    const { t } = useTranslation(['dashboard'])
    return (
        <Typography variant="h4">{t(title)}</Typography>
    )
}