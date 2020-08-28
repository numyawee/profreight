import React, { useState, useRef, useEffect } from 'react'
import { useStyles } from 'react-styles-hook'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import allActions from '../../actions'

import axios from "axios"
import { Form, Row, Col, Button } from 'react-bootstrap';
import LoadingOverlay from 'react-loading-overlay';
import Dialog from 'react-bootstrap-dialog'
import * as moment from 'moment';

import gbstyle from "../../assets/gbstyle";
import apphelper from "../../apphelper/apphelper"

export default function FrmLogIn() {
    let navigate = useNavigate();
    const [isshow, setisshow] = useState(false);
    const [usertxt, setusertxt] = useState('admin');
    const [pwdtxt, setpwdtxt] = useState('admin');
    let confirmdialog = useRef()
    const dispatch = useDispatch()
    const systemenv = useSelector(state => state.systemenv)

    useEffect(() => {
        BindNextTab()
    }, []);

    const showdialog = (title, body) => {
        confirmdialog.current.show({
            title: title,
            body: body,
            actions: [
                Dialog.OKAction()
            ],
            bsSize: 'small'
        })
    }

    const loginClick = async (e) => {
        try {
            setisshow(true);

            // const response = await axios.get(systemenv.apiuserurl + 'user/isuserinsystem?user=' + usertxt + '&pwd=' + pwdtxt + '&system=InnovationCheque&compid&branchid')
            // setisshow(false)
            // console.log(response)
            // if (!response.data.Success) {
            //     showdialog('Error', response.data.Message)
            //     return
            // }
            let response = {
                data: {
                    User: {
                        StaffID: "admininno",
                        StaffName: "สุดหล่อ Forever",
                        UseStatus: "Y",
                        UserID: "admin",
                        UserPassword: "admin"
                    }
                }
            }

            dispatch(allActions.userAction.userlogin(response.data.User))
            const expiresAt = moment().add(300, 'minute');
            localStorage.setItem('isLoggedIn_profreight', 'true');
            localStorage.setItem('expires_at_profreight', JSON.stringify(expiresAt.valueOf()));
            localStorage.setItem('user_profreight', apphelper.Encode(JSON.stringify(response.data.User)));
            navigate(apphelper.NavigatPath.home)
        } catch (error) {
            showdialog('Error', error.message)
        }

        // dispatch(allActions.userAction.userlogin({username : 'admin', compid: 'INNO' , branchid: 'INNO01', compname: 'บริษัท วิริยะอินโนเวชั่น จำกัด' , branchname: 'สำนักงานใหญ่', staffid : 'admin', staffname: 'admin'}))
        // navigate('/home')
    }

    // function handleEnter(event) {
    //     //console.log(event.target.value)
    //     if (event.keyCode === 13) {
    //         const nexttabs = document.getElementsByClassName('nexttab');
    //         console.log(nexttabs)
    //         // const index = Array.prototype.indexOf.call(form, event.target);
    //         // form.elements[index + 1].focus();
    //         // event.preventDefault();
    //     }
    // }


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

    const BindNextTab = (params) => {
        const nexttabs = document.getElementsByClassName('nexttab');
        //console.log(nexttabs)
        for (let i = 0; i <= nexttabs.length - 1; i++) {
            nexttabs[i].name = 'nexttab' + i
            nexttabs[i].addEventListener("keydown", (event) => nextTabHandle(event, 'nexttab' + (i + 1)));
        }
    }

    return (
        <LoadingOverlay
            active={isshow}
            spinner
            text={'Loading...'}
        >
            <div style={styles.bg}>
                <div style={styles.card}>
                    <div style={{ margin: 10, ...gbstyle.aligncenter }}>
                        <h2>Profreight</h2>
                    </div>

                    <img id="profile-img" style={{ ...styles.profileimgcard, ...gbstyle.aligncenter }} src={require('../../assets/images/avatar_2x.png')} />

                    {/* <Form.Group as={Row} style={{ marginTop: 30 }}>
                        <Col md={10} style={gbstyle.aligncenter}>
                            <Form.Control className="nexttab" type="text" placeholder="Username" value={usertxt} onChange={(e) => setusertxt(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md={10} style={gbstyle.aligncenter}>
                            <Form.Control className="nexttab" type="password" placeholder="Password" value={pwdtxt} onChange={(e) => setpwdtxt(e.target.value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Col md={10} style={gbstyle.aligncenter}>
                            <Button block variant="primary" onClick={loginClick}>Log In</Button>
                        </Col>
                    </Form.Group> */}

                    <Form>
                        <Form.Group as={Row} style={{ marginTop: 30 }}>
                            <Col sm={10} xs={10} style={gbstyle.aligncenter}>
                                <Form.Control className="nexttab" type="text" placeholder="Username" value={usertxt} onChange={(e) => setusertxt(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={10} style={gbstyle.aligncenter}>
                                <Form.Control className="nexttab" type="password" placeholder="Password" value={pwdtxt} onChange={(e) => setpwdtxt(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row}>
                            <Col sm={10} style={gbstyle.aligncenter}>
                                <Button block variant="primary" onClick={loginClick}>Log In</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>

                <Dialog ref={confirmdialog} />
            </div>
        </LoadingOverlay >

    )
}

const styles = useStyles({
    bg: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundImage: 'url(' + require('../../assets/images/lgBackgroundImg.png') + ')',
        backgroundColor: 'red',
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        backgroundColor: '#F7F7F7',
        MozBorderRadius: 10,
        marginTop: 50,
        WebkitBorderRadius: 10,
        borderRadius: 10,
        MozBoxShadow: `0px 2px 2px rgba(0, 0, 0, 0.3)`,
        WebkitBoxShadow: `0px 2px 2px rgba(0, 0, 0, 0.3)`,
        boxShadow: `0px 2px 2px rgba(0, 0, 0, 0.3)`,
        opacity: 0.9,
        width: '35%',
        height: '60vh',

    },
    profileimgcard: {
        width: 96,
        height: 96,
        display: 'block',
        borderRadius: 50,
        alignSelf: 'center',
    }
})
