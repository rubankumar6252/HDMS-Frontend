import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./components/admin/adminlogin";
import UserRegister from "./components/admin/userRegister";
import Dashboard from "./components/admin/dashboard";
import Home from "./components/home";
import HomeNav from "./components/homenav";
import Navbar from "./components/navbar";
import UserLogin from "./components/user/userlogin";
import CreateTicket from './components/user/createTicket';
import AllTickets from "./components/admin/allTickets";
import MyTicket from "./components/user/myticket";
import AdminUpdate from "./components/admin/update";
import ManageSubAdmin from "./components/admin/manageSubadmin";
import SubAdminDashboard from "./components/subadmin/dashboard";
import { AdminPrivateRoute, SubAdminPrivateRoute, UserPrivateRoute } from "./components/privateRoute";
import SubAdminTask from "./components/subadmin/task";
import UserManage from "./components/admin/usermanage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
      {/* <HashRouter> */}
        <HomeNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="adminlogin" element={<AdminLogin />} />
          <Route path="userlogin" element={<UserLogin />} />

          <Route path="/admin" element={<AdminPrivateRoute>
            <Navbar>
              <Dashboard />
            </Navbar>
          </AdminPrivateRoute>}>
            <Route path="allticket" element={<AdminPrivateRoute>
              <Navbar>
                <AllTickets />
              </Navbar>
            </AdminPrivateRoute>} />
            <Route path="userregister" element={<AdminPrivateRoute>
              <Navbar>
                <UserRegister />
              </Navbar>
            </AdminPrivateRoute>} />
            <Route path="update" element={<AdminPrivateRoute>
              <Navbar>
                <AdminUpdate />
              </Navbar>
            </AdminPrivateRoute>} />
            <Route path="manage/subadmin" element={<AdminPrivateRoute>
              <Navbar>
                <ManageSubAdmin />
              </Navbar>
            </AdminPrivateRoute>} />
            <Route path="manage/user" element={<AdminPrivateRoute>
              <Navbar>
                <UserManage />
              </Navbar>
            </AdminPrivateRoute>} />
          </Route>

          <Route path="/subadmin" element={<SubAdminPrivateRoute>
            <Navbar>
              <SubAdminDashboard />
            </Navbar>
          </SubAdminPrivateRoute>}>
            <Route path="task" element={<SubAdminPrivateRoute>
              <Navbar>
                <SubAdminTask />
              </Navbar>
            </SubAdminPrivateRoute>} />
          </Route>

          <Route path="/user" element={<UserPrivateRoute>
            <Navbar>
              <CreateTicket />
            </Navbar>
          </UserPrivateRoute>}>
            <Route path="ticket" element={<UserPrivateRoute>
              <Navbar>
                <CreateTicket />
              </Navbar>
            </UserPrivateRoute>} />
            <Route path="myticket" element={<UserPrivateRoute>
              <Navbar>
                <MyTicket />
              </Navbar>
            </UserPrivateRoute>} />
          </Route>
        </Routes>
      </Router>
      {/* </HashRouter> */}
      <ToastContainer theme="colored" />
    </>
  );
}

export default App;
