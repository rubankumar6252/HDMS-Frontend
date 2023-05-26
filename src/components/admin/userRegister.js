import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import './register.css';

export default function UserRegister() {
    // const navigate = useNavigate();
    let token = localStorage.getItem("admin");
    async function userRegister() {
        await axios.post(
            "https://hdms-backend.onrender.com/api/admin/user/register",
            {
                regno: formik.values.regno,
                department: formik.values.department,
                name: formik.values.name,
                email: formik.values.email,
                password: formik.values.password,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
            }
        ).then(res => {
            if (res.data === "Email already exist") return (toast.error("Email already exist"))
            if (res.data === "Reg no already exist") return (toast.error("Reg no already exist"))
            if (res.data === "Email and Reg no already exist") return (toast.error("Email and Reg no already exist"))
            if (res.data === "User Registered Successfully") {
                toast.success("User Registered Successfully")
                reset();
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const formik = useFormik({
        initialValues: {
            regno: "",
            department: "",
            name: "",
            email: "",
            password: ""
        },
        onSubmit: () => {
            userRegister();
        },
        validate: (values) => {
            let errors = {};
            if (!values.regno) {
                errors.regno = "Reg no is required!"
            }
            if (!values.department) {
                errors.department = "Department is required!"
            }
            if (!values.name.match(/^[a-zA-Z]/)) {
                errors.name = "Numbers not accepted!";
            }
            if (!values.name) {
                errors.name = "Name is required!";
            }
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
    const reset = () => {
        formik.resetForm();
    };

    return (
        <>
            <div class="wrap register">
                <div class="re-cont">
                    <div class="register-form">
                        <h2>Student Registration</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <p> <label>Reg No<span>*</span></label> <input type="text" name="regno" placeholder="Reg no" onChange={formik.handleChange} value={formik.values.regno} /> </p>
                            {formik.errors.regno ? <div className="error">{formik.errors.regno}</div> : null}
                            <p> <label>Department<span>*</span></label> <input type="text" className='dep_input' name="department" placeholder="Enter your department" onChange={formik.handleChange} value={formik.values.department} /> </p>
                            {formik.errors.department ? <div className="error">{formik.errors.department}</div> : null}
                            <p> <label>Name<span>*</span></label> <input type="text" name="name" placeholder="Name" onChange={formik.handleChange} value={formik.values.name} /> </p>
                            {formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
                            <p> <label>Email address<span>*</span></label> <input type="email" name="email" placeholder="example@gmail.com" onChange={formik.handleChange} value={formik.values.email} /> </p>
                            {formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
                            <p> <label>Password<span>*</span></label> <input type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} /> </p>
                            {formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                            <p> <button type="submit" className="btn">Register</button> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}