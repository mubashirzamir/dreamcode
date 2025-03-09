import React from 'react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'
import {Line} from 'react-chartjs-2'
import moment from 'moment'
import {Result} from 'antd' // Import moment.js for formatting

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            align: 'end',
        },
    },
}

export function WaterSavings({monthlyWaterCollected}) {
    if (!monthlyWaterCollected) {
        return <Result status="404" title="No Data Found"
                       subTitle="No water savings data found for the selected location."/>
    }

    console.log('monthlyWaterCollected', monthlyWaterCollected)
    // Extract months and values from the monthlyWaterCollected object
    const labels = Object.keys(monthlyWaterCollected).map(month => {
        // Format the key as a full month name (e.g., "January", "February")
        return moment(month, 'YYYY-MM').format('MMMM') // "MMMM" formats the month as full name
    })

    const dataValues = Object.values(monthlyWaterCollected) // Get the water collected values for each month

    const data = {
        labels,
        datasets: [
            {
                label: 'Water Savings (litres)', // Label for the dataset
                data: dataValues, // Dynamic data based on the API response
                borderColor: 'rgb(66, 189, 255)', // Line color
                backgroundColor: 'rgba(66, 189, 255, 0.9)', // Fill color with transparency
                fill: true,
                tension: 0.2,
            },
        ],
    }

    return <Line options={options} data={data}/>
}
