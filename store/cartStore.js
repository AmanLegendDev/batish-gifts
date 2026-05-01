import { create } from "zustand";

export const useCartStore=create(set=>({

cart:[],

addToCart:(product)=>

set(state=>{

const exists=state.cart.find(
item=>item._id===product._id
);

if(exists){

return{
cart:state.cart.map(item=>

item._id===product._id

? {...item,qty:item.qty+1}

:item
)

};

}

return{

cart:[

...state.cart,

{...product,qty:1}

]

};

})

}));