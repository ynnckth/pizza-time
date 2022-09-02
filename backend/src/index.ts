import express from 'express';

const app = express();
const port = 3001;

app.get('/api/pizzas', (req, res) => {
  res.send([
    {
      name: 'Margherita',
      description: 'Plain and boring',
      unitPrice: 10,
      isAvailable: true,
    },
    {
      name: 'Salami',
      description: 'Nice and spicy!',
      unitPrice: 12,
      isAvailable: true,
    },
    {
      name: 'Hawaii',
      description: 'Really???',
      unitPrice: 11,
      isAvailable: false,
    },
    {
      name: 'Pesto Burratina',
      description: 'Wood-fired thin crust deliciousness',
      unitPrice: 15,
      isAvailable: true,
    },
  ]);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
})