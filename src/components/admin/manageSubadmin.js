import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../subadmin/task.css";
import moment from "moment";

function ManageSubAdmin() {
    const [manage, setManage] = useState([]);
    const token = localStorage.getItem('admin');

    useEffect(() => {
        axios
            .get('https://hdms-backend.onrender.com/api/manage/task', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
            })
            .then((res) => {
                setManage(res.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    }, [token]);

    return (
        <div>
            <h1 className='manage-subadmin'>SubAdmin Task Manage</h1>
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
                            <th>Complete</th>
                        </tr>
                    </thead>
                    {manage.length === 0 ? <h1 className='no_task'>No task assigned!</h1> : null}
                    <tbody className='task-body'>
                        {manage.map((task, index) => (
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
                                        {item.status === "Resolved" || item.status === "Rejected" || item.status === "Close" ?
                                            (
                                                <>
                                                    <span class="material-symbols-outlined done">
                                                        done
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span class="material-symbols-outlined wrong">
                                                        close
                                                    </span>
                                                </>
                                            )}
                                    </td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ManageSubAdmin;
