import './homenav.css';
import Deskimg from "../components/images/helpdesk.png";
import RvsLogo from "../components/images/rvs_logo.png";
import { Link } from 'react-router-dom';

export default function HomeNav() {
    return (
        <>
            <nav className='navbar'>
                <div className='container'>
                    <a href='/' className='navbar_head'>
                        <img src={Deskimg} className="desk_logo" alt='navbar_header' />
                    </a>
                    <img src={RvsLogo} className="rvs_logo" alt='navbar_header' />
                    <div className='nav_rvs'>
                    <h1 className='rvs_title'>rvs college of arts and science</h1>
                    </div>
                    <ul className='navbar_nav'>
                        <div className='adminlogin'>
                            <li className='nav_item'><Link to="/adminlogin" className='nav_link'>
                                <span class="material-symbols-outlined">
                                    login
                                </span><span className='admin_name'>Admin Login</span></Link></li>
                        </div>
                        <div className='userlogin'>
                            <li className='nav_item'><Link to="/userlogin" className='nav_link'>
                                <span class="material-symbols-outlined log">
                                    login
                                </span><span className='userlogin_name'>User Login</span></Link></li>
                        </div>
                    </ul>
                </div>
            </nav>

        </>
    )
}
