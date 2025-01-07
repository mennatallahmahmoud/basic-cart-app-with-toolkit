import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

function AppNavbar() {

  const cartLength = useSelector(state => state.cart);

    return (
        <Navbar fixed='top' expand="lg" className="bg-body-tertiary" style={{boxShadow:'0 0 10px 0px #cccccc75'}}>
          <Container>
            <Link to={'/'} className='navbar-brand'>CartApp</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Link to={'products'} className='nav-link'>Products</Link>
                <Link to={'cart'} className='nav-link'>Cart - {cartLength ? cartLength.length : 0}</Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default AppNavbar;