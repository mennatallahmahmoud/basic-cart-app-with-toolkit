import './App.css';
import { Outlet, Route, Routes } from "react-router";
import AppNavbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";


function App() {

  return (
    <div className="App">
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='products' element={<Outlet />}>
          <Route path='' element={<Products />} />
          <Route path=':productId' element={<ProductDetails />} />
        </Route> 
        <Route path="cart" element={<Cart />}/>
      </Routes>
    </div>
  );
}

export default App;
