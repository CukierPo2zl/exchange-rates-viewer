import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import Converter from './Converter';
import SymbolsTable from './Table';
import Trending from '../../components/Trending';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {'Adrian Oleszczak '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function Dashboard() {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <Paper className='paper'>
                        <SymbolsTable></SymbolsTable>
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <Trending />
                </Grid>
            </Grid>
            <Box pt={4}>
                <Copyright />
            </Box>
        </>

    );
}