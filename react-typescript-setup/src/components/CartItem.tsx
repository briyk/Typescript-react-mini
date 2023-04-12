import {Stack , Button} from 'react-bootstrap'
import { useShoppingCart } from '../context/shoppingCartContext'
import cartItems from '../data/data.json'
import { formatCurrency } from '../utilities/formatCurrency'

interface cartItemType{
     id:number,
     quantity:number
}

interface StoreItemProps {
     id: number,
     name:string,
     imgUrl:string,
     price:number
}


const CartItem = ({id,quantity}:cartItemType) => {
     const {removeFromCart}  = useShoppingCart() ;
     const item: StoreItemProps | undefined = cartItems.find(i => i.id === id);
     if (!item) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
        <img src={item.imgUrl} className="shadow-sm" alt="" style={{width:"145px",height:"100px",objectFit:"cover"}} /> 
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div> {formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button> 
    </Stack>
  )
}

export default CartItem