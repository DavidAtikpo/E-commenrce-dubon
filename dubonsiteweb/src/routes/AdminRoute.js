import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from '../pages/admin/AdminPage';
import AddProductPage from '../components/AddProductPage';
import AdminAuth from '../pages/admin/AdminAuth'
import AdminSideBar from '../pages/admin/adminSideBar'

import ErrorBoundary from '../components/ErrorBoundary'
// import { Route } from 'react-router-dom';

function Admin(){
    return(
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path='/addProduct' element={<AddProductPage/>}/>
                    <Route path='/adminDash' element={<AdminPage/>}/>
                    <Route path='/admin/login' element ={<AdminAuth/>}/>
                    <Route path='/admin/side-bar' element ={<AdminSideBar/>}/>
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default Admin;