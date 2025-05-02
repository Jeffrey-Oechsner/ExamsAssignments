import express from 'express';
import { sendToQueue } from './rabbitmq.ts';
import { Order } from './order.ts';


const app = express();
app.use(express.json());

/**
 * Endpoint til at placere en ordre
 * @route POST /order
 */
app.post('/order', (req, res) => {
  const order: Order = req.body;
  sendToQueue(order);
  res.status(200).send('Order received and sent to queue');
});

app.listen(4000, () => console.log('API running on port 4000'));
