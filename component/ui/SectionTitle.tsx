import { Stack, Typography } from '@mui/material'
import React from 'react'
import { styled } from "@mui/material/styles";

const PREFIX = "SectionTitle";

const classes = {
    titleDivider: `${PREFIX}-titleDivider`,
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.titleDivider}`]: {
        borderRadius: "20px",
        direction: "rtl",
        width: "100px",
        margin: "auto",
        height: 4,
        background: `linear-gradient(90deg,${theme.palette.secondary.main} 52%, ${theme.palette.primary.main} 52%)`,
        marginTop: theme.spacing(2),
    }
}));

interface inputProps {
    sectionTitle: string
    subSectionTitle?: string
}

const SectionTitle = (props: inputProps) => {
    const { sectionTitle, subSectionTitle } = props
    return (
        <Root style={{ margin: "5px 0" }}>
            <Typography variant='h3' textAlign={"center"} textTransform={"capitalize"} color={"primary.main"}>
                {sectionTitle}
            </Typography>
            <Typography variant='body2' fontSize={14} textAlign={"center"} color={"text.secondary"} mt={1} width={"80%"} mx={"auto"}>
                {subSectionTitle}
            </Typography>
            <Stack className={classes.titleDivider}>
            </Stack>
        </Root>
    )
}

export default SectionTitle