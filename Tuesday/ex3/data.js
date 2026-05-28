// Orders Data

export const orders = [

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
  }

];



// Users Data

export const users = [

  {
    id: 1,
    name: "Aarav",
    address: {
      city: "Mumbai",
      pincode: "400001"
    },
    prefs: {
      theme: "dark"
    }
  },

  {
    id: 2,
    name: "Priya",
    address: {
      city: "Bengaluru"
    }
  },

  {
    id: 3,
    name: "Rahul"
  },

  {
    id: 4,
    name: "Sneha",
    address: null,
    prefs: {
      theme: null
    }
  }

];