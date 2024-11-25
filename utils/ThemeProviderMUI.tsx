"use client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import { dir } from "i18next";
import { useContext } from "react";
import { ModeContext } from "@/context/modeContext";


export const muiCache = createCache({
    key: "mui",
});

const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const ThemeProviderMUI = ({ children, locale }: { children: React.ReactNode, locale: string }) => {
    const { darkMode } = useContext(ModeContext)

    const theme = createTheme({
        direction: dir(locale),

        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#556cd6",
            },
            secondary: {
                main: "#19857b",
            },
        },
    });


    return (
        <CacheProvider value={dir(locale) === "rtl" ? cacheRtl : muiCache}>

            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    )
}

export default ThemeProviderMUI
