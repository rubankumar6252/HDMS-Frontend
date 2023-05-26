import React from 'react';
import "./view.css";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function CommantView({ ticketId, view }) {
    const [comment, setComment] = useState([]);

    let token = localStorage.getItem("user");
    useEffect(() => {
        const fetchCommant = () => {
            axios.get(`https://hdms-backend.onrender.com/api/view/comment/${ticketId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                }
            })
                .then((res) => {
                    if (res.data === "No comments found for the ticket") {
                        toast.error("No comments found for the ticket")
                    }
                    setComment(res.data.comment);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchCommant();
    }, [ticketId, token]);

    return (
        <div className='view'>
            <div className='view_container'>
                <div className='view_close' onClick={() => view(false)}>&times;</div>
                <div className='view_title'>
                    Ticket Comment
                </div>
                <div className='view_content'>
                    <label className='comment-label'>Comment</label>
                    <br />
                    <p className='comment'>{comment}</p>
                </div>
                <div className='view_footer'>
                </div>
            </div>
        </div>
    );
}

export default CommantView;

