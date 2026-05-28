// Exercise 1 — Closure Quiz (predict the output) 

// Snippet A 

for (var i = 0; i < 3; i++) { 
  setTimeout(() => console.log("A:", i), 0); 
} 

// Output? -> A: 3, A: 3, A: 3   (var is function-scoped) 

// Snippet B 

for (let i = 0; i < 3; i++) { 
  setTimeout(() => console.log("B:", i), 0); 
} 

// Output? -> B: 0, B: 1, B: 2   (let is block-scoped) 

// Snippet C 

function makeCounter() { 
  let count = 0; 
  return () => ++count; 
} 

const c = makeCounter(); 
console.log(c(), c(), c());     // -> 1 2 3 

// Snippet D 

const obj = { 
  value: 42, 
  arrow:   () => this.value, 
  regular: function () { return this.value; }, 
}; 

console.log(obj.arrow());       // -> undefined 
console.log(obj.regular());     // -> 42 