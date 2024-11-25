"use client"
import initTranslations from '@/app/i18n';
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { BsDatabaseFillSlash } from "react-icons/bs";

const NoData = ({ label }: { label?: string }) => {
    const { t } = useTranslation()
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 180px)', width: '100%' }}>
            <Stack spacing={3} alignItems='center'>
                <BsDatabaseFillSlash size={60} />
                <Typography variant='h5' >
                    {label ?? t("noData")}
                </Typography>
            </Stack>
        </Box>
    )
}

export default NoData
