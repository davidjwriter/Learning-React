import { useState, useReducer } from 'react';

const init =  {
    value: '',
    touched: false,
};

const inputStateReducer = (state, action) => {
    if (action.type === 'INPUT') {
        return { value: action.value, touched: state.touched };
    } else if (action.type === 'BLUR') {
        return { value: state.value, touched: true};
    } else if (action.type === 'RESET') {
        return { value: '', touched: false};
    }
    return init;
}

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(inputStateReducer, init);

    const valueIsValid = validateValue(inputState.value);
    const hasError = !valueIsValid && inputState.touched;

    const valueChangeHandler = (event) => {
        dispatch({type: 'INPUT', value: event.target.value});
    }

    const valueBlurHandler = () => {
        dispatch({type: 'BLUR'});
    }

    const reset = () => {
        dispatch({type: 'RESET'});
    }

    return {
        value: inputState.value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        valueBlurHandler,
        reset
    };
};

export default useInput;