import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

const HeaderCartButton = (props) => {
    const [bump, setBump] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    const numOfCartItems = items.reduce((currNum, item) => {
        return currNum + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${bump ? classes.bump : ''}`;

    useEffect(() => {
        if (cartCtx.items.length === 0) {
            return;
        }
        setBump(true);

        const timer = setTimeout(() => {
            setBump(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return (
        <button onClick={props.onClick} className={btnClasses}>
            <span>
                <CartIcon className={classes.icon}/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>
                {numOfCartItems}
            </span>
        </button>
    );
};

export default HeaderCartButton;