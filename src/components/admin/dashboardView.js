import React, { useEffect, useState } from 'react';
import "./dashboardView.css";
import axios from 'axios';
import moment from 'moment';

function DashboardView({ close, type }) {
    const [data, setData] = useState([]);
    const [closed, setClosed] = useState([]);
    const [title, setTitle] = useState('');

    let adminToken = localStorage.getItem("admin");
    let subAdminToken = localStorage.getItem("subadmin");
    let token = adminToken || subAdminToken;

    useEffect(() => {
        axios.get("https://hdms-backend.onrender.com/api/user/all/tickets", {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }).then((res) => {
            setData(res.data);
        }).catch((error) => {
            console.log(error);
        });

        const filterTickets = () => {
            switch (type) {
                case 'allticket':
                    setClosed(data);
                    setTitle('All Tickets');
                    break;
                case 'close':
                    setClosed(data.filter((item) => item.status === "Close"));
                    setTitle('Closed Tickets');
                    break;
                case 'pending':
                    setClosed(data.filter((item) => item.status === "In Progress"));
                    setTitle('Pending Tickets');
                    break;
                case 'resolved':
                    setClosed(data.filter((item) => item.status === "Resolved"));
                    setTitle('Resolved Tickets');
                    break;
                default:
                    setTitle('');
            }
        };

        filterTickets();

    }, [type, data, token]);

    return (
        <div className='dashboard_view'>
            <div className='dahboard_container'>
                <div className='dahboard_close' onClick={() => close(false)}>&times;</div>
                <div className='dahboard_title'>
                    {title ? <div>{title}</div> : null}
                </div>
                <div className='dahboard_content'>
                    <table className='dash_table'>
                        <thead className='dash_head'>
                            <th>Complaint id</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Priority</th>
                            <th>Problem</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </thead>
                        <tbody className='dash_body'>
                            {closed.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.complaint_id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.department}</td>
                                        <td>{item.priority}</td>
                                        <td>{item.problem}</td>
                                        <td>{item.status}</td>
                                        <td>{moment(item.createdAt).fromNow()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className='dahboard_footer'>
                </div>
            </div>
        </div>
    );
}

export default DashboardView;
