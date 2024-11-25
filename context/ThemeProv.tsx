"use client";
import React, { useContext } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { dir } from "i18next";
import { ModeContext } from './modeContext';
import { config } from "@/config";
import * as color from "@mui/material/colors";
import { SnackbarProvider } from "notistack";
import { getCookie } from 'cookies-next';
import { useMediaQuery } from '@mui/material';

export const muiCache = createCache({
    key: "mui",
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ThemeProv = ({ children, locale }: { children: React.ReactNode, locale: string }) => {
    const { darkMode } = useContext(ModeContext)

    const primaryColor = darkMode ? config.theme.primaryDark : config.theme.primaryLight;
    const primaryColorKey = primaryColor as keyof typeof color;
    const secondaryColor = darkMode ? config.theme.secondaryDark : config.theme.secondaryLight;
    const secondaryColorKey = secondaryColor as keyof typeof color;

    const theme = createTheme({
        direction: dir(locale),
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: primaryColor.startsWith("#")
                    ? primaryColor
                    : color[primaryColorKey][500 as keyof typeof color[typeof primaryColorKey]],
            },
            secondary: {
                main: secondaryColor.startsWith("#")
                    ? secondaryColor
                    : color[secondaryColorKey][500 as keyof typeof color[typeof secondaryColorKey]],
            },
            ...(darkMode ? {
                background: {
                    default: "#18191a",
                    paper: "#2f3031",
                }
            }
                : {
                    background: {
                        default: "#fafafa",
                        paper: "#fff",
                    }
                })
        },
        typography: {
            fontFamily: ['__Cairo_2664c3', '__Cairo_Fallback_2664c3'].join(","),
            fontSize: 12.5,
            h1: {
                lineHeight: "normal"
            }
        }
    });

    return (
        <AppRouterCacheProvider options={{
            key: dir(locale) === "rtl" ? "muirtl" : "mui",
            stylisPlugins: dir(locale) === "rtl" ? [prefixer, rtlPlugin] : [],
        }}>

            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider maxSnack={3}>
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
    )
}

export default ThemeProv
