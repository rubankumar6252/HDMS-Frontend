import axios from 'axios';
import React, { useState } from 'react';
import "./update.css";
import { toast } from 'react-toastify';

function AdminUpdate({ ticketId, close, status, setStatus }) {
    const [statusUpdate, setStatusUpdate] = useState({
        comment: "",
        status: status
    });
    
    const [disableSubmit, setDisableSubmit] = useState(true);

    let adminToken = localStorage.getItem("admin");
    let subAdminToken = localStorage.getItem("subadmin");
    let token = adminToken || subAdminToken;

    const handleChange = (e) => {
        setStatusUpdate({ ...statusUpdate, [e.target.name]: e.target.value });

        if (e.target.name === 'comment') {
            setDisableSubmit(statusUpdate.status === '' || e.target.value === '');
        } else if (e.target.name === 'status') {
            setDisableSubmit(statusUpdate.comment === '' || e.target.value === '');
            setStatus(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://hdms-backend.onrender.com/api/ticket/status-update/${ticketId}`, {
            comment: statusUpdate.comment,
            status: statusUpdate.status
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }).then(() => {
                toast.success("Updated Successfully");
            })

        close(false)
    }

    return (
        <div className='modal'>
            <div className='modal_container'>
                <div className='modal_close' onClick={() => close(false)}>&times;</div>
                <div className='modal_title'>
                    Ticket Update
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='modal_content'>
                        <label className='command-label'>Comment</label><br />
                        <textarea className='ticket-command' type='text' placeholder='Comment to ticket...' name='comment' value={statusUpdate.comment} onChange={handleChange}></textarea>
                    </div>
                    <div className='modal_status'>
                        <label className='status-label'>Status</label><br />
                        <select className='status-select' name='status' value={statusUpdate.status} onChange={handleChange}>
                            <option disabled value="">Update</option>
                            <option value="Resolved">Resolved</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Close">Close</option>
                        </select>
                    </div>
                    <div className='modal_footer'>
                        <button className='modal-btn' type='submit' disabled={disableSubmit}>Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminUpdate;
