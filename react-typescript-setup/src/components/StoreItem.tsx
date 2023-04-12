import {Card,Button} from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/shoppingCartContext';

type StoreItemProps = {
     id: number,
     name:string,
     imgUrl:string,
     price:number
}

const StoreItem = ({id,name,imgUrl,price}:StoreItemProps) => {
     const { getItemQuantity, increaseCartQuantity,decreaseCartQuantity,removeFromCart} = useShoppingCart();
   const quantity = getItemQuantity(id);

  return (
    <Card className="shadow-xl h-100">
          <Card.Img src={imgUrl}  variant="stop" height="250px" style={{objectFit:"cover"}} />
          <Card.Body className="d-flex flex-column">
               <Card.Title className="d-flex justify-content-between align-items-center mb-4" style={{width:"100%"}}>
                    <h4>{name}</h4>
                    <h6>{formatCurrency(price)}</h6>
               </Card.Title>
               <div className="mt-auto">
               {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
               </div>
          </Card.Body>
    </Card>
  )
}

export default StoreItem