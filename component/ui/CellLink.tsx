'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { styled } from "@mui/material/styles";
import { Typography } from '@mui/material';
import { FixedTableCell } from './FixedTableCell';

const PREFIX = "CellLink";

const classes = {
    active: `${PREFIX}-active`,
};

const Root = styled("div")(({ theme }) => ({
    // background: theme.palette.background.default,
    "a": {
        textDecoration: "none",
        color: theme.palette.primary.main,
        opacity: 1,
        [`&:hover`]: {
            textDecoration: "underline",
        },
    }
}));


export const CellLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
    return (
        <FixedTableCell>
            <Root>
                <Link href={href}>
                    {children}
                </Link>
            </Root>
        </FixedTableCell>
    )
}