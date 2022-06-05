import Input from '../UI/Input';
import classes from './MealItemForm.module.css';
import { useRef, useState } from 'react';

const MealItemForm = (props) => {
    const [formValid, setFormValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const num = +enteredAmount;

        if (enteredAmount.trim().length === 0 || num < 1 || num > 5) {
            setFormValid(false);
            return;
        }

        props.onAddToCart(num);

    };
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                label="Amount" 
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1',
                }}
                ref={amountInputRef}
            />
            <button>+ Add</button>
            {!formValid && <p>Please Enter a Valid Amount (1-5)</p>}
        </form>
    );
};

export default MealItemForm;