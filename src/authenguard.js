import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'
import allActions from './actions'

const GuardedRoute = (props) => (
    // <Route path={props.path} element={props.auth === true ? props.element : document.location.href = document.location.protocol + '//' + document.location.host + '/login'} />

    <Route path={props.path} element={props.auth === true ? props.element : props.element} />
)

export default function RootRoute() {
    const user = useSelector(state => state.user)
    
    // useEffect(() => {
    //     console.log('use effect rootroute')
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={user.islogin ? <Home /> : <FrmLogIn />} />
                <Route path="/login" element={<FrmLogIn />} />
                <GuardedRoute path="/home" element={<Home />} auth={user.islogin}>
                    <GuardedRoute path="/expense" element={<FrmExpense />} auth={user.islogin}/>
                    <GuardedRoute path="/expensemanage/:param" element={<FrmExpenseManage />} auth={user.islogin}/>
                    <GuardedRoute path="/bank" element={<FrmBank />} auth={user.islogin}/>
                    <GuardedRoute path="/bankmanage/:param" element={<FrmBankManage />} auth={user.islogin}/>
                    <GuardedRoute path="/cheque" element={<FrmCheque />} auth={user.islogin}/>
                    <Route path="/frmerror" element={<FrmError />} />
                </GuardedRoute>
            </Routes>
        </BrowserRouter>
    )
}



