import React, { useEffect, useState, useRef } from "react";
import './allTicket.css';
import AdminUpdate from "./update";
import { useReactToPrint } from "react-to-print";
import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";

function AllTickets() {
    const [data, setData] = useState([{}]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterValue, setFilterValue] = useState("");
    const [search, setSearch] = useState([{}]);
    const [update, setUpdate] = useState(false);
    const [updateTicketId, setUpdateTicketId] = useState(null);
    const [dailyCount, setDailyCount] = useState();
    const [status, setStatus] = useState("");

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'All-Tickets',
        onafterprint: () => alert("print success")
    })

    const token = localStorage.getItem("admin");
    console.log(setItemsPerPage);
    useEffect(() => {
        const fetchData = () => {
            fetch('https://hdms-backend.onrender.com/api/user/all/tickets', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
                .then(response => response.json())
                .then(data => {
                    setData(data)
                    setSearch(data)
                    const today = moment().format("YYYY-MM-DD");
                    const todayCount = data.filter(ticket => moment(ticket.createdAt).format("YYYY-MM-DD") === today).length;
                    setDailyCount(todayCount);
                })
                .catch(error => console.error(error));
        }

        fetchData();

        const interval = setInterval(() => {
            if (status === "Resolved" || status === "Rejected" || status === "Close") {
                fetchData();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [status, token]);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    function handlePageChange(newPage, ticketId) {
        setCurrentPage(newPage);
        if (ticketId) {
            setUpdateTicketId(ticketId);
            setUpdate(true);
        }
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);

    const handleFilter = (e) => {
        if (e.target.value === '') {
            setData(search)
        }
        else {
            const filterResult = search.filter(item => item.department.toLowerCase().includes(e.target.value.toLowerCase()))
            setData(filterResult);
        }
        setFilterValue(e.target.value);
    }

    const [task, setTask] = useState(null);
    console.log(task);
    const assignTask = (ticketId) => {
        const selectedTicket = data.find((ticket) => ticket.complaint_id === ticketId);
        setTask(selectedTicket);

        axios.get(`https://hdms-backend.onrender.com/api/subadmin/task/${ticketId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        })
            .then((res) => {
                if (res.data.taskAssigned) {
                    toast.error("A task is already assigned to subadmin");
                } else {
                    axios.post(`https://hdms-backend.onrender.com/api/subadmin/task/${ticketId}`, {}, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: token,
                        },
                    })
                        .then(() => {
                            toast.success("Task assigned to subadmin");
                        })
                        .catch((err) => {
                            console.log(err);
                            toast.error("Failed to assign task to subadmin");
                        });
                }
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to check if task is already assigned");
            });
    }

    return (
        <>
            {update ?
                (
                    <>
                        <AdminUpdate ticketId={updateTicketId} close={setUpdate} status={status} setStatus={setStatus} />
                    </>
                ) : (
                    <>
                        <div className="user-ticket">
                            <h1 className="all-tickets">All Tickets</h1>
                            <p className="daily-count">{`Daily Count Of Ticket: (${dailyCount})`}</p>
                            <button className="print" onClick={handlePrint}>Print</button>
                            <div className="dep-search">
                                <label className="search-label">Search</label>
                                <span class="material-symbols-outlined search-logo">
                                    search
                                </span>
                                <input className="search-box" type="search" placeholder="Search by department" value={filterValue} onChange={(e) => handleFilter(e)} />
                            </div>
                            <table className="user-ticket-table" ref={componentRef}>
                                <thead className="user-ticket-head">
                                    <tr className="ticket-head-tr">
                                        <th>Complaint Id</th>
                                        <th>Email</th>
                                        <th>Department</th>
                                        <th>Priority</th>
                                        <th>Problem</th>
                                        <th>Status</th>
                                        <th>Created At</th>
                                        <th>Action</th>
                                        <th>Assign Task</th>
                                    </tr>
                                </thead>
                                {data.length === 0 ? <h1 className="not_found">Ticket not found!</h1> : null}
                                <tbody className="user-table-body">
                                    {currentItems.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.complaint_id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.department}</td>
                                            <td>{user.priority}</td>
                                            <td>{user.problem}</td>
                                            <td>{user.status}</td>
                                            <td>{moment(user.createdAt).fromNow()}</td>
                                            <button className="status-update" onClick={() =>
                                                handlePageChange(
                                                    currentPage,
                                                    user.complaint_id
                                                )
                                            }>
                                                <span class="material-symbols-outlined">
                                                    update
                                                </span>
                                            </button>
                                            <td>
                                                <button className="task-sent" onClick={() => assignTask(user.complaint_id)}>Sent</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="pg-navigate">
                                <span>
                                    Page{' '}
                                    <strong>
                                        {currentPage} of {currentItems.length}
                                    </strong>{' '}
                                </span>
                                <button className="pre-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                    Previous
                                </button>
                                <button className="next-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                    Next
                                </button>
                            </div>
                        </div>
                    </>)}
        </>
    );
}

export default AllTickets;