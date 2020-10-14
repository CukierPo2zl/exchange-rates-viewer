import 'date-fns';
import format from "date-fns/format";
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SymbolsTable from '../dashboard/Table';
import {
  MuiPickersUtilsProvider,
  DatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import ApexChart from './Chart';
import Skeleton from '@material-ui/lab/Skeleton';
import Trending from '../../components/Trending';

function PickDates({ label, onDateChange, initialDate }) {
  const [selectedDate, setSelectedDate] = useState(initialDate);

  const handleDateChange = (date) => {
    setSelectedDate(date)
    onDateChange(date)
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        variant="inline"
        format="yyyy-MM-dd"
        margin="normal"
        label={label}
        value={selectedDate}
        onChange={date => handleDateChange(format(date, 'yyyy-MM-dd'))}
      />
    </MuiPickersUtilsProvider>
  );
}

function ComboBox({ onSelectSymbol, defaultValue }) {
  const [value, setValue] = useState('EUR')
  const [options, setOptions] = useState(['EUR'])
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    setValue(defaultValue)
    getSupportedCurrencies()
    return () => {
      mountedRef.current = false
    }
  }, [defaultValue])

  const getSupportedCurrencies = () => {
    fetch(`http://studiatozlo.pythonanywhere.com/api/currencies/`)
      .then(res => res.json())
      .then(
        (result) => {
          if (mountedRef.current) {
            let tmp = result
            tmp.push(value)
            setOptions(tmp)
          }
        }).catch(error => {
          console.log(error);
        });
  }

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue)
      onSelectSymbol(newValue)
    }

  }
  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      id="combo-box"
      options={options}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label="Symbol" variant="outlined" />}
    />
  );
}


function CurrencyInfo({ base, rate, onFormDataChange, symbol }) {
  let initialStartDate = format((new Date() - 604800000), 'yyyy-MM-dd')
  let initialEndDate = format(new Date(), 'yyyy-MM-dd')

  const [symbolData, setSymbolData] = useState(symbol || 'EUR')
  const [startAt, setStartAt] = useState(initialStartDate)
  const [endAt, setEndAt] = useState(initialEndDate)
  const [currentRate, setCurrentRate] = useState(rate)
  const mountedRef = useRef(false)

  useEffect(() => {
    onFormDataChange({
      'symbol': symbolData,
      'startAt': startAt,
      'endAt': endAt,
    })
  }, [symbolData, startAt, endAt])

  useEffect(() => {
    mountedRef.current = true

    getCurrentRate()
    return () => {
      mountedRef.current = false
    }
  }, [symbolData, base])

  useEffect(() => {
    if (symbol) {
      setSymbolData(symbol)
    }

  }, [symbol])
  const getCurrentRate = () => {
    fetch(`https://api.exchangeratesapi.io/latest?symbols=${symbolData}&base=${base}`)
      .then(res => res.json())
      .then(
        (result) => {
          if (mountedRef.current) {

            setCurrentRate(result['rates'][symbolData])
          }
        }).catch(error => {
          console.log(error);
        });
  }
  return (
    <Grid container alignItems='center' spacing={3}>
      <Grid item xs={12}>
        <Paper className='paper'>
          <Grid alignItems='baseline' container>
            <Typography variant='h2' component='h2'>
              {base}
            </Typography>
            <Typography variant='subtitle2' component='h2'>
              {symbolData ? symbolData : 'EUR'}
            </Typography>
          </Grid>
          <Grid justtify='center' container>
            <Grid item>
              <MonetizationOnIcon fontSize='large' color='secondary' />
            </Grid>
            <Grid item>
              <Typography variant='h6' component='h6'>
                {currentRate}
              </Typography>
            </Grid>
          </Grid>
          <ComboBox defaultValue={symbolData} onSelectSymbol={symbol => setSymbolData(symbol)} />
        </Paper>

      </Grid>
      <Grid item xs={6}>
        <Paper className='paper'>
          <PickDates label='Start' onDateChange={date => setStartAt(date)} initialDate={initialStartDate} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className='paper'>
          <PickDates label='End' onDateChange={date => setEndAt(date)} initialDate={initialEndDate} />
        </Paper>
      </Grid>
    </Grid>
  )
}

function ChartSkeleton() {
  return <Skeleton variant="text" width={150} height={337} />

}
export default function Details(props) {
  const [form, setForm] = useState({
    'symbol': props.location.base || 'EUR',
    'startAt': format((new Date() - 604800000), 'yyyy-MM-dd'),
    'endAt': format((new Date()), 'yyyy-MM-dd'),
  })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    return () => {
      setIsLoaded(false)
    }
  }, [])

  if (!(props.location.currency))
    props.history.push('/')

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <CurrencyInfo
          symbol={props.location.base}
          base={props.location.currency?.symbol}
          rate={props.location.currency?.rate}
          onFormDataChange={form => setForm(form)}
        />
      </Grid>
      <Grid item xs={12} md={9}>
        <Paper style={{ 'padding': '0' }}>
          {
            isLoaded ? <ApexChart base={props.location.currency?.symbol} form={form} /> : <ChartSkeleton />
          }

        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper style={{ 'marginTop': '25px' }} className='paper'>
          <SymbolsTable symbols={props.location.symbols} items={props.location.items}></SymbolsTable>
        </Paper>
      </Grid>
      <Grid item xs={3}>
        <Trending />
      </Grid>
    </Grid>
  )
}