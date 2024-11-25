import { useEffect } from "react";
import "./Hero.scss";
import heroImage from "../../assets/main.jpg";
import monobank from "../../assets/banka.png";
import Aos from "aos";
import "aos/dist/aos.css";
import { useJarBalance } from "../../hooks/BankStatement";
import DonateButton from "../../components/DonateButton/DonateButton";

const Hero = () => {
	const balance = useJarBalance();
	useEffect(() => {
   	Aos.init({ duration: 1000 });
	}, []);

  return (
    <section className="hero" id="main">
      <div className="hero__container wrapper">
        <div className="hero__left">
          <img src={heroImage} alt="hero" data-aos="fade-right" />
        </div>

        <div className="hero__right" data-aos="fade-left">
          <h1>Друзі, давайте допоможемо хвостикам разом!</h1>
          <p>Благодійний збір на утримання безпритульних собак Сокирянського притулку.</p>
          <div className="monobank-info">
            <span className="monobank-title">Наша копілочка</span>
            <h2 className="monobank-count">
              {balance !== null ? `${balance} ₴` : "Завантаження..."}
            </h2>
            <img className="monobank-image" src={monobank} alt="monobank" />
				<DonateButton name="допомогти" style={{ background: 'var(--black)' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

