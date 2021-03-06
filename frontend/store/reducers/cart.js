import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState,action) => {
  switch(action.type){
    case ADD_TO_CART:
        const addedProduct = action.product;
        const prodPrice = addedProduct.price;
        const prodTitle = addedProduct.title;
        let quantity =1;
        let updatedOrNewCartItem;

        if (state.items[addedProduct.id]) {
        // already have the item in the cart

        const quantity = state.items[addedProduct.id].quantity +1;
        const priceMultiProd = quantity* prodPrice;
        updatedOrNewCartItem = {
            quantity,
            prodPrice,
            prodTitle,
            priceMultiProd
          };
   } else {
     updatedOrNewCartItem = {quantity, prodPrice, prodTitle, prodPrice};
   }

        return {
              ...state,
              items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
              totalAmount: state.totalAmount + prodPrice
     };
     case REMOVE_FROM_CART:
       const selectedCartItem = state.items[action.pid];
       const currentQty = selectedCartItem.quantity;
       let updatedCartItems;
       if (currentQty > 1) {
         // need to reduce it, not erase it
         const qqq = (parseInt(selectedCartItem.quantity) - 1) ;
         const prodPrice =parseFloat(selectedCartItem.productPrice) ;
         const prodTitle = parseFloat(selectedCartItem.productTitle) ;
         const total = (parseFloat(selectedCartItem.sum) - parseFloat(selectedCartItem.productPrice));

         const updatedCartItem = {
           qqq,
           prodPrice,
           prodTitle,
           total
         }
         updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
       } else {
         updatedCartItems = { ...state.items };
         delete updatedCartItems[action.pid];
       }
       return {
         ...state,
         items: updatedCartItems,
         totalAmount: state.totalAmount - selectedCartItem.productPrice
       };
       case ADD_ORDER:
        return initialState;

  }

  return state;
};
