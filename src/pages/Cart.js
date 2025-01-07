import { Button, Container, Image } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, deleteFromCart } from '../rtk/slices/cart-slice';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { clearLS, removeFromLS } from '../rtk/slices/localstorge-slice';


function Cart() {

    let totalPrice;

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    
    if(cart) {
        totalPrice = cart.reduce((acc, curr) => {
            acc += curr.price * curr.quantity;
            return acc;
        }, 0)
    }

    return (
        <Container className='py-5'>
            {cart && cart.length > 0? 
            <>
            <Button variant='danger' className='mt-5' onClick={() => {
                Swal.fire({
                    text: 'Are you sure to CLEAR your cart?',
                    confirmButtonText: 'Yes',
                    showCancelButton: true,
                }).then((data) => {
                    if(data.isConfirmed) {
                        dispatch(clearCart());
                        dispatch(clearLS());
                    }    
                })
            }
            }>Clear Cart</Button>
            <p className='my-4' style={{fontSize: '20px', fontWeight: 'bold'}}>Total Price - {totalPrice.toFixed(2)} $</p>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Image</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((prd) => (
                        <tr key={prd.id}>
                            <td>{prd.id}</td>
                            <td>{prd.title}</td>
                            <td><Image src={prd.image} style={{width: '100px', height: '100px'}}/></td>
                            <td>{prd.quantity}</td>
                            <td>{(prd.price * prd.quantity).toFixed(2)}$</td>
                            <td><Button variant='danger' onClick={() => {
                                Swal.fire({
                                    text: 'Are you sure to DELETE this item?',
                                    confirmButtonText: 'Yes',
                                    showCancelButton: true,
                                }).then((data) => {
                                    if(data.isConfirmed) {
                                        dispatch(deleteFromCart(prd));
                                        dispatch(removeFromLS(prd))
                                    }    
                                })
                            } }>Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table> 
            </> : 
            <>
            <h2 className='mt-5 text-center'>Your Cart is Empty &#128532;</h2>
            <Link to={'/products'} type='button' className='d-block btn btn-success mx-auto mt-4' style={{width: '40%'}}>Go Shopping!</Link>
            </>
            }
        </Container>
    )
}

export default Cart;