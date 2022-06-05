import Modal from "../UI/Modal";
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const {
        value: enteredName,
        isValid: nameInputValid,
        hasError: nameInvalid,
        valueChangeHandler: nameInputChangeHandler,
        valueBlurHandler: nameInputBlurHandler,
        reset: nameReset
        
    } = useInput(value => value.trim() !== '');
    
    const {
    value: enteredEmail,
    isValid: emailInputValid,
    hasError: emailInvalid,
    valueChangeHandler: emailInputChangeHandler,
    valueBlurHandler: emailInputBlurHandler,
    reset: emailReset
    
    } = useInput(value => value.includes('@') && value.includes('.'));

    const {
        value: enteredPhone,
        isValid: phoneInputValid,
        hasError: phoneInvalid,
        valueChangeHandler: phoneInputChangeHandler,
        valueBlurHandler: phoneInputBlurHandler,
        reset: phoneReset
        
        } = useInput(value => value.length === 10);
    
    const {
        value: enteredCredit,
        isValid: creditInputValid,
        hasError: creditInvalid,
        valueChangeHandler: creditInputChangeHandler,
        valueBlurHandler: creditInputBlurHandler,
        reset: creditReset
        
        } = useInput(value => value.length === 16);

    let formIsValid = false;


    if (nameInputValid && emailInputValid && phoneInputValid && creditInputValid) {
        formIsValid = true;
    } else {
        formIsValid = false;
    }
    async function addOrder(order) {
        const response = await fetch('https://react-http-739a7-default-rtdb.firebaseio.com/orders.json', {
          method: 'POST',
          body: JSON.stringify(order),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        console.log(data);
    }

    const formSubmissionHandler = (event) => {
        event.preventDefault();
        const order = {
            name: enteredName,
            email: enteredEmail,
            phone: enteredPhone,
            card: enteredCredit,
            items: cartCtx.items
        };
        addOrder(order);
        nameReset();
        emailReset();
        creditReset();
        phoneReset();
        props.onSuccess();
    };
    
    
    const namedInputClasses = !nameInvalid ? `${classes.control}` : `${classes.control} ${classes.invalid}`;
    const emailInputClasses = !emailInvalid ? `${classes.control}` : `${classes.control} ${classes.invalid}`;
    const phoneInputClasses = !phoneInvalid ? `${classes.control}` : `${classes.control} ${classes.invalid}`;
    const creditInputClasses = !creditInvalid ? `${classes.control}` : `${classes.control} ${classes.invalid}`;

    return (
        <Modal>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <form className={classes.form} onSubmit={formSubmissionHandler}>
                <div className={namedInputClasses}>
                    <label htmlFor='name'>Your Name</label>
                    <input
                        type='text'
                        id='name'
                        onChange={nameInputChangeHandler}
                        onBlur={nameInputBlurHandler}
                        value={enteredName}
                    />
                    {nameInvalid && <p className={classes.invalid}>Name must not be empty.</p>}
                </div>

                <div className={emailInputClasses}>
                    <label htmlFor='email'>Your Email</label>
                    <input
                        type='email'
                        id='email'
                        onChange={emailInputChangeHandler}
                        onBlur={emailInputBlurHandler}
                        value={enteredEmail}
                    />
                    {emailInvalid && <p className={classes.invalid}>Email is invalid.</p>}
                </div>

                <div className={phoneInputClasses}>
                    <label htmlFor='phone'>Phone Number</label>
                    <input
                        type='tel'
                        id='phone'
                        onChange={phoneInputChangeHandler}
                        onBlur={phoneInputBlurHandler}
                        value={enteredPhone}
                    />
                    {phoneInvalid && <p className={classes.invalid}>Enter a valid phone number.</p>}
                </div>

                <div className={creditInputClasses}>
                    <label htmlFor='credit'>Credit Card</label>
                    <input
                        type='tel'
                        id='credit'
                        inputmode="numeric"
                        pattern="[0-9\s]{13,19}"
                        maxlength="19"
                        placeholder="xxxx xxxx xxxx xxxx"
                        onChange={creditInputChangeHandler}
                        onBlur={creditInputBlurHandler}
                        value={enteredCredit}
                    />
                    {creditInvalid && <p className={classes.invalid}>Please enter a valid credit card number.</p>}
                </div>

                <div className={classes.actions}>
                    <button className={classes.actions} onClick={props.onClick}>Close</button>
                    <button className={`${classes.actions} ${classes.submit}`} disabled={!formIsValid}>Submit</button>
                </div>
            </form>
        </Modal>
    );
};

export default Checkout;