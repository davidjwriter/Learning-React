import React from 'react';
import classes from './Modal.module.css';
import reactDom from 'react-dom';

const Backdrop = (props) => {
    return (
        <div className={classes.backdrop} onClick={props.onClick}></div>
    );
};

const Overlay = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {reactDom.createPortal(<Backdrop onClick={props.onClick}/>, portalElement)}
            {reactDom.createPortal(<Overlay>{props.children}</Overlay>, portalElement)}
        </React.Fragment>
    );
};

export default Modal;