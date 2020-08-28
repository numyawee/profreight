import React, { useState, useRef, useEffect, useImperativeHandle } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';

import { Dialog } from 'primereact/dialog';

const FrmExpenseSearch = React.forwardRef((props, ref) => {
    const [visible, setvisible] = useState(false);
    const [count, setcount] = useState(0);
    //validate will be available to parent component using ref
    useImperativeHandle(ref, () => ({
        Open() {
            setcount(0)
            setvisible(true)
        }
    }));

    function renderFooter() {
        return (
            <div>
                <Button variant="primary" onClick={() => Close(count)}>close</Button>
                <Button variant="primary" onClick={() => setcount(count + 1)}>count</Button>
            </div>
        );
    }

    function Close(param) {
        //console.log(closeclick)
        props.closeclick(param);
        setvisible(false)
    }

    return (
        <div>
            <Dialog header={"Godfather I " + count} visible={visible} style={{ width: '50vw' }} modal={true} onHide={() => setvisible(false)} footer={renderFooter()}>
                The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter's wedding.
                His beloved son Michael has just come home from the war, but does not intend to become part of his father's business.
                Through Michael's life the nature of the family business becomes clear. The business of the family is just like the head of the family,
                kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.
             </Dialog>
        </div>
    )
})

export default FrmExpenseSearch
