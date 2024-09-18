export interface Order {
  customerId: number;
  sku: string;
  credits: number;
}

export interface PriceList {
  [sku: string]: number;
}

export interface Shipment {
  sku: string;
  quantity: number;
}

export interface OrderSummary {
  customerId: number;
  shipment: Shipment[];
  remainingCredits: number;
}
