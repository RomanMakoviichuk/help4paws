import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import dog from '../../assets/dog.png'; 
import "./ContactUs.scss"

function HelpForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '+380',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const phoneValue = value.replace(/\D/g, '').slice(0, 12);
      setFormData((prevData) => ({
        ...prevData,
        phone: `+380${phoneValue.slice(3)}`,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const phoneRegex = /^\+380\d{9}$/;

    if (!phoneRegex.test(formData.phone)) {
      alert('Введіть коректний номер телефону у форматі +380123456789');
      return;
    }

    emailjs
      .send(
			import.meta.env.VITE_GMAIL_SERVICE_ID, 
			import.meta.env.VITE_GMAIL_TEMPLATE_ID, 
        formData,
        import.meta.env.VITE_GMAIL_PUBLIC_KEY 
      )
      .then(
        (response) => {
          alert('Форма успішно надіслана!');
          setFormData({ name: '', phone: '+380', message: '' });
        },
        (error) => {
          alert('Сталася помилка при відправці форми:', error.text);
        }
      );
  };

  return (

		<div className="form wrapper" id='form'>
			
			<div className="form-container">
				
				<form onSubmit={handleSubmit} className='aboutus' data-aos="fade-right">
				<h2 className='form__title'>Можеш допомогти чимось ще?</h2>
					<div className="form-group">
						<label htmlFor="name">Введіть Ваше ім'я</label>
						<input
							type="text"
							id="name"
							name="name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="phone">Введіть Ваш номер телефону</label>
						<input
							type="text"
							id="phone"
							name="phone"
							value={formData.phone}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="form-group">
						<label htmlFor="textarea">Напишіть чим зможете допомогти</label>
						<textarea
							name="message"
							id="textarea"
							rows="10"
							cols="50"
							value={formData.message}
							onChange={handleChange}
							required
						/>
					</div>

					<button className="form-submit-btn" type="submit">
						Надіслати
					</button>
				</form>
				<img className="form-pic" src={dog} alt="image" data-aos="fade-left" />
    		</div>
		</div>
    
  );
}

export default HelpForm;
