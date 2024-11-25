import express from 'express';
import fetch from 'node-fetch';
import 'dotenv/config'
import cors from 'cors';

const app = express();
const PORT = 5000;

// Настройка CORS для разрешения заголовка X-Token
app.use(cors({
  origin: 'http://localhost:5173',  // Укажите ваш клиентский URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['X-Token', 'Content-Type'],
}));

app.get('/api/client-info', async (req, res) => {
  try {
    const response = await fetch('https://api.monobank.ua/personal/client-info', {
      headers: {
        'X-Token': process.env.REACT_APP_MONOBANK_TOKEN,
      },
		
    });
    const data = await response.json();
	 console.log(data)
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

   //  const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});


console.log(process.env.REACT_APP_MONOBANK_TOKEN)