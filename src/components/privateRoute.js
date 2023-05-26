import React from 'react'

export const AdminPrivateRoute = ({ children }) => {
  let AdminToken = localStorage.getItem("admin")
  if (AdminToken == null) {
    return <div>
      <h1>404</h1>
      <h3>Access denied admin can only view the page</h3>
    </div>
  }
  return children
}

export const SubAdminPrivateRoute = ({ children }) => {
  let SubAdminToken = localStorage.getItem("subadmin")
  if (SubAdminToken == null) {
    return <div>
      <h1>404</h1>
      <h3>Access denied subadmin can only view the page</h3>
    </div>
  }
  return children
}

export const UserPrivateRoute = ({ children }) => {
  let UserToken = localStorage.getItem("user")
  if (UserToken == null) {
    return <div>
      <h1>404</h1>
      <h3>Access denied user can only view the page</h3>
    </div>
  }
  return children
}
