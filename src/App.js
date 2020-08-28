import React, { useState, useRef, useEffect, useContext } from 'react';
import './App.css';

import RootRoute from './router'
import { Growl } from 'primereact/growl';

function App() {
  let growl = useRef(null);
  //let navigate = useNavigate();

  useEffect(() => {
    console.log('app ', process.env.PUBLIC_URL)
  }, []);

  const ShowToast = (message, title = 'message', type = 'success', timeout = 3000, sticky = false) => {
    switch (type) {
      case 'success':
        growl.current.show({ severity: 'success', summary: title, detail: message, life: timeout, sticky: sticky });
        break;
      case 'info':
        growl.current.show({ severity: 'info', summary: title, detail: message, life: timeout, sticky: sticky });
        break;
      case 'warning':
        growl.current.show({ severity: 'warn', summary: title, detail: message, life: timeout, sticky: sticky });
        break;
      case 'error':
        growl.current.show({ severity: 'error', summary: title, detail: message, life: timeout, sticky: sticky });
        break;
      default:
        break;
    }
  }

  return (

    <div>
      < RootRoute />
      <Growl ref={growl} position="bottomright" />
    </div>
  );
}

export default App;
