"use client";
import { Breadcrumbs, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import GrainIcon from '@mui/icons-material/Grain';
import { useTranslation } from "react-i18next";
import Link from "next/link";

const PREFIX = "BreadCrumb";
const classes = {
    activeLink: `${PREFIX}-activeLink`,
    breadcrumbs: `${PREFIX}-breadcrumbs`,
};

const Root = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.paper,
    paddingTop: "70px",
    height: 250,
    [`& .${classes.activeLink}`]: {
        color: theme.palette.text.secondary,
        fontSize: "1.1rem",
        textDecoration: "none",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textTransform: "capitalize",
        opacity: 0.7,
        [`&:hover`]: {
            opacity: 1,
            textDecoration: "underline",
        },
    },
    [`& .${classes.breadcrumbs} .MuiBreadcrumbs-ol`]: {

        justifyContent: "center",
        alignItems: "center",

    },
}));

interface inputProps {
    pageLink: string;
    prevLink?: string;
}

const BreadCrumb = (props: inputProps) => {
    const { pageLink, prevLink } = props;
    const { t } = useTranslation();
    return (
        <Root justifyContent={"center"} alignItems={"center"}>
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumbs}>
                <Link
                    href={"/"}
                    className={classes.activeLink}
                >
                    <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {t("home")}
                </Link>
                {prevLink && <Link href={`/${prevLink}`} className={classes.activeLink}>
                    <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {t(prevLink)}
                </Link>}
                <Typography
                    sx={{ display: 'flex', alignItems: 'center' }}
                    fontSize={"1.1rem"}
                    color="text.primary"
                    textTransform="capitalize"
                >
                    <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                    {t(pageLink)}
                </Typography>
            </Breadcrumbs>
        </Root>
    )
}

export default BreadCrumb
