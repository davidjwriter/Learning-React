import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import { useContext } from 'react';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAdd = (item) => {
        const itemToAdd = {...item, amount: 1};
        cartCtx.addItem(itemToAdd);
    };

    const cartItems = cartCtx.items.map(item => 
        <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAdd.bind(null, item)}
        />);


    return (
        <Modal onClick={props.onClick}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button onClick={props.onClick} className={classes['button--alt']}>Close</button>
                {hasItems && <button onClick={props.onCheckout} className={classes.button}>Checkout</button>}
            </div>
        </Modal>
    );
};

export default Cart;