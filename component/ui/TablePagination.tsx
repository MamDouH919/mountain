import { TablePagination } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
const MUITablePagination = (props: any) => {
    const {
        count,
        rowsPerPage,
        page,
        onPageChange,
        onRowsPerPageChange,
        rowsPerPageOptions,
    } = props;

    const PREFIX = "ListPickups";

    const classes = {
        background: `${PREFIX}-background`,
    };

    const Root = styled("div")(({ theme }) => ({
        [`& .${classes.background}`]: {
            "& .MuiTablePagination-toolbar": {
                overflowY: "hidden",
                height: "100% !important",
                minHeight: "100% !important",
                "&::-webkit-scrollbar": {
                    height: "8px",
                }
            },
        },
    }));


    const { i18n } = useTranslation();

    // const Languages = config.app.languages;
    // const lang = localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : Languages[0];
    return (
        <Root>
            <TablePagination
                className={classes.background}
                sx={{
                    height: "40px",
                    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                    {
                        margin: 0,
                    },
                }}
                labelDisplayedRows={
                    i18n.language === "en"
                        ? undefined
                        : ({ from, to, count }) =>
                            `${from}-${to} من ${count !== -1 ? count : ` أكثر من${to}`}`
                }
                labelRowsPerPage={""}
                rowsPerPageOptions={rowsPerPageOptions ?? [20, 50, 100]}
                component="div"
                count={count ? count : 20}
                rowsPerPage={rowsPerPage}
                page={!count || count <= 0 ? 0 : page}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                ActionsComponent={undefined}
            />
        </Root>
    );
};

export default MUITablePagination;
