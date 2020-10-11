import React from "react";
import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, Box } from "@material-ui/core";
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles';



export class SymbolsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            symbols: {},
        };
    }
    componentDidMount() {
        this.get_latest()
        this.get_symbols()
    }
    get_latest() {
        fetch("http://studiatozlo.pythonanywhere.com/api/latest/", {
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }
    get_symbols() {
        fetch("http://studiatozlo.pythonanywhere.com/api/symbols/", {
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        symbols: result['symbols']
                    });
                },
                (error) => {
                    this.setState({
                        error
                    });
                }
            )
    }
    render() {
        const { error, isLoaded, items, symbols } = this.state;

        if (error) {
            return <div>Error: {error.message} </div>;
        } else if (!isLoaded) {
            return (
                <>
                    <Skeleton variant="text" width='100%' height={118} />
                    <Skeleton variant="text" width='100%' height={50} />
                    <Skeleton variant="text" width='100%' height={50} />
                    <Skeleton variant="text" width='100%' height={50} />
                </>
            );
        } else {
            return (
                <TableContainer>
                    <Table aria-label="simple table">
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
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.symbol}>
                                    <TableCell component="th" scope="row">
                                        <Typography component='div'>
                                            <Box fontWeight="fontWeightBold" fontSize={14}>
                                                <Link to={{
                                                    pathname: '/details',
                                                    symbol: item.symbol
                                                }} className='router-link'>
                                                    {item.symbol}
                                                </Link>
                                            </Box>
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={{
                                            pathname: '/details',
                                            symbol: item.symbol
                                        }} className='router-link'>
                                            {symbols[item.symbol]}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">{item.rate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            );
        }
    }
}