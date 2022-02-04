/* eslint-disable */
import React, { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'
import { useApis } from 'services/api'
import { apiUrls } from 'configs/apis'
import { Box, Card, CardHeader, Grid } from '@mui/material'
import './index.scss'
import Filter from './Filter'

const Dashboard: React.FC = () => {
  const { apiGet } = useApis()

  useEffect(() => {}, [])

  return (
    <div className="Dashboard">
      <Grid container gap={3} mb={3}>
        <Grid item xs={12}>
          <Card>
            <div className="d-f jc-sb">
              <CardHeader title="Website Visits" subheader="(+43%) than last year" />
              <Filter />
            </div>
            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
              <ReactApexChart
                type="line"
                series={[
                  {
                    name: 'Team A',
                    type: 'column',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                  },
                  {
                    name: 'Team B',
                    type: 'area',
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                  },
                  {
                    name: 'Team C',
                    type: 'line',
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                  },
                ]}
                options={{
                  stroke: { width: [0, 2, 3], curve: 'smooth' },
                  plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
                  fill: { type: ['solid', 'gradient', 'solid'] },
                  labels: [
                    '01/01/2003',
                    '02/01/2003',
                    '03/01/2003',
                    '04/01/2003',
                    '05/01/2003',
                    '06/01/2003',
                    '07/01/2003',
                    '08/01/2003',
                    '09/01/2003',
                    '10/01/2003',
                    '11/01/2003',
                  ],
                  xaxis: { type: 'datetime' },
                  tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                      formatter: (y) => {
                        if (typeof y !== 'undefined') {
                          return `${y.toFixed(0)} visits`
                        }
                        return y
                      },
                    },
                  },
                }}
                height={364}
              />
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ mb: 3, pb: 3 }}>
        <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        <Grid container>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              type="pie"
              series={[4344, 5435, 1443, 4443]}
              options={{
                colors: ['#00AB55', '#1890FF', '#FFC107', '#FF4842'],
                labels: ['America', 'Asia', 'Europe', 'Africa'],
                stroke: { colors: ['#fff'] },
                legend: { floating: true, horizontalAlign: 'center', show: false },
                dataLabels: { enabled: true, dropShadow: { enabled: false } },
                tooltip: {
                  fillSeriesColor: false,
                  y: {
                    title: {
                      formatter: (seriesName) => `#${seriesName}`,
                    },
                  },
                },
                plotOptions: {
                  pie: { donut: { labels: { show: false } } },
                },
              }}
              height={280}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              type="pie"
              series={[4344, 5435, 1443, 4443]}
              options={{
                colors: ['#00AB55', '#1890FF', '#FFC107', '#FF4842'],
                labels: ['America', 'Asia', 'Europe', 'Africa'],
                stroke: { colors: ['#fff'] },
                legend: { floating: true, horizontalAlign: 'center', show: false },
                dataLabels: { enabled: true, dropShadow: { enabled: false } },
                tooltip: {
                  fillSeriesColor: false,
                  y: {
                    title: {
                      formatter: (seriesName) => `#${seriesName}`,
                    },
                  },
                },
                plotOptions: {
                  pie: { donut: { labels: { show: false } } },
                },
              }}
              height={280}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ReactApexChart
              type="pie"
              series={[4344, 5435, 1443, 4443]}
              options={{
                colors: ['#00AB55', '#1890FF', '#FFC107', '#FF4842'],
                labels: ['America', 'Asia', 'Europe', 'Africa'],
                stroke: { colors: ['#fff'] },
                legend: { floating: true, horizontalAlign: 'center', show: false },
                dataLabels: { enabled: true, dropShadow: { enabled: false } },
                tooltip: {
                  fillSeriesColor: false,
                  y: {
                    title: {
                      formatter: (seriesName) => `#${seriesName}`,
                    },
                  },
                },
                plotOptions: {
                  pie: { donut: { labels: { show: false } } },
                },
              }}
              height={280}
            />
          </Grid>
        </Grid>
      </Card>
      <Card sx={{ mb: 3 }}>
        <CardHeader title="Website Visits" subheader="(+43%) than last year" />
        <ReactApexChart
          type="bar"
          series={[
            {
              data: [21, 22, 10, 28],
            },
          ]}
          options={{
            chart: {
              height: 420,
              type: 'bar',
              // events: {
              //   click: function (chart, w, e) {
              //     // console.log(chart, w, e)
              //   },
              // },
            },
            colors: ['#00AB55', '#1890FF', '#FFC107', '#FF4842'],
            plotOptions: {
              bar: {
                columnWidth: '40%',
                distributed: true,
                borderRadius: 12,
              },
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: false,
            },
            xaxis: {
              categories: [['John', 'Doe'], ['Joe', 'Smith'], ['Jake', 'Williams'], 'Amber'],
              labels: {
                style: {
                  colors: ['#00AB55', '#1890FF', '#FFC107', '#FF4842'],
                  fontSize: '12px',
                },
              },
            },
          }}
          height={340}
        />
      </Card>
    </div>
  )
}

export default Dashboard
