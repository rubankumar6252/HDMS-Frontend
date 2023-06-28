import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from "../loading";
import '../login.css';

function AdminLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function login(role) {
        let url;
        if (role === "admin") {
            url = "https://hdms-backend.onrender.com/api/admin/login";
        } else {
            url = "https://hdms-backend.onrender.com/api/subadmin/login";
        }

        try {
            setIsLoading(true);
            const res = await axios.post(url, {
                email: formik.values.email,
                password: formik.values.password,
                role: role
            });
            setIsLoading(false);
            if (res.data === "Invalid Email id or Password") {
                return toast.error("Invalid Email id or Password");
            }
            if (res.data === "User Not Found!") {
                return toast.error("User Not Found!");
            }
            Authenticate(role, res.data.token);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            return toast.error("An error occurred. Please try again later.");
        }
    }

    const Authenticate = (role, token) => {
        localStorage.setItem(role, token);
        if (role === "admin") {
            navigate("/admin");
        } else {
            navigate("/subadmin");
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            role: "",
        },
        onSubmit: () => {
            login(formik.values.role);
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
                <div className="wrapper login">
                    <div className="cont">
                        <div className="col-right">
                            <div className="login-form">
                                <h2>Admin Login</h2>
                                <form onSubmit={formik.handleSubmit}>
                                    <p className="admin">
                                        <label>Role<span>*</span></label>
                                        <select className="admin-role" id="role" value={formik.values.role} onChange={formik.handleChange}>
                                            <option disabled value="">Select role</option>
                                            <option value="admin">Admin</option>
                                            <option value="subadmin">Sub-admin</option>
                                        </select>
                                    </p>
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
    );
}

export default AdminLogin;