import {Row,Col} from 'react-bootstrap'
import storeItems from '../data/data.json' 
import { StoreItem } from '../components'


const Store = () => {
  return (
    <>
    <h2>Store</h2>
      <Row md={2} lg={3} sm={1} className="g-3">
        {
          storeItems.map(item =>(
            <Col key={item.id} >
                <StoreItem {...item} />
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default Store