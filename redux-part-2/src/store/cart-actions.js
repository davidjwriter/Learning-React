import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const sendCartData = (cart) => {
    return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch(
                'https://react-http-739a7-default-rtdb.firebaseio.com/cart.json',
                {
                    method: 'PUT',
                    body: JSON.stringify({items: cart.items, totalQuantity: cart.totalQuantity}),
                }
            );
    
            if (!response.ok) {
                throw new Error('problem sending data');
            }
        }

        try {
            await sendRequest();
            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: "Sent Cart Data Successfully"
              }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error :(',
                message: "Sending Cart Data Failed :("
              }));
        }


    };
}

export const fetchCartData = () => {
    return async (dispatch) => {
        const fetchData = async () => {
            const resp = await fetch('https://react-http-739a7-default-rtdb.firebaseio.com/cart.json');

            if (!resp.ok) {
                throw new Error("could not fetch cart data");
            }

            const data = await resp.json();

            return data;
        }

        try {
            const cartData = await fetchData();
            dispatch(cartActions.replaceCart({
                items: cartData.items || [],
                totalQuantity: cartData.totalQuantity,
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error :(',
                message: "Fetching Cart Data Failed :("
              }));
        }
    };
}