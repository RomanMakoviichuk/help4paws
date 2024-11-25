import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer" id='footer'>
      <div className="footer__container">
        
        <div className="footer__about">
          <h3>Про нас</h3>
          <p>Ми прагнемо допомагати тваринам, забезпечуючи їх харчуванням, оселею та любов'ю. Приєднуйтесь до нас, щоб зробити світ кращим для кожної тварини!</p>
        </div>
        
        <div className="footer__links">
          <h3>Навігація</h3>
          <ul>
            <li><a href="https://send.monobank.ua/jar/2hCXsaKDaM" target='_blank'>Пожертвувати</a></li>
				<li><a href="#main">Головна</a></li>
				<li><a href="#news">Новини</a></li>
          </ul>
        </div>
        
        <div className="footer__social">
          <h3>Ми в соціальних мережах</h3>
          <div className="footer__social-links">
            <a href="https://www.facebook.com/artuzpig" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        
        <div className="footer__contact">
          <h3>Контакти</h3>
          <a href='tel: 380683344076'>Телефон: 068 334 40 76</a>
          <a href='mailto: sokhelp4paws@gmail.com'>Email: sokhelp4paws@gmail.com</a>
        </div>
        
      </div>
      <div className="footer__copyright">
        <p>&copy; {new Date().getFullYear()} Help4Paws. Всі права захищено.</p>
      </div>
    </footer>
  );
};

export default Footer;
