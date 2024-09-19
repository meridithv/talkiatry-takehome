import { readOrders, readPrices } from "./services/fileReader";
import { processOrder } from "./services/processOrder";
import { Order, PriceList, PurchaseSummary } from "./models";

const main = () => {
  try {
    const orders: Order[] = readOrders("data/orders.json");
    const prices: PriceList = readPrices("data/prices.json");

    orders.forEach((order) => {
      const result: PurchaseSummary = processOrder(order, prices);
      console.log(JSON.stringify(result, null, 2));
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Unknown error occurred");
    }
  }
};

main();
