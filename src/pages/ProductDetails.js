import { useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchProducts } from "../rtk/slices/products-slice";
import { addToCart } from "../rtk/slices/cart-slice";

function ProductDetails() {

    const products = useSelector((state) => state.products);

    const dispatch = useDispatch();

    let {productId} = useParams();

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        dispatch(fetchProducts())    
    }, [])

    const product = products.filter((product) => product.id == productId)[0];
    
    return (
        <Container className="py-5">
            {product && 
                <Card style={{ width: '20rem', margin: '40px auto' }}>
                    <Card.Img variant="top" src={product.image} style={{height: '300px', padding: '20px'}}/>
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                            {product.description}
                        </Card.Text>
                        <Card.Text>
                            Price: <span className="fw-bold">{product.price} $</span>
                        </Card.Text>
                        <Button variant="primary" className="d-block mx-auto" onClick={() => dispatch(addToCart(product))}>Add To Cart</Button>
                    </Card.Body>
                </Card>
            }
        </Container>
    )
}

export default ProductDetails;
