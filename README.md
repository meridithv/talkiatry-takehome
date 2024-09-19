# Talkiatry Take-Home / Meridith Mathews

Hello team! This app processes customer orders based on daily market prices for three items: Balloons, stuffed animals, and crayon boxes. It calculates how many items a customer can buy with their available credits, applies any applicable rebate offers, and returns a summary of the shipment and remaining credits to STDOUT.

Thank you for your time and consideration!

## Installing and running the app

1. Ensure you have Node.js installed, then run:

```bash
npm install
```

2. Compile the TypeScript files into JavaScript:

```bash
npm run build
```

3. Run the app:

```bash
npm run start
```

## How to test

We use the Jest testing suite (with verbose settings turned on!). Future work could include a code coverage report.

```bash
npm run test
```

## Structure

**src/**: Contains the main source code.

**index.ts**: Entry point for running the program.

**services/fileReader.ts**: Reads order and price data from JSON files.

**services/processOrder.ts**: Core logic for processing orders.

**strategies/perkFactory.ts** and **strategies/perkStrategies.ts**: Manage rebate and bonus strategies.

**models.ts**: Defines TypeScript interfaces and enums for data models.

## Next steps

1. One future goal may be to handle **stacking perks**––which I'm going to call "recursive perks," for clarity, since you can already "stack" two free balloons with purchase + 10 percent off for six crayon boxes. The "recursive perk" would mean purchasing 25 stuffed animals > 5 bonus stuffed animals > the 5 bonus ones qualify you for a sixth. To handle this, we'd turn `applyPerks` into a loop. We'd keep track of any `newBonusItems` as we apply perks to a given order. We'd only break the loop of checking for/applying perks when we're out of newBonusItems.

2. If orders could specify **multiple SKUs**, we'd simply modify `processOrder` to loop through all items in the order (currently, it applies its logic to a single SKU). Each SKU would be processed independently, applying the correct rebates and calculating the total quantity and remaining credits for each item. We'd be thoughtful with the final JSON blob we returned, such that all the quantities of a given SKU would be aggregated, regardless of whether they were ordered normally or added as a bonus.
