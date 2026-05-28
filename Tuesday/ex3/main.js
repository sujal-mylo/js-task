import {
  orders,
  users
} from "./data.js";

import {
  totalRevenue,
  revenueByCustomer,
  topCustomer,
  uniqueSkusSold,
  averageOrderValue,
  formatProfile
} from "./analytics.js";



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
  averageOrderValue(
    orders,
    "delivered"
  )
);



console.log("\nFormatted Profiles:\n");

users.forEach(user => {
  console.log(
    formatProfile(user)
  );
});