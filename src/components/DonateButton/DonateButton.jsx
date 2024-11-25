import "./DonateButton.scss";

const DonateButton = ({ name, style, textColor }) => {
  // Встановлюємо стиль за замовчуванням
  const defaultStyle = {
    background: 'var(--defaultBackground)', // Заміна на ваш бажаний фон за замовчуванням
    color: textColor || 'var(--white)', // Використовуємо переданий колір тексту або колір за замовчуванням
    ...style // Об'єднуємо зі стилем, що передається
  };

  return (
    <a 
      href="https://send.monobank.ua/jar/2hCXsaKDaM" 
      className="btn"
		id="donate" 
      target="_blank" 
      rel="noopener noreferrer"
      style={defaultStyle} // Використовуємо об'єднаний стиль
    >
      <span className="transition"></span>
      <span className="gradient"></span>
      <span className="label">{name}</span>
    </a>
  );
};

export default DonateButton;
