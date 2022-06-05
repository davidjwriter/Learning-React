import { useReducer } from 'react';
import CartContext from './cart-context';


const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedAmount = state.totalAmount + (action.item.price * action.item.amount);
        const existingCartIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartIndex];

        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount + action.item.amount};
            updatedItems = [...state.items];
            updatedItems[existingCartIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }


        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };

    } else if (action.type === 'REMOVE') {
        // Get the index of the item in our state array
        const cartIndex = state.items.findIndex(item => item.id === action.id);

        // Retrieve the actual item from the array to access amount, price, etc.
        const cartItem = state.items[cartIndex];

        // Update total amount
        const updatedAmount = state.totalAmount - cartItem.price;

        // Update state array
        let updatedItems = [...state.items];

        // If only 1 item in cart, remove item from array, otherwise subtract amount by 1
        if (cartItem.amount === 1) {
            updatedItems.splice(cartIndex, 1);
        } else {
            const updatedItem = {...cartItem, amount: cartItem.amount - 1};
            updatedItems[cartIndex] = updatedItem;
        }

        // Return the updated values to update the state
        return {
            items: updatedItems,
            totalAmount: updatedAmount
        };

    }
    return defaultCartState;
};

 
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItem = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item
        });
    };
    
    const removeItem = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItem,
        removeItem: removeItem
    };


    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;