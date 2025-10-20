import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartProvider } from '../Context/CartContext'
import Home from '../Pages/Home'
import Productpage from '../Pages/Productpage'
import Singleproduct from '../Pages/Singleproduct'
import Cart from '../Pages/Cart'
import Aboutus from '../Pages/Aboutus'
import Admin from '../Pages/admin'
import Blog from '../Pages/Blog'
import Contactus from '../Pages/Contactus'
// import BackendTest from '../Pages/BackendTest'

const MainRoutes = () => {
  return (
    <CartProvider>
      <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/product' element={<Productpage/>}></Route>
          <Route path='/single-product/:id' element={<Singleproduct/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/aboutus' element={<Aboutus/>}></Route>
          <Route path='/admin' element={<Admin/>}></Route>
          <Route path='/blog' element={<Blog/>}></Route>
          <Route path='/contactus' element={<Contactus/>}></Route>
          {/* <Route path='/backend-test' element={<BackendTest/>}></Route> */}
          {/* <Route path='/' element={<PrivateRouter><ProductPage/></PrivateRouter>}></Route> */}
          {/* <Route path='/' element={<PrivateRouter><SingleEditProduct/></PrivateRouter>}></Route> */}
          {/* <Route path='*' element={<PageNotFound/>}></Route> */}
      </Routes>
    </CartProvider>
  )
}

export default MainRoutes