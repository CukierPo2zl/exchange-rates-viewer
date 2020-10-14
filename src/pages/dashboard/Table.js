import React, { useEffect, useRef, useState } from "react";
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, Box } from "@material-ui/core";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom'
import axios from 'axios'

function SymbolsTableSkeleton() {
    return (
        <>
            <Skeleton variant="text" width='100%' height={118} />
            <Skeleton variant="text" width='100%' height={50} />
            <Skeleton variant="text" width='100%' height={50} />
            <Skeleton variant="text" width='100%' height={50} />
        </>
    );
}

function SymbolsTableHead() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">
                    <TrendingUpIcon />
                    <Typography component='div'>
                        <Box fontWeight="fontWeightLight" fontSize={12}>(EUR)</Box>
                    </Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

// const scrollToRef = () => window.scrollTo({
//     top: 0,
//     behavior: "smooth"
// })
function SymbolsTableBody({ items, symbols }) {

    return (
        <TableBody>
            {items.map((item) => (
                <TableRow key={item.symbol}>
                    <TableCell component="th" scope="row">
                        <Typography component='div'>
                            <Box fontWeight="fontWeightBold" fontSize={14}>
                                <Link to={{
                                    pathname: '/details',
                                    currency: item,
                                    symbols: symbols,
                                    items: items,
                                  
                                }}
                                    className='router-link'
                                >
                                   {item.symbol}
                                </Link>
                            </Box>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Link to={{
                            pathname: '/details',
                            currency: item,
                            symbols: symbols,
                            items: items,
                           
                        }}
                            className='router-link'>
                            {symbols[item.symbol]}
                        </Link>
                    </TableCell>
                    <TableCell align="right">{item.rate}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}
export default function SymbolsTable(props) {
    const [isLoaded, setIsLoaded] = useState(props.items && props.symbols ? true : false,)
    const [items, setItems] = useState(props.items || [])
    const [symbols, setSymbols] = useState(props.symbols || {})
    const [error, setError] = useState(null)
    const mountedRef = useRef(false)

    const fetchData = () => {
        const apiUrl = 'http://studiatozlo.pythonanywhere.com/api/'

        const getLatest = axios.get(apiUrl + 'latest/')
        const getSymbols = axios.get(apiUrl + 'symbols/')

        axios.all([getLatest, getSymbols]).then(
            axios.spread((...allData) => {
                const allDataLatest = allData[0].data
                const allDataSymbols = allData[1].data.symbols
                if (mountedRef.current) {
                    let eur = { symbol: 'EUR', rate: '1' }
                    allDataLatest.push(eur)
                    setItems(allDataLatest);
                    setSymbols(allDataSymbols);
                    setIsLoaded(true)
                }
            })
        )
            .catch((error) => {
                setError(error)
            })
    }



    useEffect(() => {
        mountedRef.current = true
        if (!isLoaded) {
            fetchData()
        }
        return () => {
            mountedRef.current = false
        }
    }, [])

    if (error) {
        return <div>Error: {error.message} </div>;
    } else if (!isLoaded) {
        return <SymbolsTableSkeleton />
    } else {
        return (
            <TableContainer>
                <Table aria-label="simple table">
                    <SymbolsTableHead />
                    <SymbolsTableBody items={items} symbols={symbols} />
                </Table>
            </TableContainer>
        );
    }


}