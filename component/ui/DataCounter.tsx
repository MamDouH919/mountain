"use client"
import { Paper, Skeleton, Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const DataCounter = ({ total, title, icon }: { total: number, title: string, icon: React.ReactNode }) => {
    const { t } = useTranslation("dashboard")
    return (
        <Paper sx={{ p: 4, width: "100%" }}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                <Stack spacing={2}>
                    <Typography variant={"h5"} textTransform={"capitalize"}>{t(title)}</Typography>
                    <Typography variant={"body2"} fontSize={18}>
                        {total}
                    </Typography>
                </Stack>
                <Stack
                    component={Paper}
                    elevation={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ width: "50px", height: "50px", borderRadius: "50%", backgroundColor: (theme) => theme.palette.divider }}>
                    {icon}
                </Stack>
            </Stack>
        </Paper>
    )
}

export default DataCounter