import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import { useSelector } from 'react-redux'

import allActions from './actions'

import FrmLogIn from './component/login/frmlogin'
import Home from './component/home'
import FrmError from './component/frmerror'
import FrmForm from './component/learn/frmform'
import FrmList from './component/learn/frmlist'
import FrmDragDrop from './component/learn/frmdragdrop'
import { QueryParamProvider } from 'use-query-params';

const GuardedRoute = (props) => (
    // <Route path={props.path} element={props.auth === true ? props.element : document.location.href = document.location.protocol + '//' + document.location.host + '/login'} />
    
    <Route path={props.path} element={props.auth === true ? props.element : props.element} />
)

const hist = createBrowserHistory();

export default function RootRoute() {
    const [islogin, setislogin] = useState(true);

    useEffect(() => {
        console.log('use effect rootroute')     
        if (localStorage.getItem('isLoggedIn_profreight') === null || localStorage.getItem('isLoggedIn_profreight') === undefined) {
            setislogin(false)
        } 
    }, []);    

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route exact path={process.env.PUBLIC_URL} element={islogin ? <Home /> : <FrmLogIn />} />
                <Route exact path={process.env.PUBLIC_URL + "/login"} element={<FrmLogIn />} />
                <Route exact path={process.env.PUBLIC_URL + "/home"} element={<Home />} >
                    {/* <Route exact path={"/expense"} element={<FrmExpense />} />
                    <Route exact path={"/expensemanage/:param"} element={<FrmExpenseManage />} />
                    <Route exact path={"/bank"} element={<FrmBank />} />
                    <Route exact path={"/bankmanage/:param"} element={<FrmBankManage />}/>
                    <Route exact path={"/cheque"} element={<FrmCheque />} />

                    <Route exact path={"/frm1001"} element={<Frm1001 />} /> */}

                    <Route exact path={"/frmform"} element={<FrmForm />} />
                    <Route exact path={"/frmlist"} element={<FrmList />} />
                    <Route exact path={"/frmdragdrop"} element={<FrmDragDrop />} />
                    
                    <Route exact path={"/frmerror"} element={<FrmError />} />
                </Route>

                {/* <GuardedRoute path="/home" element={<Home />} auth={user.islogin}>
                    <GuardedRoute path="/expense" element={<FrmExpense />} auth={user.islogin} />
                    <GuardedRoute path="/expensemanage/:param" element={<FrmExpenseManage />} auth={user.islogin} />
                    <GuardedRoute path="/bank" element={<FrmBank />} auth={user.islogin} />
                    <GuardedRoute path="/bankmanage/:param" element={<FrmBankManage />} auth={user.islogin} />
                    <GuardedRoute path="/cheque" element={<FrmCheque />} auth={user.islogin} />
                    <Route path="/frmerror" element={<FrmError />} />
                </GuardedRoute> */}
            </Routes>
        </BrowserRouter>
    )
}



