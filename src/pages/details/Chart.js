import React, { useEffect, useRef, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export default function ApexChart({ form, base }) {
    const [series, setSeries] = useState([{
        name: base,
        data: []
    }])

    const [options, setOptions] = useState({
        colors: ['#388e3c', '#2af534'],
        chart: {
            height: 350,
            type: 'area',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 350
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 500
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            labels: {
                show: false
            },
            type: 'datetime',
            categories: [],

        },
        yaxis: {
            show: false
        },
        tooltip: {
            x: {
                format: 'yy-MM-dd'
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            },
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            },
        },
        noData: {
            text: 'Sorry, no data for this input 😢',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              color: 'red',
              fontSize: '24px',
              fontFamily: 'Roboto',
            }
          }
    })

    const mountedRef = useRef(false)



    const fetchRatesData = (symbol, startAt, endAt) => {
        fetch(`http://studiatozlo.pythonanywhere.com/api/rates/?base=${base}&target=${symbol}&start_at=${startAt}&end_at=${endAt}`)
            .then(res => {
                if(res.status===200){
                    return res.json()
                }
                else{
                    return []
                }
            })
            .then(
                (result) => {
                    let rates = []
                    let dates = []
                    result.map((item) => {
                        rates.push(item['exchange_rate'])
                        dates.push(item['date'])
                    })
                    if (mountedRef.current) {
                        setSeries([{
                            name: base,
                            data: rates
                        }])
                        setOptions({
                            xaxis: {
                                categories: dates
                            },
                        })
                    }
                }).catch(error => {
                    console.log(error);
                });
    }

    useEffect(() => {
        mountedRef.current = true
        fetchRatesData(form.symbol, form.startAt, form.endAt)

        return () => {
            mountedRef.current = false
        }
    }, [form, base])

    return (

        <div id="chart" style={{ 'height': '337px' }}>
            <ReactApexChart options={options} series={series} type="area" height={350} />
        </div>
    )
}
