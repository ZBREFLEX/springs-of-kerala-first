
import './App.css'
import About from './components/About'
import Contact from './components/Contact'
import Destinations from './components/Destinations'
import Footer from './components/Footer'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Packages from './components/Packages'
import Review from './components/Review'
import Vehicle from './components/Vehicle'



function App() {
  

  return (
    <>
    <Navbar/>
      <Hero/>
      <Vehicle/>
      <Destinations/>
      <Gallery/>
      <Packages/>
      <About/>
      <Review/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
