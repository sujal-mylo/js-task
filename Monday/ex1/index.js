// Given Code
var users = [ 
  { name: "Aarav",  age: 22, city: "Mumbai"   }, 
  { name: "Priya",  age: 27, city: "Bengaluru" }, 
  { name: "Rahul",  age: 31, city: "Delhi"    } 
]; 

function describe(user) { 
  return user.name + ", aged " + user.age + ", lives in " + user.city + "."; 
} 

for (var i = 0; i < users.length; i++) { 
  console.log(describe(users[i])); 
} 

// Modified code 

const users = [
  { name: "Aarav", age: 22, city: "Mumbai" },
  { name: "Priya", age: 27, city: "Bengaluru" },
  { name: "Rahul", age: 31, city: "Delhi" }
];

const describe = ({ name, age, city }) =>
  `${name}, aged ${age}, lives in ${city}.`;

users.forEach(user => console.log(describe(user)));