import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);



export function ProgressChart() {
    const [statusData, setStatusData] = useState([]);
    let token = localStorage.getItem("admin");

    useEffect(() => {
        const fetchTickets = async () => {
            const response = await axios.get("https://hdms-backend.onrender.com/api/user/all/tickets", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            });
            const counts = {
                "In Progress": 0,
                "Resolved": 0,
                "Rejected": 0,
                "Close": 0
            };
            for (const ticket of response.data) {
                counts[ticket.status]++;
            }
            setStatusData(Object.values(counts));
        };
        fetchTickets();
    }, []);

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            },
            title: {
                display: true,
                text: 'Ticket Status',
            },
        },
    };

    const labels = ['In Progress', 'Resolved', 'Rejected', 'Close'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Ticket Status',
                data: statusData,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };
    return <Bar options={options} data={data} />;
}
