import { ReactNode, createContext ,useContext, useState } from "react";
import { ShoppingCart } from "../components";
import { useLocalStorage } from "../utilities/useLocalStorage";

type ShoppingCartProviderProps = {
     children: ReactNode
}

type ShoppingCartContextType = {
     getItemQuantity: (id: number) => number
     increaseCartQuantity: (id: number) => void
     decreaseCartQuantity: (id: number) => void
     removeFromCart: (id: number) => void
     openCart: () => void
     closeCart: () => void
     cartQuantity: number
     cartItems: CartItemsType[]
}
type CartItemsType = {
     id:number,
     quantity:number
}

const shoppingCartContext = createContext({} as ShoppingCartContextType) ;

export function useShoppingCart(){
     return useContext(shoppingCartContext) ;
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){

     const [cartItems, setCartItems] = useLocalStorage<CartItemsType[]>("shopping-cart",[])
     const [isOpen, setIsOpen] = useState(false)

     // ==================== create Handlers
     const openCart = () => setIsOpen(true)
     const closeCart = () => setIsOpen(false)


     function getItemQuantity(id:number){
          return cartItems.find(item => item.id === id)?.quantity || 0
     }
     function increaseCartQuantity(id: number) {
          setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
              return [...currItems, { id, quantity: 1 }]
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 }
                } else {
                  return item
                }
              })
            }
          })
     }
     function decreaseCartQuantity(id: number) {
          setCartItems(currItems => {
            if (currItems.find(item => item.id === id)?.quantity === 1) {
              return currItems.filter(item => item.id !== id)
            } else {
              return currItems.map(item => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity - 1 }
                } else {
                  return item
                }
              })
            }
          })
     }
     function removeFromCart(id:number){
               setCartItems( currentItems =>{
                    return currentItems.filter(item => item.id !== id)
               })
     }
     const cartQuantity = cartItems.reduce( (quantity,item) => item.quantity + quantity,0)

     return <shoppingCartContext.Provider value={{getItemQuantity, increaseCartQuantity,decreaseCartQuantity,removeFromCart , cartQuantity , openCart,closeCart,cartItems}}>
               {children}
               <ShoppingCart isOpen={isOpen}/>
     </shoppingCartContext.Provider>
}

export default shoppingCartContext;