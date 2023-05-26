import DashboardChart from "./chart";
import './dashboard.css';
import DashboardView from "./dashboardView";
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [totalTickets, setTotalTickets] = useState([{}]);
    const [dashboardType, setDashboardType] = useState(null);
    let adminToken = localStorage.getItem("admin");
    let subAdminToken = localStorage.getItem("subadmin");
    let token = adminToken || subAdminToken;

    useEffect(() => {
        fetch("https://hdms-backend.onrender.com/api/user/all/tickets", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }).then(res => res.json())
            .then((data) => {
                setTotalTickets(data);
            })
    }, [token])

    const allTickets = totalTickets.length;
    const closedTickets = totalTickets.filter(close => close.status === "Close").length;
    const pendingTickets = totalTickets.filter(pending => pending.status === "In Progress").length;
    const resolveTickets = totalTickets.filter(resolve => resolve.status === "Resolved").length;

    return (
        <>
            {dashboardType ? (
                <DashboardView type={dashboardType} close={() => setDashboardType(null)} />
            ) : (
                <>
                    <div className="admin-dashboard">
                        <h1 className="dashboard-title">Dashboard</h1>
                        <div className="all-tickets" onClick={() => setDashboardType('allticket')}>
                            <h3>All Tickets</h3>
                            <label className="allticket-count">{allTickets}</label>
                        </div>
                        <div className="close-ticket" onClick={() => setDashboardType('close')}>
                            <h3>Closed Tickets</h3>
                            <label className="closeticket-count">{closedTickets}</label>
                        </div>
                        <div className="pending-ticket" onClick={() => setDashboardType('pending')}>
                            <h3>Pending Tickets</h3>
                            <label className="pending-ticket-count">{pendingTickets}</label>
                        </div>
                        <div className="resolve-ticket" onClick={() => setDashboardType('resolved')}>
                            <h3>Solved Tickets</h3>
                            <label className="resolve-ticket-count">{resolveTickets}</label>
                        </div>
                        <div className="chart">
                            <DashboardChart />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}