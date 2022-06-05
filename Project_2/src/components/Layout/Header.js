import React from "react";

import image from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Spatium Stories</h1>
                <HeaderCartButton onClick={props.onClick}>Cart</HeaderCartButton>
            </header>
            <div className={classes['main-image']}>
                <img src={image} alt="A table full of food"/>
            </div>
        </React.Fragment>
    );
};

export default Header;