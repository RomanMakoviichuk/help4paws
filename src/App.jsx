import Hero from "./sections/hero/Hero"
import Navbar from "./sections/navbar/Navbar"
import ContactUs from "./sections/contactus/ContactUs"
import News from "./components/News/News"
import Footer from "./sections/footer/footer"



function App() {

  return (
    <>
     <Navbar />
	  <Hero />
	  <News />
	  <ContactUs />
	  <Footer />
    </>
  )
}

export default App
