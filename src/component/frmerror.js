import React, { useState, useRef, useEffect } from 'react';

import HeaderPage from './headerpage'

export default function FrmError() {
    const [error, seterror] = useState();

    useEffect(() => {
        console.log('frmerror')
        seterror(localStorage.getItem("errortext_profreight"));
    }, []);

    return (
        <div>
            <HeaderPage frmname={'Error'} compname='Comp Test' branchname='Branch Test' />

            <div style={{ padding: 10, backgroundColor: 'red' , color: 'white' , borderRadius: 5, minHeight: 50}}>
                {error}
            </div>
        </div >
    )
}


