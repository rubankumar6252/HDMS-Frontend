import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../login.css';
import { useState } from "react";
import Loading from "../loading";

function UserLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function userLogin() {
        setIsLoading(true);
        try {
            const res = await axios.post('https://hdms-backend.onrender.com/api/user/login', {
                email: formik.values.email,
                password: formik.values.password
            });
            setIsLoading(false);
            localStorage.setItem('user', res.data);
            if (res.data === "Invalid Email id or Password") {
                toast.error("Invalid Email id or Password");
            } else if (res.data === "User Not Found!") {
                toast.error("User Not Found!");
            } else {
                navigate('/user/ticket');
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
            toast.error("An error occurred. Please try again later.");
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: () => {
            userLogin();
        },
        validate: (values) => {
            let errors = {};
            if (!values.email) {
                errors.email = "Email is required!";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Email is invalid!";
            }
            if (!values.password) {
                errors.password = "Password is required!";
            } else if (values.password.length < 6) {
                errors.password = "Password must be more than six character!";
            }
            return errors;
        }
    })

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div class="wrapper login">
                    <div class="cont">
                        <div class="col-right">
                            <div class="login-form">
                                <h2>User Login</h2>
                                <form className="user-email" onSubmit={formik.handleSubmit}>
                                    <p> <label>Email address<span>*</span></label> <input type="email" name="email" placeholder="example@gmail.com" onChange={formik.handleChange} value={formik.values.email} /> </p>
                                    {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                                    <p> <label>Password<span>*</span></label> <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} /> </p>
                                    {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                                    <p> <input className="btn" type="submit" value="Login" /> </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default UserLogin;