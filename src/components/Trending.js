import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@material-ui/core";
import { Link } from 'react-router-dom'
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'



function TrendingTableBody() {
    const trendings = [
        { base: 'EUR', symbol: 'GBP', rate: '', key: '1' },
        { base: 'EUR', symbol: 'USD', rate: '', key: '2' },
        { base: 'GBP', symbol: 'USD', rate: '', key: '3' },
        { base: 'EUR', symbol: 'CHF', rate: '', key: '4' },
    ]
    const [trending, setTrending] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const mountedRef = useRef(false)



    const getRates = () => {
        const apiUrl = (symbol, base) => `https://api.exchangeratesapi.io/latest?symbols=${symbol}&base=${base}`
        const requests = []

        trendings.map((item) => {
            requests.push(axios.get(apiUrl(item.symbol, item.base)))
        })

        axios.all(requests).then(

            axios.spread((...allData) => {
                let index = 0;
                allData.map((res) => {
                    const symbol = Object.keys(res.data.rates)[0]
                    const rate = res.data.rates[symbol]

                    trendings[index].rate = rate
                    index = index + 1
                })
                if (mountedRef.current) {
                    setTrending(trendings)
                }

            })
        )

    }

    useEffect(() => {
        mountedRef.current = true
        getRates()
        return () => {
            mountedRef.current = false
            setIsLoading(false)
        }
    }, [])



    return (
        <TableContainer>
            <Table>
                <TableBody>
                    {trending.map((item) => (
                        <TableRow key={item.key} hover>
                            <TableCell component="th" scope="row">
                                <Typography component='div'>
                                    <Grid container alignItems='baseline'>
                                        <Grid item>
                                            <Box fontWeight="fontWeightBold" fontSize={14}>
                                                <Link to={{
                                                    pathname: '/details',
                                                    currency: {
                                                        symbol: item.base,
                                                        rate: item.rate
                                                    },
                                                    base: item.symbol
                                                }}
                                                    className='router-link'>
                                                    {item.base}
                                                </Link>
                                            </Box>
                                        </Grid>
                                        <Grid item>
                                            <Box fontWeight="fontWeightLight" fontSize={14}>
                                                &nbsp;{item.symbol}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{item.rate}</TableCell>

                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    )
}
export default function Trending() {
    return (
        <Paper className='paper'>
            <Typography component='h1' variant="h4" gutterBottom>
                Trending
            </Typography>
            <TrendingTableBody />
        </Paper>
    )
}