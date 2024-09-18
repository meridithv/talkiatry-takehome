import { readOrders, readPrices } from "./fileReader";
import { processOrder } from "./processOrder";

const main = () => {
  try {
    const orders = readOrders();
    const prices = readPrices();

    orders.forEach((order) => {
      const shipment = processOrder(order, prices);
      console.log(JSON.stringify(shipment, null, 2));
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
};

main();
