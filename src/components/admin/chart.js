import { useState } from "react";
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { useEffect } from "react";
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export default function DashboardChart() {
    const [ticketData, setTicketData] = useState();

    let adminToken = localStorage.getItem("admin");
    let subAdminToken = localStorage.getItem("subadmin");
    let token = adminToken || subAdminToken;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://hdms-backend.onrender.com/api/user/all/tickets", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                })
                const counts = Array(6).fill(0);
                for (const ticket of res.data) {
                    const month = new Date(ticket.createdAt).getMonth();
                    counts[month]++;
                }
                setTicketData(counts);
            } catch (e) {
                console.log("Api Error" + e);
            }
        };
        fetchData();
    }, [token]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white",
                },
            },
            title: {
                display: true,
                text: "Ticket",
                color: "white"
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'white'
                }
            },
            y: {
                ticks: {
                    color: 'white'
                }
            }
        }
    };


    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: "Tickets",
                data: ticketData,
                borderColor: "white",
                backgroundColor: "transparent",
                pointBackgroundColor: "red",
                pointBorderColor: "red",
            },
        ],
    };

    return <Line options={options} data={data} />;
}