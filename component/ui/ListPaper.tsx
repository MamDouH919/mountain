"use client"
import { useTranslation } from "react-i18next"
import { Paper, Stack, Typography } from "@mui/material"

const ListPaper = ({
    children,
    loading,
    data,
    restFilter,
    height,
    minHeight
}: {
    children: React.ReactNode,
    loading?: boolean
    data?: boolean
    restFilter?: string
    height?: string
    minHeight?: string
}) => {
    const { t } = useTranslation(["dashboard"])
    return (
        <Paper sx={{
            width: '100%',
            display: "grid",
            height: height ?? "calc(100% - (16px + 38px + 16px))",
            gridTemplateRows: !data ? "1fr" : "1fr auto",
            ...(minHeight && { minHeight: minHeight })
        }}>
            {loading ? children :
                data ? children :
                    <Stack justifyContent={"center"} alignItems={"center"} spacing={2}>
                        <Typography textTransform={"capitalize"}>{t("emptyData")}</Typography>
                        {/* {restFilter && <ButtonLink href={restFilter} linkLabel="reset List" />} */}
                    </Stack>
            }
        </Paper>
    )
}

export default ListPaper