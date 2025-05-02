import type { Order } from './order.js';

/**
 * Simulerer at sende en ordre til en RabbitMQ-kø
 * @param order Ordredata der skal sendes
 */
export function sendToQueue(order: Order) {
  console.log(`Sending to RabbitMQ: ${JSON.stringify(order)}`);
}
