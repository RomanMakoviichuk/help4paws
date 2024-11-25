import { useState, useEffect } from "react";
import "./Navbar.scss";
import Logo from "../../assets/logo.svg";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const Navbar = () => {
  const [showNav, setShowNav] = useState(false);
  const [hideHeader, setHideHeader] = useState(false); // Додаємо стан для приховування навбару
  const [lastScroll, setLastScroll] = useState(0);
  const defaultOffset = 200;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > lastScroll && currentScroll > defaultOffset) {
        setHideHeader(true); // Ховаємо навбар при скролі вниз
      } else if (currentScroll < lastScroll) {
        setHideHeader(false); // Показуємо навбар при скролі вгору
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Очищаємо обробник події
  }, [lastScroll]);

  return (
    <header className={`navbar ${hideHeader ? "hide" : ""}`}>
      <nav className="navbar__container wrapper">
        <a href="#" className="navbar__logo" onClick={() => setShowNav(false)}>
          <img src={Logo} alt="logo" />
        </a>

        <ul className={`${showNav ? "show" : ""}`}>
          <li onClick={() => setShowNav(false)}><a href="#main">Головна</a></li>
			 <li onClick={() => setShowNav(false)}><a href="#footer">Контакти</a></li>
          <li onClick={() => setShowNav(false)}><a href="#form">Співпраця</a></li>
          <li onClick={() => setShowNav(false)}><a href="#news">Новини</a></li>
			 <li onClick={() => setShowNav(false)}><a href="https://send.monobank.ua/jar/2hCXsaKDaM" target="_blank">Допомогти</a></li>
        </ul>

        <div className="navbar__socials">
          <a href="https://www.facebook.com/artuzpig" target="_blank">
            <FaFacebook />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="tel:+380683344076">
            <FiPhone />
          </a>
        </div>

        <div className="navbar__menu" onClick={() => setShowNav(!showNav)}>
          {showNav ? <IoMdClose /> : <CiMenuFries />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
