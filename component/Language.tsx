"use client";
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { LanguageOutlined } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { config } from '@/config';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

const Languages: Record<string, string> = {
    ar: "Arabic",
    en: "English"
};

export default function LanguageMenu() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { t, i18n } = useTranslation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange = (e: string) => {
        const newLocale = e

        // set cookie for next-i18n-router
        const days = 30;
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const expires = date.toUTCString();
        document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

        // redirect to the new locale path
        if (
            currentLocale === i18nConfig.defaultLocale
            // !i18nConfig.prefixDefault
        ) {
            router.push('/' + newLocale + currentPathname);
        } else {
            router.push(
                currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
            );
        }

        router.refresh();
    };


    return (
        <div>
            <Tooltip title={t("changeLang")}>
                <IconButton
                    id="fade-button"
                    aria-controls={open ? 'fade-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <LanguageOutlined color={"primary"} />
                </IconButton>
            </Tooltip>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => handleClose()}
                TransitionComponent={Fade}
            >
                {config.app.languages.map(lang => (
                    <MenuItem
                        key={lang}
                        onClick={() => handleChange(lang)}
                        sx={{ background: (theme) => i18n.language === lang ? theme.palette.divider : "" }}
                    >
                        {Languages[lang] || lang}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
