import React, { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStyles } from 'react-styles-hook'
import LoadingOverlay from 'react-loading-overlay';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../actions'

import { isMobile } from 'react-device-detect';
import { Sidebar } from 'primereact/sidebar';
import { Growl } from 'primereact/growl';
import * as moment from 'moment';
import Dialog from 'react-bootstrap-dialog'
import { Row, Col, Container } from 'react-bootstrap';


import { Menu } from 'antd';
import { OrderedListOutlined, FormOutlined, DragOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

import "./homestyle.css"

import axios from "axios"
import ApiContext from '../apphelper/apihelper.js'
import apphelper from '../apphelper/apphelper'

export default function Home() {
    let navigate = useNavigate();
    let menuAll = useRef();
    let growl = useRef(null);
    const [isNavOpen, setIsNavOpen] = useState('close');
    const [loading, setloading] = useState({ isshow: false, text: '' });
    const [errortext, seterrortext] = useState({ text: '', arr: [] });
    //const loading = useSelector(state => state.loading)
    let confirmdialog = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        //console.log('use effect home')
        CheckLogin()

        if (!SetAppEnvironment()) {
            // localStorage.setItem("errortext_profreight", 'ข้อมูล Log In ไม่ถูกต้อง กรุณาอย่าโกงระบบ');
            navigate(apphelper.NavigatPath.login)
            return;
        }
    }, []);

    const SetAppEnvironment = () => {
        try {
            let paramChk = apphelper.Decode(localStorage.getItem('user_profreight'));
            if (!paramChk.success) {
                return false;
            }

            dispatch(allActions.userAction.userlogin(JSON.parse(paramChk.decodeText)))
            // this.compid = localStorage.getItem('compid_profreight');
            // this.branchid = localStorage.getItem('branchid_profreight');
            // this.compname = localStorage.getItem('compname_profreight');
            // this.branchname = localStorage.getItem('branchname_profreight');          
            // this.uiversion = localStorage.getItem('version_profreight');
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    const getExpiration = () => {
        const expiration = localStorage.getItem('expires_at_profreight');
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }

    const CheckLogin = () => {
        let loginResult = isLoggedIn();
        // console.log(loginResult);
        if (!loginResult.islogin) {
            apphelper.LogOut();
            navigate(apphelper.NavigatPath.login)
            return;
        }

        if (!loginResult.userok || !loginResult.decodeok) {
            localStorage.setItem("errortext_profreight", 'ข้อมูล Log In ไม่ถูกต้อง กรุณาอย่าโกงระบบ');
            navigate(apphelper.NavigatPath.login)
            return;
        }

        //console.log(window.location.pathname)

        // if (window.location.pathname == process.env.PUBLIC_URL + '/home' || window.location.pathname == process.env.PUBLIC_URL + '/home/' || window.location.pathname == process.env.PUBLIC_URL + '/' || window.location.pathname == process.env.PUBLIC_URL + '')
        //     navigate(apphelper.NavigatPath.frm1001)
    }

    const isLoggedIn = () => {
        if (localStorage.getItem('isLoggedIn_profreight') === null || localStorage.getItem('isLoggedIn_profreight') === undefined) {
            console.log('isLoggedIn_profreight is null')
            return { islogin: false, userok: false, decodeok: false };
        }

        if (localStorage.getItem('user_profreight') === null || localStorage.getItem('user_profreight') === undefined) {
            console.log('user_profreight is null')
            return { islogin: false, userok: false, decodeok: false };
        }

        let paramChk = apphelper.Decode(localStorage.getItem('user_profreight'));
        //console.log(paramChk);
        if (!paramChk.success) {
            console.log('decode error')
            return { islogin: true, userok: false, decodeok: false };
        }

        try {
            let test = JSON.parse(paramChk.decodeText);
        } catch {
            console.log('json parse error')
            return { islogin: true, userok: false, decodeok: true };
        }

        return { islogin: moment().isBefore(getExpiration()), userok: true, decodeok: true };
    }


    const ShowToast = (message, type = 'success') => {
        switch (type) {
            case 'success':
                growl.current.show({ severity: 'success', summary: 'Success Message', detail: message });
                break;
            case 'info':
                growl.current.show({ severity: 'info', summary: 'Info Message', detail: message });
                break;
            case 'warning':
                growl.current.show({ severity: 'warn', summary: 'Warning Message', detail: message });
                break;
            case 'error':
                growl.current.show({ severity: 'error', summary: 'Error Message', detail: message });
                break;
            default:
                break;
        }
    }

    // let isNavOpen = '';


    const helper = {
        async ApiGet(url) {
            //console.log(url)
            try {
                //dispatch(allActions.loadingAction.showloading(apphelper.LoadingText.Load))
                setloading({ isshow: true, text: apphelper.LoadingText.Load })
                const response = await axios.get(url)
                setloading({ isshow: false, text: '' })
                //dispatch(allActions.loadingAction.hideloading())
                if (!response.data.success) {
                    seterrortext({ ...errortext, text: response.data.message })
                    setIsNavOpen('open');
                }

                return response.data;
            } catch (error) {
                setloading({ isshow: false, text: '' })
                seterrortext({ ...errortext, text: error.message })
                setIsNavOpen('open');
                return { success: false, message: error.message }
            }
        },

        async ApiPost(url, data, text = apphelper.LoadingText.Save) {
            //console.log(text)
            try {
                setloading({ isshow: true, text: text })
                const response = await axios.post(url, data)
                setloading({ isshow: false, text: '' })
                //dispatch(allActions.loadingAction.hideloading())
                if (!response.data.success) {
                    seterrortext({ ...errortext, text: response.data.message })
                    setIsNavOpen('open');
                } else {
                    ShowToast(response.data.message)
                }

                return response.data;
            } catch (error) {
                setloading({ isshow: false, text: '' })
                seterrortext({ ...errortext, text: error.message })
                setIsNavOpen('open');
                return { success: false, message: error.message }
            }
        },

        BindNextTab() {
            const nexttabs = document.getElementsByClassName('nexttab');
            //console.log(nexttabs)
            for (let i = 0; i <= nexttabs.length - 1; i++) {
                nexttabs[i].name = 'nexttab' + i
                nexttabs[i].addEventListener("keydown", (event) => nextTabHandle(event, 'nexttab' + (i + 1)));
            }
        },

        CheckParams(param, page = '') {
            if (!apphelper.IsNull(param)) {
                let paramChk = apphelper.Decode(param);
                //console.log(paramChk)
                if (!paramChk.success) {
                    console.log('param false')
                    localStorage.setItem("errortext_profreight", paramChk.decodeText);
                    return null;
                }

                return JSON.parse(paramChk.decodeText);
            } else {
                if (page.length > 0)
                    navigate(apphelper.NavigatPath.home + '/' + page)

                return null;
            }
        },

        CheckLogIn() {
            CheckLogin();
        },

        // NextTab(event) {
        //     console.log(event.target)
        // }
    }

    const nextTabHandle = (event, name) => {
        if (event.keyCode === 13) {
            const input = document.getElementsByName(name)[0];
            //console.log(input)
            if (input) {
                input.focus()

                if (input.tagName == "INPUT")
                    input.select()
            }
        }
    }

    const moveTo = (link) => {
        //console.log(link)
        navigate(link)
        menuAll.hide()
    }

    const toogleMenu = (event) => {
        // console.log(isMobile)
        // isNavOpen == 'close' ? setIsNavOpen('open') : setIsNavOpen('close')
        menuAll.toggle(event);
    }

    const handleClick = (e) => {
        //console.log(e)
        navigate(e.key)
        // isNavOpen == 'close' ? setIsNavOpen('open') : setIsNavOpen('close')
        // if (!apphelper.IsNull(e.link))
        //     console.log(e.link)
    }

    return (
        <ApiContext.Provider value={helper}>
            <div>

                <LoadingOverlay
                    active={loading.isshow}
                    spinner
                    text={loading.text}
                >
                    {/* <div id="content-wrapper">
                        <div className="container-fluid" style={{ paddingTop: 6, height: '100vh' }}>
                            <Outlet />
                        </div>
                    </div> */}

                    <Container fluid>
                        <Row style={styles.headerpage}>

                        </Row>
                        <Row style={styles.bodypage}>
                            <Col md={2} sm={2} style={styles.leftbodypage}>
                                <Menu
                                    theme={'dark'}
                                    onClick={(event) => handleClick(event)}
                                    style={{ width: 256 }}
                                    mode="inline"
                                >
                                    <Menu.Item key={apphelper.NavigatPath.frmform} icon={<FormOutlined />}>Form</Menu.Item>
                                    <Menu.Item key={apphelper.NavigatPath.frmlist} icon={<OrderedListOutlined />}>List</Menu.Item>
                                    <Menu.Item key={apphelper.NavigatPath.frmdragdrop} icon={<DragOutlined />}>Drag Drop</Menu.Item>
                                </Menu>
                            </Col>
                            <Col md={10} sm={10} style={styles.rightbodypage}>
                                <Outlet />
                            </Col>
                        </Row>
                    </Container>

                    <Sidebar visible={isNavOpen == 'open'} position="bottom" baseZIndex={1000000} onHide={() => setIsNavOpen('close')} style={styles.sidebar} >
                        <h6>Error</h6>
                        <hr style={{ color: 'white', backgroundColor: 'white' }} />

                        {errortext.text.length > 0 &&
                            <div style={styles.divsidebarerror}>
                                {errortext.text}
                                <br />
                            </div>
                        }

                        {errortext.arr.length > 0 &&
                            errortext.arr.map((data, i) => {
                                return (
                                    <div>{data}<br /></div>
                                )
                            })
                        }

                    </Sidebar>

                    <Growl ref={growl} position="bottomright" />
                </LoadingOverlay>

                <Dialog ref={confirmdialog} />
            </div >
        </ApiContext.Provider>
    )
}

const styles = useStyles({
    sidebar: {
        // maxHeight: isMobile ? '80vh' : '35vw',
        maxHeight: '70vh',
        minHeight: '25vh',
        height: 'auto',
        backgroundColor: 'red',
        color: 'white'
    },
    divsidebarerror: {
        height: 'auto !important',
        overflowY: 'auto',
        'whiteSpace': 'unset'
    },
    headerpage: {
        height: '7vh',
        backgroundColor: '#365D40'
    },
    bodypage: {
        minHeight: '93vh',
        backgroundColor: 'black'
    },
    leftbodypage: {
        minHeight: '90vh',
        backgroundColor: '#001529',
        paddingLeft: 0
    },
    rightbodypage: {
        minHeight: '90vh',
        backgroundColor: 'white',
        padding: 15
    }
})

