// You're given a messy orders dataset. Transform it into a clean summary report. 

// Dummy data: 

// const orders = [ 

//   { id: "o1", customer: "Aarav",  items: [{ sku: "K01", qty: 1, price: 1500 }, { sku: "M01", qty: 2, price: 800 }], status: "delivered" }, 

//   { id: "o2", customer: "Priya",  items: [{ sku: "N01", qty: 5, price:  120 }],                                     status: "pending"   }, 

//   { id: "o3", customer: "Rahul",  items: [{ sku: "P01", qty: 3, price:   25 }, { sku: "K01", qty: 1, price: 1500 }], status: "delivered" }, 

//   { id: "o4", customer: "Aarav",  items: [{ sku: "M01", qty: 1, price:  800 }],                                     status: "cancelled" }, 

//   { id: "o5", customer: "Sneha",  items: [{ sku: "N01", qty: 2, price:  120 }, { sku: "P01", qty: 4, price:   25 }], status: "delivered" }, 

// ]; 

// Build these functions: 

// 1. totalRevenue(orders)             -> only "delivered" orders, summed 

// 2. revenueByCustomer(orders)         -> { Aarav: 3100, Rahul: 1575, ... } 

// 3. topCustomer(orders)               -> name of highest spender 

// 4. uniqueSkusSold(orders)            -> Set of SKUs from delivered orders 

// 5. averageOrderValue(orders, status) -> mean order total for given status 

  

// Expected results with above data: 

// totalRevenue(orders)        -> 1500 + 1600 + 75 + 1500 + 240 + 100 = 5015 

// topCustomer(orders)         -> "Aarav"  (3100) 

// uniqueSkusSold(orders)      -> Set { "K01", "M01", "N01", "P01" } 

// averageOrderValue(orders, "delivered") -> 5015 / 3 ≈ 1671.67 




// solution

const orders = [

  {
    id: "o1",
    customer: "Aarav",
    items: [
      { sku: "K01", qty: 1, price: 1500 },
      { sku: "M01", qty: 2, price: 800 }
    ],
    status: "delivered"
  },

  {
    id: "o2",
    customer: "Priya",
    items: [
      { sku: "N01", qty: 5, price: 120 }
    ],
    status: "pending"
  },

  {
    id: "o3",
    customer: "Rahul",
    items: [
      { sku: "P01", qty: 3, price: 25 },
      { sku: "K01", qty: 1, price: 1500 }
    ],
    status: "delivered"
  },

  {
    id: "o4",
    customer: "Aarav",
    items: [
      { sku: "M01", qty: 1, price: 800 }
    ],
    status: "cancelled"
  },

  {
    id: "o5",
    customer: "Sneha",
    items: [
      { sku: "N01", qty: 2, price: 120 },
      { sku: "P01", qty: 4, price: 25 }
    ],
    status: "delivered"
  },

];


// Helper -> calculate total of one order
const orderTotal = (order) =>
  order.items.reduce(
    (sum, { qty, price }) => sum + qty * price,
    0
  );


// 1. totalRevenue(orders)

const totalRevenue = (orders) =>
  orders
    .filter(order => order.status === "delivered")
    .reduce(
      (sum, order) => sum + orderTotal(order),
      0
    );


// 2. revenueByCustomer(orders)

const revenueByCustomer = (orders) =>
  orders
    .filter(order => order.status === "delivered")
    .reduce((acc, order) => {

      const total = orderTotal(order);

      return {
        ...acc,
        [order.customer]:
          (acc[order.customer] || 0) + total
      };

    }, {});


// 3. topCustomer(orders)

const topCustomer = (orders) => {

  const revenueMap = revenueByCustomer(orders);

  return Object.entries(revenueMap).reduce(
    (top, current) =>
      current[1] > top[1] ? current : top
  )[0];

};


// 4. uniqueSkusSold(orders)

const uniqueSkusSold = (orders) =>
  new Set(
    orders
      .filter(order => order.status === "delivered")
      .flatMap(order =>
        order.items.map(item => item.sku)
      )
  );


// 5. averageOrderValue(orders, status)

const averageOrderValue = (orders, status) => {

  const filtered = orders.filter(
    order => order.status === status
  );

  if (filtered.length === 0) return 0;

  const total = filtered.reduce(
    (sum, order) => sum + orderTotal(order),
    0
  );

  return total / filtered.length;

};


// Outputs

console.log(
  "Total Revenue:",
  totalRevenue(orders)
);

console.log(
  "Revenue By Customer:",
  revenueByCustomer(orders)
);

console.log(
  "Top Customer:",
  topCustomer(orders)
);

console.log(
  "Unique SKUs Sold:",
  uniqueSkusSold(orders)
);

console.log(
  "Average Delivered Order Value:",
  averageOrderValue(orders, "delivered")
);




// Expected output

// Total Revenue: 5015

// Revenue By Customer:
// {
//   Aarav: 3100,
//   Rahul: 1575,
//   Sneha: 340
// }

// Top Customer: Aarav

// Unique SKUs Sold:
// Set { 'K01', 'M01', 'P01', 'N01' }

// Average Delivered Order Value:
// 1671.6666666666667