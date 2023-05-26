import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import "./myticket.css";
import CommantView from "./view";

function MyTicket() {
    const [myTicket, setMyTicket] = useState([]);
    const [view, setView] = useState(false);
    const [ticketId, setTicketId] = useState(null);

    const token = localStorage.getItem("user");
    useEffect(() => {
        axios.get('https://hdms-backend.onrender.com/api/my/ticket', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then((res) => {
            setMyTicket(res.data);
        })
    }, [token])

    const handleChange = (ticketId) => {
        if (ticketId) {
            setTicketId(ticketId);
            setView(true)
        }
    }

    return (
        <>
            {view ?
                <>
                    <CommantView ticketId={ticketId} view={setView} />
                </> : <>
                    <div className="my-ticket">
                        <h1 className="my-ticket-title">My Tickets</h1>
                        <table className="myticket-table">
                            <thead className="myticket-head">
                                <tr className="myticket-head-tr">
                                    <th>Complaint Id</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Priority</th>
                                    <th>Problem</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Comment</th>
                                </tr>
                            </thead>
                            <tbody className="myticket-body">
                                {Array.isArray(myTicket) && myTicket.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.complaint_id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.department}</td>
                                        <td>{user.priority}</td>
                                        <td>{user.problem}</td>
                                        <td>{user.status}</td>
                                        <td>{moment(user.createdAt).fromNow()}</td>
                                        <td>
                                            <button className="view-button" onClick={() => handleChange(user.complaint_id)}>View</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </>
    );
}

export default MyTicket;
