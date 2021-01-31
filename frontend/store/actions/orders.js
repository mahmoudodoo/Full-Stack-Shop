export const ADD_ORDER = 'ADD_ORDER';
import { useSelector } from 'react-redux';

export const addOrder = (cartItems, totalAmount,user_id) => {
  return async (dispatch) => {

    const response = await fetch(
      `http://10.0.2.2:5000/order`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          totalAmount,
          user_id,
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

  };
};
