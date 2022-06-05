import { useState, useEffect } from 'react';

const useCounter = (num) => {
    const [counter, setCounter] = useState(0);
    let temp = Math.floor((Math.random() * 10));
    const [base, setBase] = useState(temp);

    useEffect(() => {
        temp = Math.floor(Math.random() * 10);
        setBase(base);
    }, [counter]);

    useEffect(() => {
        const interval = setInterval(() => {
        setCounter((prevCounter) => prevCounter + (base * num));
        }, 1000);

        return () => clearInterval(interval);
    }, [num]);

    return counter;
};

export default useCounter;