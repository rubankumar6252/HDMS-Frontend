import './homenav.css';
import Deskimg from "../components/images/helpdesk.png";
import RvsLogo from "../components/images/rvs_logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function HomeNav() {
    const [menu, setMenu] = useState(false);
    const handleClickMenu = () => {
        setMenu(!menu);
    }

    return (
        <>
            <nav className={`navbar ${menu ? 'menu-open' : ''}`}>
                <div className={`menu-container ${menu ? 'open' : ''}`}>
                    <ul className='navbar_nav'>
                        <div className='adminlogin'>
                            <li className='nav_item'>
                                <Link to="/adminlogin" className='login_link' onClick={() => setMenu(false)}>
                                    <span className="material-symbols-outlined login_logo">
                                        login
                                    </span>
                                    <span className='admin_name'>Admin Login</span>
                                </Link>
                            </li>
                        </div>
                        <div className='userlogin'>
                            <li className='nav_item'>
                                <Link to="/userlogin" className='login_link' onClick={() => setMenu(false)}>
                                    <span className="material-symbols-outlined log">
                                        login
                                    </span>
                                    <span className='userlogin_name'>User Login</span>
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
                <span className={`material-symbols-outlined menu ${menu ? 'active' : ''}`} onClick={handleClickMenu}>
                    {menu ? 'close' : 'menu'}
                </span>
                <div className='container'>
                    <a href='/' className='navbar_head'>
                        <img src={Deskimg} className="desk_logo" alt='navbar_header' />
                    </a>
                    <img src={RvsLogo} className="rvs_logo" alt='navbar_header' />
                    <div className='nav_rvs'>
                        <h1 className='rvs_title'>rvs college of arts and science</h1>
                    </div>
                </div>
            </nav>
        </>
    )
}

