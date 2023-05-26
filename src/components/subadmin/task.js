import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminUpdate from '../admin/update';
import "./task.css";
import moment from "moment";

function SubAdminTask() {
    const [getTask, setGetTask] = useState([]);
    const [updateTicketId, setUpdateTicketId] = useState(null);
    const [update, setUpdate] = useState(false);
    const [status, setStatus] = useState("");

    let token = localStorage.getItem("subadmin");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://hdms-backend.onrender.com/api/task", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });
                setGetTask(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();

        const interval = setInterval(fetchData, 1000);

        return () => clearInterval(interval);
    }, [token]);

    function handlePageChange(ticketId, currentStatus) {
        if (ticketId) {
            setUpdateTicketId(ticketId);
            setStatus(currentStatus);
            setUpdate(true);
        }
    }

    return (
        <>
            {update ? (
                <>
                    <AdminUpdate
                        ticketId={updateTicketId}
                        close={() => setUpdate(false)}
                        status={status}
                        setStatus={setStatus}
                    />
                </>
            ) : (
                <>
                    <h1 className='task-title'>My Tasks</h1>
                    <div className='my-task'>
                        <table className='task-table'>
                            <thead className='task-head'>
                                <tr className='task-head-tr'>
                                    <th>Complaint ID</th>
                                    <th>Email</th>
                                    <th>Department</th>
                                    <th>Priority</th>
                                    <th>Problem</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {getTask.length === 0 ? <h1 className='no_task'>No task assigned!</h1> : null}
                            <tbody className='task-body'>
                                {getTask.map((task, index) => (
                                    task.tasks.map((item, i) => (
                                        <tr key={`${index}-${i}`}>
                                            <td>{item.complaint_id}</td>
                                            <td>{item.email}</td>
                                            <td>{item.department}</td>
                                            <td>{item.priority}</td>
                                            <td>{item.problem}</td>
                                            <td>{item.status}</td>
                                            <td>{moment(item.createdAt).fromNow()}</td>
                                            <td>
                                                <button className="status-update" onClick={() =>
                                                    handlePageChange(
                                                        item.complaint_id,
                                                        item.status
                                                    )
                                                }>
                                                    <span className="material-symbols-outlined">
                                                        update
                                                    </span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

        </>
    );
}

export default SubAdminTask;
