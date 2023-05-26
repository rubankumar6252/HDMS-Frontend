import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import "./usermanage.css";
import { toast } from 'react-toastify';

function UserManage() {
    const [allUsers, setAllUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const [filterSearch, setFilterSearch] = useState("");
    let token = localStorage.getItem("admin");

    const getUsers = useCallback(() => {
        axios.get("https://hdms-backend.onrender.com/api/all/users", {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }).then((res) => {
            setAllUsers(res.data);
        })
    }, [token]);


    const deleteUser = () => {
        axios.delete(`https://hdms-backend.onrender.com/api/delete/users/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            }
        }).then(() => {
            toast.success("User deleted Successfully");
            getUsers();
        });
        setShowDeleteModal(false);
    }

    useEffect(() => {
        getUsers();
    }, [getUsers]);

    const search = (e) => {
        setFilterSearch(e.target.value);
        if (e.target.value === '') {
            getUsers();
        } else {
            const filterValue = allUsers.filter((item) =>
                item.regno.toLowerCase().includes(e.target.value.toLowerCase()) ||
                item.department.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setAllUsers(filterValue);
        }
    };

    return (
        <>
            <h1 className='all_users'>All Users</h1>
            <div className='user_manage'>
                <div className='search_form'>
                    <input id="search" className='search' type="search" placeholder="Reg No..." value={filterSearch} onChange={(e) => search(e)} autofocus required />
                    <button type="submit" className='search_btn'>
                        <span class="material-symbols-outlined">
                            search
                        </span>
                    </button>
                </div>

                <table className='user_table'>
                    <thead className='user_head'>
                        <tr>
                            <th>Id</th>
                            <th>Reg No</th>
                            <th>Department</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {allUsers.length === 0 ? <h1 className='found'>No user found!</h1> : null}
                    <tbody className='user_body'>
                        {allUsers.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user._id}</td>
                                    <td>{user.regno}</td>
                                    <td>{user.department}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="del">
                                        <span className="material-symbols-outlined del" onClick={() => {
                                            setUserId(user._id);
                                            setShowDeleteModal(true);
                                        }}>
                                            delete
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {showDeleteModal &&
                    <div className="delete-modal">
                        <div className="modal-content">
                            <div className="modal-message">
                                <p>Are you sure you want to delete this user?</p>
                            </div>
                            <div className="modal-buttons">
                                <button className="btn-cancel" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                                <button className="btn-delete" onClick={deleteUser}>Delete</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default UserManage;
