import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './createTicket.css';

function CreateTicket() {
    const [ticket, setTicket] = useState({
        department: "",
        priority: "",
        problem: ""
    });
    let token = localStorage.getItem("user");
    const createTicket = () => {
        axios.post("https://hdms-backend.onrender.com/api/create/user/ticket", {
            department: ticket.department,
            priority: ticket.priority,
            problem: ticket.problem
        },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token
                }
            }
        ).then((res) => {
            console.log(res.data);
            if (res.data === "Error in ticket") return (toast.error("Error in ticket"))
            if (res.data === "Ticket Submitted") {
                toast.success("Ticket Submitted");
                resetForm();
            }
        }).catch((err) => {
            console.log(err);
            toast.error("Error in ticket");
        });
    }

    const resetForm = () => {
        setTicket({
            department: "",
            priority: "",
            problem: ""
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createTicket();
    }

    const [disable, setDisable] = useState(true);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTicket((prevTicket) => ({
            ...prevTicket,
            [name]: value,
        }));
        
        if (ticket.department && ticket.priority && ticket.problem) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }

    return (
        <div className='ticket'>
            <h3>Create a new ticket</h3>
            <div className='full-form'>
                <form onSubmit={handleSubmit}>
                    <div className='form-dep'>
                        <label className="dep-label">Department</label>
                        <input type='text' className='create-dep' placeholder='Enter department' name='department' value={ticket.department} onChange={handleChange} />
                    </div>
                    <div className='form-priority'>
                        <label className="ticket-label">Priority</label>
                        <select className='create-select' value={ticket.priority} onChange={handleChange} name="priority">
                            <option disabled value="">Select Your Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div className='form-problem'>
                        <label className="ticket-label">Complaints</label>
                        <textarea className='create-text' type="text" value={ticket.problem} onChange={handleChange} placeholder="Tell Me Your Complaint" name="problem"></textarea>
                    </div>
                    <button type="submit" className='user-ticket-btn' disabled={disable}>
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateTicket;