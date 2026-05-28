

const orderTotal = (order) =>
  order.items.reduce(
    (sum, { qty, price }) =>
      sum + qty * price,
    0
  );


// 1. totalRevenue

export const totalRevenue = (orders) =>
  orders
    .filter(order =>
      order.status === "delivered"
    )
    .reduce(
      (sum, order) =>
        sum + orderTotal(order),
      0
    );


// 2. revenueByCustomer

export const revenueByCustomer = (orders) =>
  orders
    .filter(order =>
      order.status === "delivered"
    )
    .reduce((acc, order) => {

      const total = orderTotal(order);

      return {
        ...acc,
        [order.customer]:
          (acc[order.customer] || 0) + total
      };

    }, {});


// 3. topCustomer

export const topCustomer = (orders) => {

  const revenueMap =
    revenueByCustomer(orders);

  return Object.entries(revenueMap)
    .reduce((top, current) =>
      current[1] > top[1]
        ? current
        : top
    )[0];

};


// 4. uniqueSkusSold

export const uniqueSkusSold = (orders) =>
  new Set(
    orders
      .filter(order =>
        order.status === "delivered"
      )
      .flatMap(order =>
        order.items.map(
          item => item.sku
        )
      )
  );


// 5. averageOrderValue

export const averageOrderValue = (
  orders,
  status
) => {

  const filtered =
    orders.filter(
      order => order.status === status
    );

  if (!filtered.length) return 0;

  const total = filtered.reduce(
    (sum, order) =>
      sum + orderTotal(order),
    0
  );

  return total / filtered.length;

};



export const formatProfile = (user) => {

  const city =
    user.address?.city ?? "n/a";

  const pincode =
    user.address?.pincode ?? "n/a";

  const theme =
    user.prefs?.theme ?? "light";

  return `${user.name} | ${city} (${pincode}) | theme: ${theme}`;

}; 