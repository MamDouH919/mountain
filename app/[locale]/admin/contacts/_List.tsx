"use client"
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Stack, Typography, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ListPaper from '@/component/ui/ListPaper';
import TableBodyWithLoad from '@/component/ui/TableBodyWithLoad';
import { CellLink } from '@/component/ui/CellLink';
import { dateFormatLL } from '@/component/helperFunctions/dateFunctions';
import { FixedTableCell } from '@/component/ui/FixedTableCell';
import MUITablePagination from '@/component/ui/TablePagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';

const PREFIX = "orders";
const classes = {
    filter: `${PREFIX}-filter`,
    filterActive: `${PREFIX}-filterActive`,
    title: `${PREFIX}-title`,
};
const Root = styled("div")(({ theme }) => ({
    height: "100%",

    [`& .${classes.filter}`]: {
        padding: theme.spacing(0.5, 1.5),
        borderRadius: theme.spacing(1),
        cursor: "pointer",
        [`&:hover`]: {
            background: theme.palette.divider
        },
    },
    [`& .${classes.filterActive}`]: {
        background: theme.palette.divider
    },
    [`& .${classes.title}`]: {
        fontSize: "22px"
    },
}));

export default function OrdersList({
    // data,
    // page,
    // pageSize,
    totalContacts
}: {
    // data: {
    //     id: number,
    //     name: string,
    //     email: string,
    //     branch: string,
    //     mobile: string,
    //     message: string,
    //     createdAt: Date,
    // }[],
    // pageSize: number,
    // page: number,
    totalContacts: number
}) {
    const { t } = useTranslation(["dashboard"]);
    const [page, setPage] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(20);

    const [loading, setLoading] = React.useState(true);

    const [data, setData] = React.useState<any>([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/api/contacts?page=${page + 1}&pageSize=${pageSize}`);
            setLoading(false);
            setData(response.data.data);
        };
        fetchData();
    }, [page, pageSize]);

    const handleChangePage = (event: unknown, newPage: number) => {
        // const params = new URLSearchParams(Array.from(searchParams.entries()));
        // params.set('page', (newPage + 1).toString());
        // router.push(`${pathname}?${params.toString()}`);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

    const tableCellHeader = [
        "", "name", "message", "branch", "email", "mobile", "createdAt"
    ]


    return (
        <Root>
            <ListPaper loading={loading} data={!!(data && data.length)} restFilter={`${PREFIX}`}>
                <TableContainer sx={{ width: "100%", overflow: "auto" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {tableCellHeader.map(e =>
                                    <TableCell align={'left'} key={e}>
                                        {t(e)}
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBodyWithLoad loading={loading} tableCellHeaderLength={tableCellHeader.length}>
                            <TableBody>
                                {data.map((row: any, index: number) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <FixedTableCell>
                                                {index + 1}
                                            </FixedTableCell>
                                            <FixedTableCell>
                                                {row.name}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                {row.message}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                {row.branch ?? t("placeholder")}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                {row.email}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                {row.mobile}
                                            </FixedTableCell>
                                            <FixedTableCell align={'left'}>
                                                {dateFormatLL(row.createdAt.toString())}
                                            </FixedTableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </TableBodyWithLoad>
                    </Table>

                </TableContainer>
                <MUITablePagination
                    count={totalContacts}
                    page={page}
                    rowsPerPage={pageSize}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </ListPaper>
        </Root>
    );
}
