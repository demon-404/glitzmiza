import React from 'react'
import Header from '../Components/Header'
import Card from '../Components/Card'
import Offer from '../Components/Offer'
import Premium from '../Components/Premium'
import Quality from '../Components/Quality'
import Subscribe from '../Components/Subscribe'
import Aboutsection from '../Components/Aboutsection'
import Footer from '../Components/Footer'
import '../Css/Home.css'


const Home = () => {
  return (
    <>
    <Header/>
      <Card/>
      <Offer/>
      <Premium/>
      <Quality/>
      <Subscribe/>
      <Aboutsection/>
      <Footer/>
    </>
  )
}

export default Home