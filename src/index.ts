import { readOrders, readPrices } from "./fileReader";
import { processOrder } from "./processOrder";
import { Order, PriceList, PurchaseSummary } from "./models";

const main = () => {
  try {
    const orders: Order[] = readOrders();
    const prices: PriceList = readPrices();

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
