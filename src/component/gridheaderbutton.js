import React, { useState, useEffect } from 'react';
import { useStyles } from 'react-styles-hook'
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/fa'

import gbstyle from '../assets/gbstyle'

export default function GridHeaderButton(props) {

    const doAdd = () => {
        // console.log('add')
        if (props.addclick)
            props.addclick();
    }

    const doEdit = () => {
        // console.log('edit')
        if (props.editclick)
            props.editclick();
    }

    const doDelete = () => {
        // console.log('del')
        if (props.delclick)
            props.delclick();
    }

    const doCancel = () => {
        // console.log('cancel')
        if (props.cancelclick)
            props.cancelclick();
    }

    const doView = () => {
        // console.log('view')
        if (props.viewclick)
            props.viewclick();
    }

    const doPrint = () => {
        // console.log('print')
        if (props.printclick)
            props.printclick();
    }

    return (
        <div style={gbstyle.gridrowheader}>
            {props.addshow &&
                <Button variant="primary" size="sm" style={styles.buttonleft} onClick={() => doAdd()}> <FontAwesome.FaPlus /> Add</Button>
            }

            {props.editshow &&
                <Button variant="primary" size="sm" style={styles.buttonleft} onClick={() => doEdit()}> <FontAwesome.FaEdit /> Edit</Button>
            }

            {props.delshow &&
                <Button variant="danger" size="sm" style={styles.buttonleft} onClick={() => doDelete()}> <FontAwesome.FaMinusCircle /> Del</Button>
            }

            {props.cancelshow &&
                <Button variant="danger" size="sm" style={styles.buttonleft} onClick={() => doCancel()}> <FontAwesome.FaBan /> Cancel</Button>
            }

            <div style={{ display: 'flex', flexDirection: 'row-reverse', marginLeft: 'auto' }}>
                {props.printshow &&
                    <Button variant="primary" size="sm" style={styles.buttonright} onClick={() => doPrint()}> <FontAwesome.FaPrint />  Print</Button>
                }

                {props.viewshow &&
                    <Button variant="primary" size="sm" style={styles.buttonright} onClick={() => doView()}> <FontAwesome.FaSearch /> View</Button>
                }
            </div>
        </div>

    )
}

GridHeaderButton.propTypes = {
    addshow: PropTypes.bool,
    editshow: PropTypes.bool,
    delshow: PropTypes.bool,
    cancelshow: PropTypes.bool,
    printshow: PropTypes.bool,
    viewshow: PropTypes.bool,

    addclick: PropTypes.func,
    editclick: PropTypes.func,
    delclick: PropTypes.func,
    cancelclick: PropTypes.func,
    printclick: PropTypes.func,
    viewclick: PropTypes.func,
};

const styles = useStyles({
    buttonleft: {
        marginLeft: 3,
        fontSize: '.780rem'
    },

    buttonright: {
        marginRight: 3,
        fontSize: '.780rem'
    }
})


