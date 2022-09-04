import express from "express";
import { pizzaMargherita, pizzaSalami } from "./TestPizzas";
import { PlaceOrderResponse } from "./models/PlaceOrderDto";
import { v4 as uuidv4 } from "uuid";

const app = express();
app.use(express.json());

const port = 3001;

const pastOrders: PlaceOrderResponse[] = [
  {
    orderId: "a367772a-eda3-4057-95f9-a26a83b15f62",
    orderItems: [pizzaMargherita],
    customer: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
    },
    orderDate: "2022-09-04T07:58:49.098Z",
  },
  {
    orderId: "49ab46a0-acdf-4845-8a6f-b50eb2e8ecb0",
    orderItems: [pizzaMargherita, pizzaSalami],
    customer: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@test.com",
    },
    orderDate: "2022-09-02T13:58:49.098Z",
  },
];

app.get("/api/pizzas", (req, res) => {
  res.send([
    {
      name: "Margherita",
      description: "Plain and boring",
      unitPrice: 10,
      isAvailable: true,
    },
    {
      name: "Salami",
      description: "Nice and spicy!",
      unitPrice: 12,
      isAvailable: true,
    },
    {
      name: "Hawaii",
      description: "Really???",
      unitPrice: 11,
      isAvailable: false,
    },
    {
      name: "Pesto Burratina",
      description: "Wood-fired thin crust deliciousness",
      unitPrice: 15,
      isAvailable: true,
    },
  ]);
});

app.get("/api/orders", (req, res) => {
  res.send(pastOrders);
});

app.post("/api/orders", (req, res) => {
  const newOrder = { ...req.body, orderId: uuidv4() } as PlaceOrderResponse;
  pastOrders.push(newOrder);
  res.send(newOrder);
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
