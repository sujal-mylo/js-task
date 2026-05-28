// Some user records are incomplete. Build a profile-card formatter that never throws. 

// const users = [ 

//   { id: 1, name: "Aarav", address: { city: "Mumbai",    pincode: "400001" }, prefs: { theme: "dark"  } }, 

//   { id: 2, name: "Priya", address: { city: "Bengaluru"                  }                              }, 

//   { id: 3, name: "Rahul"                                                                               }, 

//   { id: 4, name: "Sneha", address: null, prefs: { theme: null }                                        }, 

// ]; 

  

// Build: formatProfile(user) returning a string like 

// "Aarav | Mumbai (400001) | theme: dark" 

// "Priya | Bengaluru (n/a) | theme: light"   <- light is the default 

// "Rahul | n/a (n/a) | theme: light" 

// "Sneha | n/a (n/a) | theme: light" 


//Solution

const users = [

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


// Formatter

const formatProfile = (user) => {

  const city =
    user.address?.city ?? "n/a";

  const pincode =
    user.address?.pincode ?? "n/a";

  const theme =
    user.prefs?.theme ?? "light";

  return `${user.name} | ${city} (${pincode}) | theme: ${theme}`;
};


// Outputs

users.forEach(user => {
  console.log(formatProfile(user));
});




// expected outputs
// Aarav | Mumbai (400001) | theme: dark

// Priya | Bengaluru (n/a) | theme: light

// Rahul | n/a (n/a) | theme: light

// Sneha | n/a (n/a) | theme: light