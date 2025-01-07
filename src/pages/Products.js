import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../rtk/slices/products-slice';
import { addToCart } from '../rtk/slices/cart-slice';
import { Link } from 'react-router';
import { addToLS } from '../rtk/slices/localstorge-slice';
import Loading from '../components/Loading';

function Products() {

    const allProducts = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const [searchInput, setSearchInput] = useState('');
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    const products = allProducts.filter((product) => {
        return product.title.toLowerCase().startsWith(searchInput.toLowerCase())
    })


    return (
        <Container className='py-5'>
            <div className="search mb-md-0 my-5 position-relative ms-auto" style={{width: 'fit-content'}}>
                <input type="text" className="rounded px-2" style={{outline: 'none'}} placeholder='Search' onChange={(e) => {
                    setSearchInput(e.target.value)
                }}/>
                <svg xmlns="http://www.w3.org/2000/svg" style={{right: '10px', transform: 'translateY(-50%)'}} width="16" height="16" fill="currentColor" className="bi bi-search position-absolute top-50" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
            </div>
            {products.length > 0 ?
            <Row className='mt-5'>
            {products.map((product) => {
                return (
                    <Col key={product.id} className='my-3'>
                        <Card style={{ width: '18rem' }} className='mx-auto'>
                            <Card.Img variant="top" src={product.image} style={{height: '300px', padding: '20px'}}/>
                            <Card.Body className='text-center'>
                            <Card.Title>{`${product.title.slice(0, 18)}..`}</Card.Title>
                            <Card.Text>
                                {`${product.description.slice(0, 80)}..`}
                            </Card.Text>
                            <Card.Text>
                                Price: <span style={{color: 'red', fontWeight: 'bold'}}>{product.price} $</span>
                            </Card.Text>
                            <Button variant="primary" onClick={() => {
                                dispatch(addToCart(product));
                                dispatch(addToLS(product));
                            }}>Add To Cart</Button>
                            <Link className='btn btn-success ms-3' to={`${product.id}`}>View Details</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                )
            })}
            </Row> :
            <Row className='mt-5'>
                <Loading />
            </Row>
            }
        </Container>
    )
}

export default Products;