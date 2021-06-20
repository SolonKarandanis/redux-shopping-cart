import { DECREASE,INCREASE,CLEAR_CART,REMOVE,GET_TOTALS,TOGGLE_AMOUNT } from './Actions';

function reducer(state,action){
    let tempCart= [];
    switch(action.type){
        case CLEAR_CART:
            return {...state, cart: []}; 
        case INCREASE:
            tempCart = state.cart.map((cartItem)=>{
                if(cartItem.id ===action.payload.id){
                    cartItem = {...cartItem, amount:cartItem.amount +1};
                }
                return cartItem;
            });
            return {
                ...state,
                cart: tempCart
            };
        case DECREASE:
            if(action.payload.amount === 1){
                tempCart =removeFromCart(state.cart,action)
            }
            else
            {
                tempCart = state.cart.map((cartItem)=>{
                    if(cartItem.id ===action.payload.id){
                        cartItem = {...cartItem, amount:cartItem.amount -1};
                    }
                    return cartItem;
                });
            }
            
            return {
                ...state,
                cart: tempCart
            };
        case REMOVE:
            return {
                ...state,
                cart:removeFromCart(state.cart,action)
            };
        case GET_TOTALS:

            let {total,amount}= state.cart.reduce((cartTotal,cartItem)=>{
                const {price,amount} = cartItem;
                const itemTotal = price * amount;
                cartTotal.amount += amount;
                cartTotal.total = itemTotal;
                return cartTotal;
            },{total:0,amount:0});
            // getting rid of decimals
            total = parseFloat(total.toFixed(2));
            return {
                ...state,
                total,
                amount
            };

        case TOGGLE_AMOUNT: 
            return {
                ...state,
                cart: state.cart.map(cartItem=>{
                    if(cartItem.id === action.payload.id){
                        if(action.payload.toggle ==='inc'){
                            return cartItem = {...cartItem,amount: cartItem.amount +1}
                        }
                        if(action.payload.toggle ==='dec'){
                            return cartItem = {...cartItem,amount: cartItem.amount -1}
                        }
                    }
                    return cartItem;
                }),
            };

        default:
            return state;
    };
};

function removeFromCart(cart,action){
 return cart.filter((cartItem)=>cartItem.id !==action.payload.id);
}

export default reducer;