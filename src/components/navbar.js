import './navbar.css';
import Dashboard from './admin/dashboard';
import UserRegister from './admin/userRegister';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserTicket from './user/createTicket';
import AllTickets from './admin/allTickets';
import MyTicket from './user/myticket';
import SubAdminDashboard from './subadmin/dashboard';
import SubAdminTask from './subadmin/task';
import ManageSubAdmin from './admin/manageSubadmin';
import UserManage from './admin/usermanage';

export default function Navbar() {
    let adminToken = localStorage.getItem('admin')
    let subAdminToken = localStorage.getItem('subadmin')
    let userToken = localStorage.getItem('user')
    // const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    const [activeLink, setActiveLink] = useState(0);
    useEffect(() => {
        if (adminToken) {
            setActive(0);
        } else if (subAdminToken) {
            setActive(5);
        } else if (userToken) {
            setActive(7);
        }
    }, [adminToken, subAdminToken, userToken]);

    const setActive = (index) => {
        setActiveLink(index);
    };

    return (
        <div id="body-pd">
            <header className="header" id="header">
                <div className={`header_toggle head-open ${isNavOpen ? 'head-close' : ''}`} onClick={toggleNav}>
                    <i className={`bx ${isNavOpen ? 'bx-x' : 'bx-menu'}`} id="header-toggle"></i>
                </div>
            </header>
            <div className={`l-navbar ${isNavOpen ? 'show' : ''}`} id="nav-bar">
                <nav className="nav">
                    <div>
                        <Link to="#" className="nav_logo">
                            <i className='bx bx-layer nav_logo-icon'></i>
                            <span className="nav_logo-name">Navigate</span>
                        </Link>
                        <div className="nav_list">
                            {adminToken && (
                                <>
                                    <Link to="/admin"
                                        className={`nav_link ${activeLink === 0 ? 'active' : ''}`}
                                        onClick={() => setActive(0)}
                                    >
                                        <i className='bx bx-grid-alt nav_icon'></i>
                                        <span className="nav_name">Dashboard</span>

                                    </Link>
                                    <Link to="/admin/allticket"
                                        className={`nav_link ${activeLink === 1 ? 'active' : ''}`}
                                        onClick={() => setActive(1)}
                                    >
                                        <i className='bx bx-message-square-detail nav_icon'></i>
                                        <span className="nav_name">Tickets</span>

                                    </Link>
                                    <Link to="/admin/manage/subadmin"
                                        className={`nav_link ${activeLink === 2 ? 'active' : ''}`}
                                        onClick={() => setActive(2)}
                                    >
                                        <span class="material-symbols-outlined ma-sub">
                                            manage_accounts
                                        </span>
                                        <span className="nav_name">Manage SubAdmin</span>

                                    </Link>
                                    <Link to="/admin/manage/user"
                                        className={`nav_link ${activeLink === 3 ? 'active' : ''}`}
                                        onClick={() => setActive(3)}
                                    >
                                        <span class="material-symbols-outlined ma-sub">
                                            supervisor_account
                                        </span>
                                        <span className="nav_name">Users</span>

                                    </Link>
                                    <Link to="/admin/userregister"
                                        className={`nav_link ${activeLink === 4 ? 'active' : ''}`}
                                        onClick={() => setActive(4)}
                                    >
                                        <span class="material-symbols-outlined ma-sub">
                                            person_add
                                        </span>
                                        <span className="nav_name">Register</span>
                                    </Link>
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem('admin')
                                    }} className="admin_nav_link">
                                        <i className='bx bx-log-out nav_icon'></i>
                                        <span className={`${isNavOpen ? "" : "nav_namea"}`}>Logout</span>
                                    </Link>
                                </>
                            )}

                            {subAdminToken && (
                                <>
                                    <Link
                                        to="/subadmin"
                                        className={`nav_link ${activeLink === 5 ? 'active' : ''}`}
                                        onClick={() => setActive(5)}
                                    >
                                        <i className='bx bx-message-square-detail nav_icon'></i>
                                        <span className="nav_name">Dashboard</span>
                                    </Link>
                                    <Link
                                        to="/subadmin/task"
                                        className={`nav_link ${activeLink === 6 ? 'active' : ''}`}
                                        onClick={() => setActive(6)}
                                    >
                                        <i class='bx bx-task nav_icon'></i>
                                        <span className="nav_name">View Task</span>
                                    </Link>
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem('subadmin')
                                    }} className="user_nav_link">
                                        <i className='bx bx-log-out nav_icon'></i>
                                        <span className={`${isNavOpen ? "" : "nav_namea"}`}>Logout</span>
                                    </Link>
                                </>
                            )}

                            {userToken && (
                                <>
                                    <Link
                                        to="/user/ticket"
                                        className={`nav_link ${activeLink === 7 ? 'active' : ''}`}
                                        onClick={() => setActive(7)}
                                    >
                                        <i className='bx bx-message-square-detail nav_icon'></i>
                                        <span className="nav_name">Ticket</span>
                                    </Link>
                                    <Link
                                        to="/user/myticket"
                                        className={`nav_link ${activeLink === 8 ? 'active' : ''}`}
                                        onClick={() => setActive(8)}
                                    >
                                        {/* <i className='bx bx-message-square-detail nav_icon'></i> */}
                                        <i class='bx bx-user nav_icon'></i>
                                        <span className="nav_name">My Ticket</span>
                                    </Link>
                                    <Link to="/" onClick={() => {
                                        localStorage.removeItem('user')
                                    }} className="user_nav_link">
                                        <i className='bx bx-log-out nav_icon'></i>
                                        <span className={`${isNavOpen ? "" : "nav_namea"}`}>Logout</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
            <div className={`b-content ${isNavOpen ? 'right' : ''}`} >
                {adminToken ? (
                    <>
                        {activeLink === 0 ? <Dashboard /> : null}
                        {activeLink === 1 ? <AllTickets /> : null}
                        {activeLink === 2 ? <ManageSubAdmin /> : null}
                        {activeLink === 3 ? <UserManage /> : null}
                        {activeLink === 4 ? <UserRegister /> : null}
                    </>
                ) : null}

                {subAdminToken ? (
                    <>
                        {activeLink === 5 ? <SubAdminDashboard /> : null}
                        {activeLink === 6 ? <SubAdminTask /> : null}
                    </>
                ) : null}

                {userToken ? (
                    <>
                        {activeLink === 7 ? <UserTicket /> : null}
                        {activeLink === 8 ? <MyTicket /> : null}
                    </>
                ) : null}
            </div>
        </div>
    );
}

