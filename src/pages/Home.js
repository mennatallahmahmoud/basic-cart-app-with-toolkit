import { Link } from 'react-router';
import './Home.css';

function Home() {
    return (
        <div className="hero py-5">
            <div className='content position-absolute'>
                <h1 className='mb-5'>Your Cart App</h1>
                <Link className='btn btn-danger' to={'products'}>SHOP NOW</Link>
            </div>
        </div>
    )
}

export default Home;