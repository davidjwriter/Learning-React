import React from "react";
import classes from './Login.module.css';



const DesoLogin = (props) => {

    const handleMessage = (event) => {
        console.log(event);
    }
    const login = () => {
        //const login   = window.open('https://identity.deso.org/log-in?accessLevelRequest=4');
        const h = 1000;
        const w = 800;
        const y = window.outerHeight / 2 + window.screenY - h / 2;
        const x = window.outerWidth / 2 + window.screenX - w / 2;
        const win = window.open("https://identity.deso.org/log-in", null, `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`);
        win.addEventListener("message", (event) => handleMessage(event));
        
        props.onLogin(win.publicKeyAdded);
    };

    return (
        <button onClick={login} className={classes.button}>Login with Deso</button>
    );
};

export default DesoLogin