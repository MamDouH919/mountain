"use client"
import React from 'react'
import { styled } from "@mui/material/styles";
import Link from "next/link";

const PREFIX = "StyledLink";
const classes = {
    link: `${PREFIX}-link`,
};

const Root = styled("div")(({ theme }) => ({
    [`& .${classes.link}`]: {
        textDecoration: "none",
        color: theme.palette.text.secondary,
        transition: "all 0.5s",
        fontSize: "1.2rem",
        "&:hover": {
            textDecoration: "underline",
            color: theme.palette.primary.main,
        },
    }
}))

const StyledLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <Root>
            <Link href={href} className={classes.link}>
                {children}
            </Link>
        </Root>
    )
}

export default StyledLink
