import { ADD_ORDER } from '../actions/orders';

const initialState = {
  orders: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const order_id = action.orderData.id;
      const order_items = action.orderData.items;
      const order_amount = action.orderData.date;
      const order_date = action.orderData.date;
      const newOrder = {
        order_id,
        order_items,
        order_amount,
        order_date
      };
      return {
        ...state,
        orders: state.orders.concat(newOrder)
      };
  }

  return state;
};
