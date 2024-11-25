"use client"
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { styled, useTheme } from "@mui/material/styles";
import {
    FaFacebookF,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaTiktok,
    FaPhone,
    FaYoutube,
    FaSlack,
    FaRegCopyright,
} from "react-icons/fa";
import Image from 'next/image';
import { config } from '@/config';

const PREFIX = "Footer";
const classes = {
    social: `${PREFIX}-social`,
    company: `${PREFIX}-company`,
};

const Root = styled(Stack)(({ theme }) => ({
    background: theme.palette.background.default,
    padding: theme.spacing(5, 0),
    color: theme.palette.primary.main,
    borderTop: `2px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[5],
    [`& .${classes.social}`]: {
        display: "flex",
        flexWrap: "wrap",
        width: 40,
        height: 40,
        background: theme.palette.divider,
        borderRadius: "50%",
        "& a": {
            color: theme.palette.primary.main,
            fontSize: 22,
            display: "flex"
            // "&:hover": {
            //     background: theme.palette.primary.main,
            //     color: theme.palette.common.white,
            // },
        },
    },
    [`& .${classes.company}`]: {
        color: theme.palette.text.primary
    },
}));

const socialIcons: { [key: string]: JSX.Element } = {
    facebook: <FaFacebookF />,
    linkedin: <FaLinkedinIn />,
    instagram: <FaInstagram />,
    whatsapp: <FaWhatsapp />,
    tiktok: <FaTiktok />,
    phone: <FaPhone />,
    youtube: <FaYoutube />,
    slack: <FaSlack />,
};

const Footer = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme()
    return (
        <Root alignItems={"center"} spacing={2}>
            <Image
                src={theme.palette.mode === "dark" ? "/logoLight.webp" : "/logo.webp"}
                alt="logo"
                layout="intrinsic"
                width={200}
                height={50} // This sets the height to 50px, and the width scales accordingly.
            />
            <Typography variant="h5">
                {i18n.language === "ar" ? config.app.name.ar : config.app.name.en}
            </Typography>
            <Stack direction={"row"} spacing={2} flexWrap={"wrap"} useFlexGap>
                {config.socialLinks.map((link) => {
                    const Icon = socialIcons[link.name];
                    return (
                        <Stack justifyContent={"center"} alignItems={"center"} key={link.name} className={classes.social}>
                            <a rel="noopener noreferrer" href={link.link} target="_blank">
                                {Icon}
                            </a>
                        </Stack>
                    );
                })}
            </Stack>
            <Typography variant='body1' fontSize={"20px"}>
                <FaRegCopyright />
                {" "}
                {t("poweredDate")}
                {" "}
                {t("poweredBy")}
                {" "}
                <a className={classes.company} href='https://mountain-egy.site/' rel="noopener noreferrer" target="_blank">{t("companyName")}</a>
            </Typography>
        </Root>
    );
};

export default Footer;
