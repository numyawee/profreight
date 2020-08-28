import React from 'react';
import { useStyles } from 'react-styles-hook'
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'
import allActions from '../actions'

export default function HeaderPage(props) {
    const user = useSelector(state => state.user)

    return (
        <div style={styles.headerdiv}>
            <Row>
                <Col className="text-left" md={5}>
                    {props.frmname + (props.formstate?.length > 0 ? ' : ' + props.formstate : '')}
                </Col>
                <Col className="text-right" md={7} style={{paddingRight: 30}}>
                    {user.compname + ' ' + user.branchname}
                </Col>
            </Row>
        </div >
    )
}

HeaderPage.propTypes = {
    frmname: PropTypes.string.isRequired,
    formstate: PropTypes.string,
    compname: PropTypes.string,
    branchname: PropTypes.string,
};

const styles = useStyles({
    headerdiv: {
        backgroundColor: '#E9ECEF',
        padding: `12px 25px 12px 35px`,
        marginBottom: 15,
        width: `100% !important`,
        borderRadius: 5,
        fontSize: 16
    }
})


