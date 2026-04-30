const note = (definition, example, interviewQuestion, takeaway, badges = []) => ({
  eyebrow: "Interview prep",
  definition,
  example,
  interviewQuestion,
  takeaway,
  badges,
});

export const NOTES = {
  "var / let / const - scoping rules": {
    title: "The Holy Trinity: var, let, and const",
    eyebrow: "Masterclass: Scoping & Hoisting",
    quickAnswer:
      "var is function-scoped and hoisted with undefined. let and const are block-scoped and exist in the Temporal Dead Zone (TDZ) until initialized.",
    definition:
      "Scoping defines where a variable is accessible. var follows the old 'Function Scope' rule, while let and const (introduced in ES6) follow 'Block Scope', making code more predictable and less buggy.",
    why: "Predictability. Using var leads to 'Hoisting bugs' where variables are accessible before they are defined. let and const prevent this by locking variables inside { curly braces } and throwing errors if used too early.",
    analogy: "Think of **'var'** like a local **Town Crier**—everyone in the town (function) can hear him even if he hasn't officially started his speech. Think of **'let'** and **'const'** like a **Secure Locker**—you can't even touch the door until you have the key (the line where it's defined).",
    table: {
      headers: ["Feature", "var", "let", "const"],
      rows: [
        ["Scope", "Function Scope", "Block Scope", "Block Scope"],
        ["Hoisting", "Yes (undefined)", "Yes (TDZ)", "Yes (TDZ)"],
        ["Redeclare", "Allowed", "Forbidden", "Forbidden"],
        ["Reassign", "Allowed", "Allowed", "Forbidden"],
      ],
    },
    example: `
// 1. The Scoping Trap
if (true) {
  var townCrier = "I am everywhere!";
  let locker = "I am hidden!";
}
console.log(townCrier); // "I am everywhere!" (Leaked out!)
// console.log(locker); // ReferenceError (Safe!)

// 2. The Temporal Dead Zone (TDZ)
// console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 10; 

// 3. The Constant Rule
const API_KEY = "SECRET";
// API_KEY = "NEW"; // TypeError: Assignment to constant variable.
`,
    juniorVsSenior: `
// ❌ JUNIOR: Using var in loops (Classic Bug)
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3
}

// ✅ SENIOR: Using let in loops (Creates a new binding per iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 0, 1, 2
}
`,
    interviewQuestion: "What is the Temporal Dead Zone (TDZ) and why does it exist?",
    answer: "The TDZ is the period between the start of the block and the variable's declaration. It exists to prevent the use of uninitialized variables, which leads to more robust and debuggable code.",
    followUp: "Can you change the properties of an object declared with const?",
    takeaway: "Always use const by default. Use let only if you must reassign. Delete var from your vocabulary.",
    badges: ["Basics", "Scoping", "ES6+"],
  },
  "Hoisting and Temporal Dead Zone": {
    title: "Hoisting & The Temporal Dead Zone (TDZ)",
    eyebrow: "💎 Masterclass: Execution Context",
    quickAnswer:
      "Hoisting is JS registering declarations before running code. var is initialized as undefined, but let/const stay in the 'Temporal Dead Zone' (TDZ) until their line is reached.",
    definition:
      "In the 'Creation Phase', JS scans code and puts variable/function names into memory. During the 'Execution Phase', it runs line-by-line. Hoisting is this memory registration. TDZ is the safety window where a variable is registered but not yet 'alive'.",
    why: "Hoisting allows functions to be called before they appear in code, but with variables, it creates 'Invisible State' bugs. The TDZ was added in ES6 to force developers to write cleaner, more predictable code.",
    analogy:
      "Think of **'var'** like a **Town Crier**—he starts shouting his presence as soon as he enters the town (scope), even if he hasn't officially started his speech (definition). Think of **'let/const'** like a **High-Security Locker**—the locker exists (hoisted), but the door is laser-locked (TDZ). If you try to touch it before the key (definition line) arrives, the alarm (ReferenceError) goes off.",
    table: {
      headers: ["Keyword", "Hoisted?", "Initial Value", "Accessing Early?"],
      rows: [
        ["var", "✅ Yes", "undefined", "Safe (but buggy)"],
        ["let", "✅ Yes", "None (Uninitialized)", "🚨 ReferenceError (TDZ)"],
        ["const", "✅ Yes", "None (Uninitialized)", "🚨 ReferenceError (TDZ)"],
        ["function", "✅ Yes", "Actual Function", "✅ Fully Callable"],
        ["Arrow Fn", "Depends", "Same as let/var", "🚨 Not Callable early"],
      ],
    },
    example: `
// 1. The "Undefined" Trap (var)
console.log(crier); // undefined
var crier = "Hear ye, hear ye!";

// 2. The "Laser-Locked" Safety (let)
// console.log(locker); // 🚨 ReferenceError: Cannot access 'locker' before initialization
let locker = "Safe & Sound";

// 3. Function Hoisting (The exception)
shout(); // "HEARING!" (Functions move to the top!)
function shout() { console.log("HEARING!"); }
`,
    juniorVsSenior: `
// ❌ JUNIOR: Relying on hoisting
calculateTotal(); // Calling before definition works, but is confusing
var price = 100;
function calculateTotal() { 
  console.log(price * 1.1); // NaN (price is hoisted as undefined!)
}

// ✅ SENIOR: Defining before Use (TDZ Awareness)
const TAX_RATE = 1.1;
const getPrice = () => 100;

const calculateFinal = () => {
  const total = getPrice() * TAX_RATE;
  console.log(total); // 110 (Predictable & Safe)
};
calculateFinal();
`,
    interviewQuestion: "If let and const are hoisted, why do we get a ReferenceError instead of undefined?",
    answer:
      "They are hoisted (registered in memory), but JavaScript places them in the 'Temporal Dead Zone'. This means they are in an 'uninitialized' state. Accessing an uninitialized variable is a fatal error in JS, whereas var is automatically initialized to undefined during hoisting.",
    followUp: "Can you trigger a TDZ error inside a function using parameters?",
    takeaway: "Hoisting is memory registration. TDZ is the safety guard. Always define variables at the top of their scope to avoid the 'Invisible State' trap.",
    badges: ["Memory Management", "Execution Phase", "Advanced Scoping"],
  },
  "Closures and Lexical Scope": {
    title: "Closures and Lexical Scope",
    eyebrow: "Interview prep",
    quickAnswer:
      "A closure is a function that remembers variables from its outer scope even after the outer function has finished running.",
    answer:
      "A closure happens when an inner function remembers variables from the scope where it was created. In the counter example, createCounter finishes running, but the returned increment function still remembers count. Every time we call counter(), it updates the same private count variable. That is the core idea behind private state and many callback patterns.",
    definition:
      "A closure is the combination of a function and the lexical environment in which that function was created. Lexical scope means inner functions can access variables from their parent scopes based on code position.",
    why:
      "Closures are one of the most important JavaScript concepts because they explain how functions remember data, how private variables work, and why async callbacks can access outer variables later.",
    table: {
      headers: ["Concept", "Meaning", "Interview point"],
      rows: [
        ["Lexical scope", "Scope is based on where code is written", "Not where a function is called"],
        ["Closure", "Function remembers outer variables", "Works even after outer function returns"],
        ["Private state", "Outer variable is hidden from outside code", "Useful for counters and factories"],
        ["Common pitfall", "Closures remember variables, not snapshots", "Can create stale or shared-value bugs"],
      ],
    },
    example: `
function createCounter() {
  let count = 0;

  return function increment() {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3
`,
    interviewQuestion: "What is a closure in JavaScript, and can you give a real example?",
    followUp: "Does a closure store a copy of the variable, or does it keep access to the same variable reference?",
    takeaway:
      "Closures let functions remember outer variables. Lexical scope is based on where the function is created, not where it is called.",
    badges: ["Core JS", "Closures", "Lexical Scope", "Private State"],
  },
  "Prototype chain and Inheritance": {
    title: "Prototype chain and Inheritance",
    eyebrow: "Interview prep",
    quickAnswer:
      "JavaScript inheritance works through prototypes. If a property is missing on an object, JavaScript looks up the prototype chain until it finds it or reaches null.",
    answer:
      "JavaScript inheritance works through delegation. When we access dog.eats, JavaScript first checks dog. If eats is not directly on dog, it checks dog's prototype, which is animal in the example. Since animal has eats, JavaScript returns true. That is prototype inheritance: reuse through lookup, not copying.",
    definition:
      "The prototype chain is a linked chain of objects used for property lookup. Each object can have an internal prototype, and JavaScript delegates missing property access up that chain.",
    why:
      "This matters because classes in JavaScript are syntactic sugar over prototypes. Interviewers ask this to check if you understand how objects, methods, inheritance, and property lookup actually work under the hood.",
    table: {
      headers: ["Concept", "Meaning", "Interview point"],
      rows: [
        ["Own property", "Exists directly on the object", "Checked first"],
        ["Prototype property", "Exists on the prototype object", "Used through delegation"],
        ["Prototype chain", "Linked lookup path", "Stops at null"],
        ["class", "Cleaner syntax over prototypes", "Not classical inheritance internally"],
      ],
    },
    example: `
const animal = {
  eats: true,
};

const dog = Object.create(animal);
dog.barks = true;

console.log(dog.barks); // true
console.log(dog.eats); // true
console.log(Object.hasOwn(dog, "eats")); // false
console.log(dog.toString); // found higher in the chain
`,
    interviewQuestion: "How does JavaScript inheritance work through the prototype chain? Can you explain with an example?",
    followUp: "What is the difference between an object's own property and a property inherited from its prototype?",
    takeaway:
      "JavaScript inheritance is delegation, not copying. Missing properties are searched through the prototype chain until found or null is reached.",
    badges: ["Core JS", "Prototype", "Inheritance", "Objects"],
  },
  "this keyword - all 4 binding rules": {
    title: "this keyword - all 4 binding rules",
    eyebrow: "Interview prep",
    quickAnswer:
      "For regular functions, this depends on how the function is called: default, implicit, explicit, or new binding. Arrow functions use lexical this.",
    answer:
      "For regular functions, this is decided by the call-site. In user.sayName(), this points to user because the function is called through user. But if we store user.sayName in a variable and call say(), the object is lost, so this becomes undefined in strict mode. call, apply, or bind can set this explicitly. Arrow functions do not have their own this.",
    definition:
      "this is a runtime value that points to the execution context of a function call. Its value depends on the call-site for regular functions, while arrow functions use lexical this.",
    why:
      "This matters because bugs with this appear in callbacks, event handlers, class methods, object methods, and React code. Interviewers use this topic to test whether you understand call-site behavior.",
    table: {
      headers: ["Rule", "Example", "this points to"],
      rows: [
        ["Default binding", "fn()", "global object or undefined in strict mode"],
        ["Implicit binding", "obj.fn()", "object before the dot"],
        ["Explicit binding", "fn.call(user)", "provided object"],
        ["new binding", "new User()", "newly created object"],
        ["Arrow function", "() => this.name", "surrounding lexical this"],
      ],
    },
    example: `
const user = {
  name: "Aman",
  sayName() {
    console.log(this.name);
  },
};

user.sayName(); // Aman

const say = user.sayName;
say(); // undefined in strict mode

say.call(user); // Aman

const arrowSay = () => console.log(this.name);
arrowSay.call(user); // still does not use user as this
`,
    interviewQuestion: "How is the value of this decided in JavaScript? Can you explain the four binding rules?",
    followUp: "Why does assigning an object method to a variable often lose its this value?",
    takeaway:
      "For regular functions, this comes from the call-site. For arrow functions, this comes from the surrounding lexical scope.",
    badges: ["Core JS", "this", "Binding Rules", "Call Site"],
  },
  "call / apply / bind": {
    title: "call / apply / bind",
    eyebrow: "Interview prep",
    quickAnswer:
      "call and apply run a function immediately with a chosen this. bind returns a new function with this fixed for later use.",
    answer:
      "call, apply, and bind all explicitly set this. call runs immediately with comma-separated arguments. apply also runs immediately, but takes arguments as an array. bind does not run immediately; it returns a new function with this and optional preset arguments. In the example, introduce.call(user) runs now, while introduce.bind(user) creates a reusable function for later.",
    definition:
      "call, apply, and bind are Function prototype methods used for explicit this binding. call and apply execute immediately, while bind creates a new bound function for later execution.",
    why:
      "This matters because these methods help reuse functions with different objects, borrow methods, preset arguments, and fix lost this problems in callbacks. They are also a common bridge between understanding this and writing reliable event or class-style code.",
    table: {
      headers: ["Method", "Runs immediately?", "Arguments style", "Returns"],
      rows: [
        ["call", "Yes", "Comma-separated", "Function result"],
        ["apply", "Yes", "Array-like", "Function result"],
        ["bind", "No", "Comma-separated preset values", "New function"],
      ],
    },
    example: `
function introduce(city, role) {
  return this.name + " from " + city + " works as " + role;
}

const user = { name: "Aman" };

console.log(introduce.call(user, "Delhi", "Developer"));
console.log(introduce.apply(user, ["Delhi", "Developer"]));

const introAman = introduce.bind(user, "Delhi");
console.log(introAman("Developer"));

const numbers = [5, 2, 9];
console.log(Math.max.apply(null, numbers)); // 9
`,
    interviewQuestion: "What is the difference between call, apply, and bind? Can you give a practical example?",
    followUp: "When would you use bind instead of call or apply?",
    takeaway:
      "call and apply execute immediately; bind returns a reusable function. Use call for normal args, apply for arrays, and bind for later execution.",
    badges: ["Core JS", "this", "call apply bind", "Functions"],
  },
  "Arrow functions vs regular functions": {
    title: "Arrow functions vs regular functions",
    eyebrow: "Interview prep",
    quickAnswer:
      "Arrow functions have lexical this and cannot be constructors. Regular functions have dynamic this and work well as methods or constructors.",
    answer:
      "Arrow functions are shorter, but they are not just shorter regular functions. An arrow function does not have its own this, arguments, super, or new.target, and it cannot be used as a constructor. A regular function gets this from how it is called, so it works well as an object method. In the example, user.regular() prints Aman, but user.arrow() prints undefined.",
    definition:
      "An arrow function is a shorter function syntax with lexical this. A regular function creates its own this depending on the call-site and has its own arguments object.",
    why:
      "This matters because arrow functions are great for callbacks, array methods, and preserving this, but regular functions are better for object methods, constructors, and cases where dynamic this is required.",
    table: {
      headers: ["Feature", "Arrow function", "Regular function"],
      rows: [
        ["this", "Lexical from outer scope", "Dynamic from call-site"],
        ["arguments", "Not available directly", "Has its own arguments"],
        ["constructor", "Cannot be used with new", "Can be used with new"],
        ["methods", "Usually not ideal", "Good for object methods"],
        ["syntax", "Shorter", "More explicit"],
      ],
    },
    example: `
const user = {
  name: "Aman",
  regular() {
    console.log(this.name);
  },
  arrow: () => {
    console.log(this.name);
  },
};

user.regular(); // Aman
user.arrow(); // undefined

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5
`,
    interviewQuestion: "What is the difference between arrow functions and regular functions? Can you show a this-related example?",
    followUp: "Why should arrow functions usually not be used as object methods?",
    takeaway:
      "Use arrow functions for callbacks and lexical this. Use regular functions when you need dynamic this, arguments, or constructor behavior.",
    badges: ["Core JS", "Arrow Functions", "this", "Functions"],
  },
  "Event Loop - call stack, task queue, microtask queue": {
    title: "Event Loop - call stack, task queue, microtask queue",
    eyebrow: "Interview prep",
    quickAnswer:
      "JavaScript runs sync code first. When the call stack is empty, microtasks like Promises run before macrotasks like setTimeout.",
    answer:
      "JavaScript is single-threaded, so the event loop decides when async callbacks run. First, synchronous code runs on the call stack. After the stack is empty, JavaScript clears the microtask queue, such as Promise callbacks. Only after that does it run macrotasks like setTimeout. That is why Promise logs before setTimeout even with zero delay.",
    definition:
      "The event loop is a mechanism that manages execution of synchronous and asynchronous code using the call stack, task queue (macrotasks), and microtask queue.",
    why:
      "Without the event loop, JavaScript would block on every async operation like API calls or timers. The event loop enables non-blocking behavior and keeps the UI responsive.",
    example: `
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise"));

console.log("End");

// Output:
// Start
// End
// Promise
// Timeout
`,
    interviewQuestion: "Explain the execution order of setTimeout vs Promise in JavaScript.",
    followUp: "Why do microtasks run before macrotasks? What problems can excessive microtasks cause?",
    takeaway: "Call stack first -> microtasks -> macrotasks. Promises always run before setTimeout.",
    badges: ["Async JS", "Event Loop", "Interview Favorite"],
  },
  "Callbacks and Callback Hell": {
    title: "Callbacks and Callback Hell",
    eyebrow: "Interview prep",
    quickAnswer:
      "A callback is a function passed to another function to run later. Callback hell happens when callbacks are deeply nested and hard to read.",
    definition:
      "A callback is a function passed as an argument and executed later, often after async work finishes. Callback hell is the messy pyramid structure created by nesting many async callbacks.",
    why:
      "Callbacks are the foundation of async JavaScript. Interviewers ask this to check if you understand async flow, readability problems, and why Promises and async/await were introduced.",
    example: `
getUser(1, (user) => {
  getPosts(user.id, (posts) => {
    getComments(posts[0].id, (comments) => {
      console.log(comments);
    });
  });
});
`,
    interviewQuestion: "What is callback hell, and how do you avoid it?",
    answer:
      "Callback hell is when async callbacks are nested inside each other, making the code hard to read, test, and handle errors. In the example, each next operation depends on the previous callback, so the code grows sideways. We avoid it by naming functions, returning early, or using Promises and async/await for flatter control flow.",
    followUp: "Why is error handling harder in nested callbacks?",
    takeaway: "Callbacks run later; callback hell happens when too many async steps are nested.",
    badges: ["Async JS", "Callbacks", "Readability"],
  },
  "Promises - then / catch / finally": {
    title: "Promises - then / catch / finally",
    eyebrow: "Interview prep",
    quickAnswer:
      "A Promise represents async work. then handles success, catch handles failure, and finally runs cleanup in both cases.",
    definition:
      "A Promise is an object that represents a future value. It can be pending, fulfilled, or rejected, and it lets us chain async work using then, catch, and finally.",
    why:
      "Promises make async code easier to compose than callbacks. They also provide a standard way to handle success, errors, cleanup, and async chaining.",
    example: `
fetch("/api/user")
  .then((response) => response.json())
  .then((user) => console.log(user.name))
  .catch((error) => console.error(error))
  .finally(() => console.log("Request finished"));
`,
    interviewQuestion: "What do then, catch, and finally do in a Promise chain?",
    answer:
      "then runs when the Promise is fulfilled and receives the resolved value. catch runs when the Promise rejects or an earlier then throws an error. finally runs after success or failure, so it is useful for cleanup like hiding a loader. In the example, finally runs whether fetch succeeds or fails.",
    followUp: "What happens if you return a Promise inside a then callback?",
    takeaway: "then is for success, catch is for errors, and finally is for cleanup.",
    badges: ["Async JS", "Promises", "Error Handling"],
  },
  "Promise.all / allSettled / race / any": {
    title: "Promise.all / allSettled / race / any",
    eyebrow: "Interview prep",
    quickAnswer:
      "Use all when every task must succeed, allSettled when you need every result, race for the first settled result, and any for the first success.",
    definition:
      "Promise combinators run multiple Promises together and return a new Promise based on a specific success or failure rule.",
    why:
      "They are important because real apps often fetch multiple resources in parallel. Choosing the right combinator controls speed, error handling, and partial failure behavior.",
    example: `
const [user, posts] = await Promise.all([
  fetchUser(),
  fetchPosts(),
]);

const results = await Promise.allSettled([
  fetchProfile(),
  fetchSettings(),
]);
`,
    interviewQuestion: "When would you use Promise.all, allSettled, race, and any?",
    answer:
      "I use Promise.all when all requests are required, like loading user and posts together. I use allSettled when I need every outcome even if some fail. I use race when the first settled result matters, like a timeout pattern. I use any when I only need the first successful result and can ignore failures until all fail.",
    followUp: "What is the difference between Promise.race and Promise.any?",
    takeaway: "Choose the combinator based on failure policy: all, all results, first settled, or first success.",
    badges: ["Async JS", "Promises", "Parallel Work"],
  },
  "async / await and error handling": {
    title: "async / await and error handling",
    eyebrow: "Interview prep",
    quickAnswer:
      "async/await is cleaner Promise syntax. await pauses inside an async function, and try/catch handles rejected Promises.",
    definition:
      "An async function always returns a Promise. await waits for a Promise to settle and gives back the fulfilled value or throws the rejection as an error.",
    why:
      "async/await makes async code easier to read because it looks top-to-bottom. It also makes error handling feel similar to synchronous code with try/catch.",
    example: `
async function loadUser() {
  try {
    const user = await fetchUser();
    console.log(user.name);
  } catch (error) {
    console.error("Failed to load user", error);
  } finally {
    console.log("Done");
  }
}
`,
    interviewQuestion: "Why is async/await easier to read than Promise chains, and how do you handle errors?",
    answer:
      "async/await makes async code read like normal sequential code. Instead of chaining multiple then calls, I can await each Promise and use try/catch for failures. In the example, if fetchUser rejects, control jumps to catch. finally still runs, which is useful for cleanup like stopping a loading state.",
    followUp: "How do you run multiple await operations in parallel instead of one by one?",
    takeaway: "async/await improves readability, but it still uses Promises under the hood.",
    badges: ["Async JS", "async await", "Error Handling"],
  },
  "Generators and iterators": {
    title: "Generators and iterators",
    eyebrow: "Interview prep",
    quickAnswer:
      "An iterator produces values one by one with next(). A generator is a special function that creates an iterator using yield.",
    definition:
      "An iterator is an object with a next method that returns { value, done }. A generator function uses function* and yield to pause and resume execution while producing iterator values.",
    why:
      "Generators are useful for lazy sequences, custom iteration, controlled execution, and understanding how JavaScript iteration protocols work.",
    example: `
function* createIds() {
  yield 1;
  yield 2;
  yield 3;
}

const ids = createIds();

console.log(ids.next()); // { value: 1, done: false }
console.log(ids.next()); // { value: 2, done: false }
console.log(ids.next()); // { value: 3, done: false }
console.log(ids.next()); // { value: undefined, done: true }
`,
    interviewQuestion: "What is the difference between an iterator and a generator?",
    answer:
      "An iterator is the protocol: it has a next method that returns value and done. A generator is a convenient way to create an iterator. In the example, createIds does not run all at once. Each next call resumes the function until the next yield, so values are produced lazily one at a time.",
    followUp: "Why are generators considered lazy?",
    takeaway: "Iterators define how to get the next value; generators make iterators easy to write.",
    badges: ["Core JS", "Iterators", "Generators"],
  },
  "Web APIs: setTimeout, fetch, localStorage": {
    title: "Web APIs: setTimeout, fetch, localStorage",
    eyebrow: "Interview prep",
    quickAnswer:
      "setTimeout schedules delayed work, fetch makes HTTP requests, and localStorage stores small string data in the browser.",
    definition:
      "Web APIs are browser-provided features outside the JavaScript language itself. JavaScript can call them for timers, network requests, storage, DOM access, and more.",
    why:
      "This matters because async JavaScript often depends on browser APIs. The JavaScript engine runs code, but the browser provides APIs like timers, fetch, and storage.",
    example: `
setTimeout(() => {
  console.log("Runs later");
}, 1000);

const response = await fetch("/api/user");
const user = await response.json();

localStorage.setItem("theme", "dark");
console.log(localStorage.getItem("theme")); // dark
`,
    interviewQuestion: "What are Web APIs in JavaScript, and how do setTimeout, fetch, and localStorage fit in?",
    answer:
      "Web APIs are features provided by the browser, not the core JavaScript language. setTimeout is a timer API, fetch is a network API, and localStorage is a storage API. JavaScript calls these APIs, and async results like timer callbacks or fetch resolutions are coordinated back through the event loop.",
    followUp: "Is setTimeout part of JavaScript itself or provided by the browser/runtime?",
    takeaway: "JavaScript is the language; Web APIs are runtime features provided by the browser.",
    badges: ["Browser APIs", "Timers", "Fetch", "Storage"],
  },
  "Destructuring (arrays, objects, nested)": {
    title: "Destructuring (arrays, objects, nested)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Destructuring extracts values from arrays or objects into variables. It makes code cleaner, especially when reading props, API data, or function parameters.",
    definition:
      "Destructuring is JavaScript syntax that unpacks values from arrays or properties from objects into named variables. It can also support defaults, renaming, and nested extraction.",
    why:
      "It is common in modern JavaScript and React. Interviewers check if you can read and write clean code without repeatedly accessing the same object paths.",
    example: `
const user = {
  name: "Aman",
  address: {
    city: "Delhi",
  },
};

const {
  name,
  address: { city },
} = user;

const numbers = [10, 20, 30];
const [first, second] = numbers;

console.log(name, city); // Aman Delhi
console.log(first, second); // 10 20
`,
    interviewQuestion: "What is destructuring in JavaScript, and where would you use it?",
    answer:
      "Destructuring lets me pull values from arrays or objects into variables in a clean way. In the example, I extract name and nested city from user, and first and second from an array. I use it often with function parameters, React props, API responses, and configuration objects. I avoid deep destructuring when the shape may be missing because it can throw errors.",
    followUp: "What can go wrong with deeply nested destructuring?",
    takeaway: "Use destructuring for clean extraction, but keep it readable and safe when data may be missing.",
    badges: ["ES6", "Destructuring", "Clean Code"],
  },
  "Spread and Rest operators": {
    title: "Spread and Rest operators",
    eyebrow: "Interview prep",
    quickAnswer:
      "Spread expands values. Rest collects values. Same three dots, but the meaning depends on where you use it.",
    definition:
      "Spread syntax expands arrays, objects, or iterables into individual values. Rest syntax collects remaining arguments or properties into a single array or object.",
    why:
      "Spread and rest are used everywhere in modern JavaScript: copying arrays, updating objects immutably, merging data, collecting function arguments, and handling React props.",
    table: {
      headers: ["Syntax", "Purpose", "Example use"],
      rows: [
        ["Spread", "Expands values", "[...items, newItem]"],
        ["Spread", "Copies or merges", "{ ...user, active: true }"],
        ["Rest", "Collects function args", "function sum(...nums)"],
        ["Rest", "Collects remaining props", "const { id, ...rest } = user"],
      ],
    },
    example: `
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4];

const user = { name: "Aman", role: "dev" };
const updatedUser = { ...user, active: true };

function sum(...nums) {
  return nums.reduce((total, num) => total + num, 0);
}

console.log(moreNumbers); // [1, 2, 3, 4]
console.log(updatedUser); // { name: "Aman", role: "dev", active: true }
console.log(sum(1, 2, 3)); // 6
`,
    interviewQuestion: "What is the difference between spread and rest operators?",
    answer:
      "Spread expands values, while rest collects values. In the example, [...numbers, 4] spreads an array into a new array, and { ...user } spreads object properties into a new object. But in function sum(...nums), rest collects all arguments into the nums array. So the same ... syntax means expand or collect based on position.",
    followUp: "Does object spread create a deep copy or a shallow copy?",
    takeaway: "Spread expands; rest collects. Object and array spread are shallow copies.",
    badges: ["ES6", "Spread", "Rest", "Immutability"],
  },
  "Template literals and tagged templates": {
    title: "Template literals and tagged templates",
    eyebrow: "Interview prep",
    quickAnswer:
      "Template literals use backticks for interpolation and multiline strings. Tagged templates let a function process the string parts and values.",
    definition:
      "A template literal is a string syntax using backticks that supports ${} expressions and multiline text. A tagged template calls a function with the string segments and interpolated values.",
    why:
      "Template literals make string building cleaner. Tagged templates are less common, but useful for formatting, escaping, localization, styled components, and safe query builders.",
    example: `
const name = "Aman";
const role = "developer";

const message = "Hello, " + name + ". You are a " + role + ".";

function tag(strings, value) {
  return strings[0] + value.toUpperCase();
}

console.log(message); // Hello, Aman. You are a developer.
console.log(tag(["Hello, "], name)); // Hello, AMAN
`,
    interviewQuestion: "What are template literals and tagged templates in JavaScript?",
    answer:
      "Template literals are strings written with backticks. They support interpolation using ${} and multiline strings. Tagged templates go one step further: a function receives the string parts and values before producing the final output. In the example, the tag function transforms the interpolated name before returning the string.",
    followUp: "Where have you seen tagged templates used in real projects?",
    takeaway: "Template literals build strings cleanly; tagged templates let you customize how strings are built.",
    badges: ["ES6", "Strings", "Templates"],
  },
  "Optional chaining and Nullish coalescing": {
    title: "Optional chaining and Nullish coalescing",
    eyebrow: "Interview prep",
    quickAnswer:
      "Optional chaining safely reads nested values. Nullish coalescing gives a fallback only for null or undefined, not for valid falsey values like 0 or ''.",
    definition:
      "Optional chaining (?.) stops property access when the left side is null or undefined. Nullish coalescing (??) returns the right side only when the left side is null or undefined.",
    why:
      "These features prevent common runtime errors and avoid incorrect fallbacks when values like 0, false, or empty string are valid.",
    table: {
      headers: ["Operator", "Purpose", "Key behavior"],
      rows: [
        ["?.", "Safe access", "Stops on null or undefined"],
        ["??", "Safe fallback", "Only falls back on null or undefined"],
        ["||", "Truthy fallback", "Falls back on any falsey value"],
      ],
    },
    example: `
const user = {
  profile: {
    name: "",
    age: 0,
  },
};

const city = user.address?.city ?? "Unknown";
const name = user.profile.name ?? "Guest";
const age = user.profile.age ?? 18;

console.log(city); // Unknown
console.log(name); // ""
console.log(age); // 0
`,
    interviewQuestion: "Why is ?? different from ||, and when would you use optional chaining?",
    answer:
      "I use optional chaining when a nested object may be missing, like user.address?.city. It avoids Cannot read property errors. I use ?? when I only want a fallback for null or undefined. That is different from ||, because || would replace valid falsey values like 0 or an empty string. In the example, age stays 0 and name stays an empty string.",
    followUp: "Why can using || for default values create bugs?",
    takeaway: "Use ?. for safe access and ?? when false, 0, or '' should remain valid values.",
    badges: ["ES2020", "Optional Chaining", "Nullish"],
  },
  "Modules - import / export / dynamic import()": {
    title: "Modules - import / export / dynamic import()",
    eyebrow: "Interview prep",
    quickAnswer:
      "ES modules let files share code with import and export. Static imports load upfront; dynamic import() loads code later and returns a Promise.",
    definition:
      "An ES module is a JavaScript file that can export values and import values from other modules. dynamic import() is a function-like syntax for loading a module asynchronously.",
    why:
      "Modules keep code organized and reusable. Dynamic imports help performance by loading heavy code only when needed, such as routes, modals, editors, or charts.",
    example: `
// math.js
export function add(a, b) {
  return a + b;
}

// app.js
import { add } from "./math.js";

async function loadChart() {
  const chartModule = await import("./chart.js");
  chartModule.renderChart();
}
`,
    interviewQuestion: "What is the difference between static import and dynamic import()?",
    answer:
      "Static import is declared at the top level and is loaded as part of the module graph before code runs. It is best for code needed immediately. dynamic import() runs when called and returns a Promise, so it is useful for lazy loading. In the example, add is loaded statically, but chart.js loads only when loadChart runs.",
    followUp: "Why is dynamic import useful for code splitting?",
    takeaway: "Static import is upfront; dynamic import is lazy and Promise-based.",
    badges: ["ES Modules", "import export", "Lazy Loading"],
  },
  "Map, Set, WeakMap, WeakSet": {
    title: "Map, Set, WeakMap, WeakSet",
    eyebrow: "Interview prep",
    quickAnswer:
      "Map stores key-value pairs, Set stores unique values, and WeakMap/WeakSet store object references without preventing garbage collection.",
    definition:
      "Map is a collection of key-value pairs where keys can be any value. Set stores unique values. WeakMap and WeakSet only hold object keys/references weakly, so they do not prevent garbage collection.",
    why:
      "These collections solve common problems better than plain objects or arrays: flexible keys, uniqueness, fast lookup, private metadata, and memory-safe object association.",
    table: {
      headers: ["Collection", "Stores", "Best use"],
      rows: [
        ["Map", "Key-value pairs", "Flexible keys and frequent lookup"],
        ["Set", "Unique values", "Removing duplicates or membership checks"],
        ["WeakMap", "Weak object keys to values", "Private metadata for objects"],
        ["WeakSet", "Weak object references", "Tracking object membership"],
      ],
    },
    example: `
const ids = new Set([1, 2, 2, 3]);
console.log(ids); // Set { 1, 2, 3 }

const userRoles = new Map();
userRoles.set({ id: 1 }, "admin");

const metadata = new WeakMap();
const user = {};
metadata.set(user, { lastLogin: "today" });
`,
    interviewQuestion: "When would you use Map, Set, WeakMap, or WeakSet?",
    answer:
      "I use Set when I need unique values, like removing duplicate IDs. I use Map when I need key-value pairs with keys that are not limited to strings. I use WeakMap when I want to attach metadata to objects without preventing garbage collection. WeakSet is similar, but only tracks whether an object exists in the set.",
    followUp: "Why are WeakMap keys not enumerable?",
    takeaway: "Map is for flexible key-value data, Set is for uniqueness, and weak collections are for memory-safe object references.",
    badges: ["ES6", "Collections", "Map Set", "WeakMap"],
  },
  "Symbol, Reflect, Proxy": {
    title: "Symbol, Reflect, Proxy",
    eyebrow: "Interview prep",
    quickAnswer:
      "Symbol creates unique property keys, Reflect exposes object operations as methods, and Proxy intercepts object behavior like get and set.",
    definition:
      "Symbol is a primitive value used for unique identifiers. Reflect is a built-in object with methods for common object operations. Proxy wraps an object and lets you intercept operations like reading, writing, deleting, or calling.",
    why:
      "These are advanced JavaScript tools used for metaprogramming, library design, validation, reactive systems, private-like keys, and custom object behavior.",
    table: {
      headers: ["Feature", "Purpose", "Simple use"],
      rows: [
        ["Symbol", "Unique key", "Avoid property name collisions"],
        ["Reflect", "Object operation methods", "Reflect.get, Reflect.set"],
        ["Proxy", "Intercept behavior", "Validate or observe get/set"],
      ],
    },
    example: `
const id = Symbol("id");

const user = {
  name: "Aman",
  [id]: 123,
};

const proxyUser = new Proxy(user, {
  get(target, key) {
    console.log("Reading", key);
    return Reflect.get(target, key);
  },
});

console.log(proxyUser.name); // Reading name, then Aman
`,
    interviewQuestion: "What are Symbol, Reflect, and Proxy used for in JavaScript?",
    answer:
      "Symbol is used when I need a unique property key that will not accidentally collide with normal string keys. Reflect gives method-based access to object operations like get and set. Proxy wraps an object and intercepts behavior. In the example, the proxy logs every property read and then uses Reflect.get to perform the default read.",
    followUp: "How can Proxy be used to build reactive state systems?",
    takeaway: "Symbol creates unique keys, Reflect performs object operations, and Proxy customizes object behavior.",
    badges: ["Advanced JS", "Symbol", "Proxy", "Metaprogramming"],
  },
  "map / filter / reduce / flatMap": {
    title: "map / filter / reduce / flatMap",
    eyebrow: "Interview prep",
    quickAnswer:
      "map transforms every item into a new array. filter returns a subset of items that pass a test. reduce collapses an array into a single value (number, object, etc.).",
    answer:
      "These are higher-order functions used for non-mutating array transformations. map always returns an array of the same length. filter returns an array of the same or shorter length. reduce is the most powerful because it can implement map and filter; it uses an accumulator to build a final result. flatMap is useful when your map function returns an array and you want to avoid nested arrays.",
    why: "Array transformations are the heart of data processing in JavaScript and React. Knowing when to use reduce vs map is a common senior-level interview filter.",
    table: {
      headers: ["Method", "Purpose", "Returns", "Original Array"],
      rows: [
        ["map", "Transform each element", "New array (same length)", "Unchanged"],
        ["filter", "Select elements", "New array (new length)", "Unchanged"],
        ["reduce", "Aggregate values", "Single value / Object / Array", "Unchanged"],
        ["flatMap", "Map and flatten", "Flattened new array", "Unchanged"],
      ],
    },
    example: `
const nums = [1, 2, 3, 4];

// map: square them
const squared = nums.map(n => n * n); // [1, 4, 9, 16]

// filter: only even
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// reduce: sum them
const sum = nums.reduce((acc, n) => acc + n, 0); // 10

// flatMap: split and flatten
const doubled = nums.flatMap(n => [n, n]); // [1, 1, 2, 2, 3, 3, 4, 4]
`,
    interviewQuestion: "Can you explain the difference between map, filter, and reduce? When would you use reduce over map?",
    followUp: "How would you implement a simple .map() using .reduce()?",
    takeaway: "Use map for 1:1 transformation, filter for selection, and reduce for complex aggregation.",
    badges: ["Arrays", "Functional", "ES6"],
  },
  "find / findIndex / some / every": {
    title: "find / findIndex / some / every",
    eyebrow: "Interview prep",
    quickAnswer:
      "find/findIndex return the first match. some/every return a boolean. All stop searching as soon as the result is determined (short-circuiting).",
    answer:
      "These methods are for searching and validation. find returns the actual element, while findIndex returns its position. some returns true if at least one element matches, whereas every requires all elements to match. They are more efficient than map/filter for searching because they stop as soon as they find a match.",
    why: "Efficiently searching arrays is critical for performance. Using find instead of filter[0] avoids unnecessary iteration over the rest of the array.",
    table: {
      headers: ["Method", "Result Type", "Early Exit?", "Use Case"],
      rows: [
        ["find", "Element value", "Yes (on first match)", "Get a specific object"],
        ["findIndex", "Number (index)", "Yes (on first match)", "Update or delete by index"],
        ["some", "Boolean", "Yes (on first true)", "Check if any item exists"],
        ["every", "Boolean", "Yes (on first false)", "Validate all items"],
      ],
    },
    example: `
const users = [
  { id: 1, name: 'Aman', active: true },
  { id: 2, name: 'Rahul', active: false },
];

const user = users.find(u => u.id === 1); // { id: 1, ... }
const index = users.findIndex(u => u.id === 2); // 1

const hasInactive = users.some(u => !u.active); // true
const allActive = users.every(u => u.active); // false
`,
    interviewQuestion: "What is the difference between .find() and .filter()? Which one is better for finding a single unique item?",
    followUp: "What does .find() return if no element matches the condition?",
    takeaway: "Use find for values, findIndex for position, and boolean checks for existence/validation.",
    badges: ["Arrays", "Search", "Short-circuit"],
  },
  "Object.keys / values / entries / assign": {
    title: "Object.keys / values / entries / assign",
    eyebrow: "Interview prep",
    quickAnswer:
      "These are static methods on Object to iterate or merge properties. keys/values/entries return arrays of keys, values, or [key, value] pairs respectively.",
    answer:
      "Modern JS favors functional iteration. Since objects aren't directly iterable with array methods, we use Object.keys(), Object.values(), or Object.entries() to convert them into arrays. Object.assign() is used to merge multiple objects into a target object (shallowly).",
    why: "Handling data from APIs often requires transforming objects into lists or merging configurations. These methods are the primary tools for those tasks.",
    table: {
      headers: ["Method", "Input", "Output Example", "Purpose"],
      rows: [
        ["Object.keys", "Object", "['name', 'age']", "Get all property names"],
        ["Object.values", "Object", "['Aman', 25]", "Get all property values"],
        ["Object.entries", "Object", "[['name', 'Aman']]", "Loop with key and value"],
        ["Object.assign", "Targets/Sources", "Merged Object", "Shallow copy or merge"],
      ],
    },
    example: `
const user = { name: 'Aman', role: 'dev' };

console.log(Object.keys(user));   // ['name', 'role']
console.log(Object.values(user)); // ['Aman', 'dev']

// Looping through entries
Object.entries(user).forEach(([key, value]) => {
  console.log(\`\${key}: \${value}\`);
});

const details = { city: 'Delhi' };
const fullUser = Object.assign({}, user, details);
`,
    interviewQuestion: "How do you iterate over a plain JavaScript object using modern methods?",
    followUp: "What is the difference between Object.assign and the spread operator (...) for merging objects?",
    takeaway: "Use entries for looping and spread/assign for merging. Remember these only handle own enumerable properties.",
    badges: ["Objects", "Iteration", "Static Methods"],
  },
  "Immutability patterns (spread, structuredClone)": {
    title: "Immutability patterns (spread, structuredClone)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Immutability means creating new copies instead of changing the original. Spread (...) is for shallow copies; structuredClone() is the modern way to deep-copy.",
    answer:
      "In React and Redux, we never mutate state directly. We use the spread operator to create a new object/array with updated values. However, spread is shallow—it only copies the first level. If you have nested objects, you need a deep clone. structuredClone() is a newer native browser API that handles deep cloning much better than JSON.parse/stringify.",
    why: "State management in modern frameworks depends on object identity. If you mutate a nested object, React might not detect the change and fail to re-render.",
    table: {
      headers: ["Pattern", "Type", "Complexity", "Handles Methods?"],
      rows: [
        ["Spread (...)", "Shallow", "Fast", "Yes"],
        ["Object.assign", "Shallow", "Fast", "Yes"],
        ["JSON parse/stringify", "Deep", "Slow/Risky", "No (removes functions)"],
        ["structuredClone", "Deep", "Reliable", "No"],
      ],
    },
    example: `
const original = { name: 'Aman', meta: { id: 1 } };

// Shallow Copy (Spread)
const shallow = { ...original };
shallow.meta.id = 2; // OOPS! original.meta.id is now 2 too!

// Deep Copy (Modern)
const deep = structuredClone(original);
deep.meta.id = 99; // original.meta.id stays 1
`,
    interviewQuestion: "Why is immutability important in React, and how do you deep clone an object safely?",
    followUp: "What are the limitations of using JSON.stringify for deep cloning?",
    takeaway: "Use spread for simple updates; use structuredClone or libraries like Immer for deep state.",
    badges: ["Immutability", "State", "Clone"],
  },
  "Sorting and custom comparators": {
    title: "Sorting and custom comparators",
    eyebrow: "Interview prep",
    quickAnswer:
      "sort mutates the array and uses string comparison by default. Use a comparator function (a, b) => a - b for numeric sorting.",
    answer:
      "The default .sort() method converts elements to strings and compares their UTF-16 code units. This causes [1, 10, 2] to sort as [1, 10, 2]. To sort numbers correctly, you must provide a comparator function. If the function returns a negative value, 'a' comes before 'b'. If positive, 'b' comes before 'a'. Since sort() mutates, always spread into a new array first if immutability matters.",
    why: "Sorting is a fundamental requirement for UI tables, lists, and search results. Misusing the default sort is a classic junior mistake.",
    table: {
      headers: ["Case", "Comparator", "Result"],
      rows: [
        ["Numbers (Asc)", "(a, b) => a - b", "1, 2, 10"],
        ["Numbers (Desc)", "(a, b) => b - a", "10, 2, 1"],
        ["Strings", "(a, b) => a.localeCompare(b)", "Alphabetical"],
        ["Objects", "(a, b) => a.price - b.price", "Sorted by key"],
      ],
    },
    example: `
const nums = [10, 1, 2];

// Correct numeric sort (immutable)
const sorted = [...nums].sort((a, b) => a - b); // [1, 2, 10]

// Sorting objects
const users = [{ age: 30 }, { age: 20 }];
users.sort((a, b) => a.age - b.age);
`,
    interviewQuestion: "How do you sort numbers correctly in JavaScript?",
    followUp: "How can you sort an array of objects by a property in a non-mutating way?",
    takeaway: "Always provide a comparator for numbers, and copy the array before sorting to avoid mutation.",
    badges: ["Sorting", "Comparator", "Mutation"],
  },
  "Math object and Date object": {
    title: "Math object and Date object",
    eyebrow: "Interview prep",
    quickAnswer:
      "Math is a static object for mathematical constants and functions. Date is a constructor for handling time and calendar dates.",
    answer:
      "For Math, common methods are floor, ceil, round, and random. For Dates, remember that months are 0-indexed (January is 0). In modern JS, it's often better to use Intl.DateTimeFormat for localization or libraries like Day.js for complex date arithmetic, as the native Date object is famously difficult to work with.",
    why: "Business Logic. Whether you're calculating pricing, generating random IDs, or handling time-zones for a global app, you will use these every single day.",
    table: {
      headers: ["Feature", "Math", "Date"],
      rows: [
        ["Type", "Static Object", "Constructor (new Date)"],
        ["Rounding", "floor/ceil/round", "N/A"],
        ["Randomization", "Math.random()", "N/A"],
        ["Parsing", "N/A", "Date.parse() / ISO strings"],
      ],
    },
    example: `
// Random integer between 1 and 10
const rand = Math.floor(Math.random() * 10) + 1;

// Date formatting (Modern)
const now = new Date();
const formatted = new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'full',
  timeStyle: 'short'
}).format(now);
`,
    interviewQuestion: "Why is new Date().getMonth() + 1 often used in JavaScript?",
    followUp: "How do you calculate the difference in days between two dates?",
    takeaway: "Always remember 0-indexed months. Use Math.floor for reliable random integers.",
    badges: ["Core JS", "Math", "Dates"],
  },
  "String methods (slice, substring, replace, includes, split)": {
    title: "String methods (slice, substring, replace, includes, split)",
    eyebrow: "Interview prep",
    quickAnswer:
      "JavaScript strings are immutable. Methods like slice, replace, and split return new strings without modifying the original.",
    answer:
      "Understanding the subtle differences between string methods is common in interviews. For example, slice() can take negative indices, while substring() cannot. replace() only replaces the first occurrence by default (unless using a global RegEx), and includes() is the modern alternative to indexOf() for existence checks.",
    why: "Data Manipulation. Almost every API response requires some level of string parsing—formatting names, extracting IDs from URLs, or cleaning user input.",
    table: {
      headers: ["Method", "Mutates?", "Negative Index?", "Best Use"],
      rows: [
        ["slice(s, e)", "No", "Yes", "General purpose extraction"],
        ["substring(s, e)", "No", "No", "Swaps s and e if s > e"],
        ["replace(a, b)", "No", "N/A", "Cleaning or templating"],
        ["split(d)", "No", "N/A", "Converting string to array"],
        ["trim()", "No", "N/A", "Cleaning whitespace"],
      ],
    },
    example: `
const url = "/users/123/profile";

// Extract ID
const id = url.split('/')[2]; // "123"

// Slice with negative index
const lastPart = url.slice(-7); // "profile"

// Replace (case-insensitive)
const clean = "Hello World".replace(/world/i, "Nexus");
`,
    interviewQuestion: "What is the difference between .slice() and .substring() in JavaScript?",
    followUp: "How do you replace all occurrences of a word without using replaceAll()?",
    takeaway: "Strings are immutable. Always assign the result of a method to a new variable.",
    badges: ["Core JS", "Strings", "Immutability"],
  },
  "JSON - stringify, parse, and serialization": {
    title: "JSON - stringify, parse, and serialization",
    eyebrow: "Interview prep",
    quickAnswer:
      "JSON is a standard text-based format for representing structured data. parse converts strings to objects; stringify converts objects to strings.",
    answer:
      "Serialization is the process of converting an object into a string for storage or transmission. A common interview 'gotcha' is that JSON.stringify ignores functions and undefined values. It also cannot handle circular references. However, you can pass a 'replacer' function to stringify to customize the output.",
    why: "API Communication. JSON is the language of the web. Understanding its limitations (like losing Date objects or functions) is key to avoiding mysterious bugs when sending data to a server.",
    table: {
      headers: ["Feature", "JSON.parse", "JSON.stringify"],
      rows: [
        ["Input", "String", "Object / Array"],
        ["Output", "Object / Array", "String"],
        ["Errors", "Throws on bad syntax", "Returns undefined on bad inputs"],
        ["Use Case", "Receiving API data", "Sending API data / Storage"],
      ],
    },
    example: `
const user = { 
  name: "Aman", 
  role: undefined, // ignored
  login: () => {} // ignored
};

const str = JSON.stringify(user); // '{"name":"Aman"}'

// Deep cloning (Classic hack)
const clone = JSON.parse(JSON.stringify(user));
`,
    interviewQuestion: "What happens to a function inside an object when you call JSON.stringify() on it?",
    followUp: "Can JSON.stringify() handle circular references?",
    takeaway: "JSON is data-only. No functions, no undefined. Use a replacer/reviver for complex types.",
    badges: ["JSON", "Serialization", "Data"],
  },
  "RegEx basics and common patterns": {
    title: "RegEx basics and common patterns",
    eyebrow: "Interview prep",
    quickAnswer:
      "Regular Expressions (RegEx) are patterns used to match character combinations in strings. They are essential for validation and parsing.",
    answer:
      "RegEx in JS is handled via the RegExp object or literal syntax /pattern/. Key flags include 'g' (global), 'i' (case-insensitive), and 'm' (multi-line). Common use cases include validating emails, phone numbers, or extracting specific tokens from a large body of text.",
    why: "Security and Validation. You should never trust user input. RegEx is your first line of defense to ensure data follows the expected format before it hits your database.",
    table: {
      headers: ["Symbol", "Meaning", "Example"],
      rows: [
        ["^", "Start of string", "^abc"],
        ["$", "End of string", "xyz$"],
        ["[a-z]", "Character range", "[0-9] (digits)"],
        ["+", "1 or more", "\\d+ (one or more digits)"],
        ["?", "Optional (0 or 1)", "https?"],
      ],
    },
    example: `
// Email validation (simple)
const emailRegex = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
console.log(emailRegex.test("aman@nexus.com")); // true

// Extracting numbers from string
const str = "ID: 456, Price: 99";
const matches = str.match(/\\d+/g); // ["456", "99"]
`,
    interviewQuestion: "How do you check if a string contains only numeric characters using RegEx?",
    followUp: "What is the difference between the .test() and .match() methods?",
    takeaway: "Use .test() for simple booleans and .match() to extract data.",
    badges: ["RegEx", "Validation", "Security"],
  },
  "querySelector / querySelectorAll": {
    title: "querySelector / querySelectorAll",
    eyebrow: "Interview prep",
    quickAnswer:
      "querySelector returns the first matching element. querySelectorAll returns a static NodeList of all matching elements. Both use CSS selector syntax.",
    answer:
      "These are the modern standard for DOM selection. querySelector is great for unique elements or the first of a kind. querySelectorAll returns a NodeList which, unlike the live HTMLCollection returned by older methods like getElementsByClassName, is static (it doesn't auto-update if the DOM changes). You can use forEach directly on a NodeList in modern browsers.",
    why: "Consistency. Before these, we had to mix getElementById, getElementsByClassName, and tag selectors. CSS selectors provide a single, powerful way to find anything.",
    table: {
      headers: ["Method", "Returns", "Live/Static", "Syntax"],
      rows: [
        ["querySelector", "Single Element", "N/A", "CSS ('.class', '#id')"],
        ["querySelectorAll", "NodeList", "Static", "CSS ('.class', '#id')"],
        ["getElementById", "Single Element", "N/A", "ID only ('id')"],
        ["getElementsByClassName", "HTMLCollection", "Live", "Class only ('class')"],
      ],
    },
    example: `
// Find one
const submitBtn = document.querySelector('#submit-btn');

// Find many
const inputs = document.querySelectorAll('input[type="text"]');

inputs.forEach(input => {
  console.log(input.value);
});
`,
    interviewQuestion: "What is the difference between a NodeList and an HTMLCollection? When is querySelector better than getElementById?",
    followUp: "Can you use array methods like .map() or .filter() directly on a NodeList?",
    takeaway: "Use querySelector for flexibility and NodeLists for predictable, static collections.",
    badges: ["DOM", "Selectors", "NodeList"],
  },
  "Event delegation and bubbling / capturing": {
    title: "Event delegation and bubbling / capturing",
    eyebrow: "Interview prep",
    quickAnswer:
      "Event delegation is a pattern where you attach one listener to a parent to handle events on its children using 'event bubbling'. Bubbling goes up; Capturing goes down.",
    answer:
      "When an event happens, it first 'captures' down from the window to the target, then 'bubbles' back up. Delegation takes advantage of bubbling: instead of adding 100 listeners to 100 buttons, you add one to the <div> containing them. When a button is clicked, the event bubbles up to the div, where you can check event.target to see which button was clicked.",
    why: "Memory and Performance. Adding thousands of event listeners can slow down the browser and cause memory leaks. Delegation is the most efficient way to handle dynamic content.",
    table: {
      headers: ["Phase", "Direction", "Standard Use", "Stop with?"],
      rows: [
        ["Capturing", "Window -> Target", "Rarely used", "e.stopPropagation()"],
        ["Target", "At the element", "The trigger point", "N/A"],
        ["Bubbling", "Target -> Window", "Default for listeners", "e.stopPropagation()"],
      ],
    },
    example: `
const list = document.querySelector('#user-list');

// One listener for all list items (even future ones!)
list.addEventListener('click', (e) => {
  const item = e.target.closest('li');
  if (item) {
    console.log('Clicked user ID:', item.dataset.id);
  }
});
`,
    interviewQuestion: "Explain event delegation. Why is it better than attaching listeners to individual items?",
    followUp: "What is the difference between event.target and event.currentTarget?",
    takeaway: "Use delegation for performance and handling dynamic elements. Understand bubbling to control event flow.",
    badges: ["Events", "Delegation", "Bubbling"],
  },
  "Custom events and dispatchEvent": {
    title: "Custom events and dispatchEvent",
    ...note(
      "CustomEvent lets you create your own event with detail data, and dispatchEvent triggers it on a target node.",
      "node.dispatchEvent(new CustomEvent('save', { detail: { id: 1 } }));",
      "When would you use a custom event instead of a direct function call?",
      "Use custom events when you want loose coupling between DOM parts or widgets.",
      ["CustomEvent", "Dispatch", "Decoupling"],
    ),
  },
  "IntersectionObserver, MutationObserver": {
    title: "IntersectionObserver, MutationObserver",
    eyebrow: "Interview prep",
    quickAnswer:
      "IntersectionObserver detects when an element enters/leaves the viewport (useful for lazy loading). MutationObserver detects changes to the DOM tree (useful for widgets).",
    answer:
      "These are high-performance alternatives to scroll listeners and polling. IntersectionObserver lets you trigger actions (like loading an image) only when the user actually sees the element. MutationObserver watches for added/removed nodes or attribute changes, which is great for building libraries that need to react to DOM changes they don't control.",
    why: "Scroll events fire hundreds of times per second and can cause 'jank'. Observers are handled by the browser efficiently and only fire when the specific condition is met.",
    table: {
      headers: ["Observer", "Triggers On", "Common Use Case", "Performance"],
      rows: [
        ["Intersection", "Visibility/Viewport", "Lazy loading, Infinite scroll", "Excellent"],
        ["Mutation", "DOM structure change", "Tracking widget updates", "Good"],
        ["Resize", "Element size change", "Responsive components", "Excellent"],
      ],
    },
    example: `
// Lazy load images
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(el => observer.observe(el));
`,
    interviewQuestion: "How would you implement infinite scrolling without using a scroll event listener?",
    followUp: "When would you need to use MutationObserver over a simple state change in React?",
    takeaway: "Use Observers for performance-critical DOM monitoring instead of expensive event listeners.",
    badges: ["Performance", "DOM", "Observers"],
  },
  "Crypto & Security (Hashing, Encryption)": {
    title: "Crypto & Security (Hashing, Encryption)",
    eyebrow: "Interview prep",
    quickAnswer:
      "The crypto module provides cryptographic functionality that includes a set of wrappers for OpenSSL's hash, HMAC, cipher, decipher, sign, and verify functions.",
    answer:
      "Hashing (like SHA-256) is a one-way process used for verifying data integrity. Encryption (like AES-256) is two-way and requires a key to decrypt. In Node.js, you should always use 'scrypt' or 'pbkdf2' for password hashing because they are designed to be slow and resistant to brute-force attacks.",
    why: "Data Privacy. Handling user passwords or sensitive data requires more than just 'hiding' it. You need mathematically secure algorithms to protect your users from data breaches.",
    table: {
      headers: ["Type", "Algorithm", "Reversible?", "Use Case"],
      rows: [
        ["Hash", "SHA-256", "No", "Checksums, ID generation"],
        ["Password Hash", "scrypt / Argon2", "No", "Storing Passwords"],
        ["Cipher", "AES-256-GCM", "Yes", "Sensitive Data Storage"],
      ],
    },
    example: `
const crypto = require('crypto');

// Simple Hashing
const hash = crypto.createHash('sha256').update('password').digest('hex');

// Secure Password Hashing (Async)
crypto.scrypt('password', 'salt', 64, (err, derivedKey) => {
  if (err) throw err;
  console.log(derivedKey.toString('hex'));
});
`,
    interviewQuestion: "What is a 'salt' and why is it important in password hashing?",
    followUp: "What is the difference between Hashing and Encryption?",
    takeaway: "Never store plain-text passwords. Use scrypt or bcrypt with a unique salt per user.",
    badges: ["Security", "Cryptography", "Backend"],
  },
  "Fetch API + AbortController": {
    title: "Fetch API + AbortController",
    eyebrow: "Interview prep",
    quickAnswer:
      "fetch() is the modern way to make network requests. AbortController allows you to cancel a request if it's no longer needed (e.g., component unmounted).",
    answer:
      "fetch() returns a Promise that resolves to a Response object. Crucially, it doesn't reject on HTTP errors like 404 or 500—you must check response.ok. AbortController is essential for preventing 'race conditions' in search inputs or clearing up requests when a user navigates away from a page.",
    why: "Modern apps are network-heavy. Knowing how to fetch data safely, handle errors, and cancel stale requests is a fundamental skill for any frontend developer.",
    table: {
      headers: ["Feature", "Fetch API", "XMLHttpRequest (Old)", "Axios"],
      rows: [
        ["Syntax", "Promise-based", "Callback-based", "Promise-based"],
        ["Error Handling", "Manual (response.ok)", "Manual", "Automatic for HTTP errors"],
        ["Cancellation", "AbortController", "xhr.abort()", "CancelToken / Abort"],
        ["JSON handling", "Manual (.json())", "Manual", "Automatic"],
      ],
    },
    example: `
const controller = new AbortController();

async function getData() {
  try {
    const res = await fetch('/api/data', { signal: controller.signal });
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return data;
  } catch (err) {
    if (err.name === 'AbortError') console.log('Fetch cancelled');
    else console.error(err);
  }
}

// Cancel it later
// controller.abort();
`,
    interviewQuestion: "Does fetch() reject on a 404 error? How do you cancel a fetch request?",
    followUp: "What is a race condition in the context of multiple fetch requests?",
    takeaway: "Always check response.ok and use AbortController to manage request lifecycles.",
    badges: ["Network", "Fetch", "Async"],
  },
  "Module pattern, IIFE": {
    title: "Module pattern, IIFE",
    ...note(
      "An IIFE creates a private scope immediately, and the module pattern returns a public API while keeping internals hidden.",
      "(function () { const secret = 1; })();",
      "What is the module pattern, and why was it used before ES modules?",
      "It is a closure-based way to keep private state and expose only what callers need.",
      ["Encapsulation", "Closure", "Legacy pattern"],
    ),
  },
  "Pure functions and side effects": {
    title: "Pure functions and side effects",
    eyebrow: "Interview prep",
    quickAnswer:
      "A pure function always gives the same output for the same input and has NO side effects (doesn't modify global variables, fetch data, or log to console).",
    answer:
      "Purity is about predictability. A pure function is deterministic—you can call it 100 times with '2, 2' and you'll always get '4'. Side effects are anything 'outside' the function: updating a database, changing a global object, or even console.log. In React, we strive for pure components and pure state updates because they make testing and debugging trivial.",
    why: "Predictability. Pure functions are easy to move around, easy to test (no mocks needed), and enable advanced features like memoization and time-travel debugging.",
    table: {
      headers: ["Feature", "Pure Function", "Impure Function"],
      rows: [
        ["Predictability", "100% Deterministic", "Depends on outside state"],
        ["Side Effects", "None", "Modifies outside world"],
        ["Testing", "Very easy", "Requires mocks/setup"],
        ["Caching", "Safe to memoize", "Unsafe to memoize"],
      ],
    },
    example: `
// Pure
const add = (a, b) => a + b;

// Impure (Side Effect)
let total = 0;
const addToTotal = (a) => {
  total += a; // Modifies global state
  return total;
};

// Impure (External Dependency)
const getTime = () => new Date().getTime(); // Output changes every call
`,
    interviewQuestion: "What is a pure function? Why do we care about them in React?",
    followUp: "Is console.log a side effect? Why?",
    takeaway: "Keep logic pure for easier testing and fewer bugs. Extract side effects to the boundaries of your app.",
    badges: ["Functional", "Predictability", "State"],
  },
  "Currying and partial application": {
    title: "Currying and partial application",
    ...note(
      "Currying transforms a function into chained single-argument steps, while partial application preloads some arguments and leaves the rest.",
      "const add = a => b => a + b;",
      "What is the difference between currying and partial application?",
      "Currying changes the function shape; partial application just presets some arguments.",
      ["Functional JS", "Arguments", "Reuse"],
    ),
  },
  "Memoization": {
    title: "Memoization",
    eyebrow: "Interview prep",
    quickAnswer:
      "Memoization is a specific form of caching. It stores the result of expensive function calls and returns the cached result when the same inputs occur again.",
    answer:
      "Memoization trades memory for speed. It's only useful for 'pure' deterministic functions. In JS, we often use a Map or an object as a cache. In React, we have useMemo and useCallback which handle this internally to prevent expensive re-calculations on every render.",
    why: "Performance. If you have a function that takes 500ms to run (like calculating a Fibonacci number), memoizing it can reduce subsequent calls to 0ms.",
    table: {
      headers: ["Pros", "Cons"],
      rows: [
        ["Drastic speed improvement", "Increased memory usage"],
        ["Reduces CPU load", "Cache invalidation complexity"],
        ["Stable references", "Overhead of checking the cache"],
      ],
    },
    example: `
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensive = (n) => n * n; // Imagine this was slow
const memoized = memoize(expensive);
`,
    interviewQuestion: "What is memoization? Can you write a simple memoize helper function?",
    followUp: "When should you NOT use memoization?",
    takeaway: "Use memoization for expensive, pure computations. Don't use it for cheap functions as the cache check overhead might be slower.",
    badges: ["Optimization", "Caching", "Performance"],
  },
  "Error handling - try/catch/finally, custom errors": {
    title: "Error handling - try/catch/finally, custom errors",
    eyebrow: "Interview prep",
    quickAnswer:
      "try blocks contain risky code. catch handles errors. finally runs regardless. Custom errors (extending Error) help identify specific failure types.",
    answer:
      "Modern error handling isn't just about stopping crashes; it's about recovery. finally is critical for 'cleanup' (closing files, stopping loaders). Extending the base Error class allows you to create specific errors like 'ValidationError' or 'ApiError', which you can then check for using 'instanceof' in your catch block.",
    why: "Reliability. Users expect apps to handle network failures or bad input gracefully without the whole UI turning blank.",
    table: {
      headers: ["Block", "Purpose", "Frequency"],
      rows: [
        ["try", "Execute risky logic", "Always required"],
        ["catch", "Handle the exception", "Usually required"],
        ["finally", "Cleanup (loaders, connections)", "Optional but recommended"],
        ["throw", "Trigger a manual error", "When logic fails"],
      ],
    },
    example: `
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  const user = {};
  if (!user.name) throw new ValidationError("Name is required");
} catch (err) {
  if (err instanceof ValidationError) {
    console.warn("User error:", err.message);
  } else {
    console.error("System error:", err);
  }
} finally {
  console.log("Validation attempt complete");
}
`,
    interviewQuestion: "What is the purpose of the finally block? Why would you create a custom Error class?",
    followUp: "How do you catch errors in an async function?",
    takeaway: "Always clean up in finally. Use custom errors to distinguish between user mistakes and system failures.",
    badges: ["Errors", "Stability", "Best Practices"],
  },
  "Debounce and Throttle": {
    title: "Debounce and Throttle",
    eyebrow: "Interview prep",
    quickAnswer:
      "Debounce triggers a function only AFTER a period of inactivity. Throttle triggers it at most once every X milliseconds. Both prevent excessive executions.",
    answer:
      "These are 'rate-limiting' techniques. Debounce is perfect for search inputs—you don't want to hit the API on every single keystroke, only when the user stops typing for 300ms. Throttle is perfect for scroll or resize events—you want to update the UI at a steady rate, but not 100 times per second.",
    why: "Performance and API Costs. Without these, rapid events can overwhelm the CPU or exceed API rate limits, causing the app to feel sluggish or break.",
    table: {
      headers: ["Technique", "Best for...", "Wait Behavior"],
      rows: [
        ["Debounce", "Search, Auto-save", "Resets timer on every call"],
        ["Throttle", "Scroll, Resize, Games", "Ignores calls until time elapses"],
      ],
    },
    example: `
// Debounce: Wait 300ms after last call
const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

// Throttle: Max once every 500ms
const throttle = (fn, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};
`,
    interviewQuestion: "What is the difference between debouncing and throttling? Give a real-world example for each.",
    followUp: "What happens to the calls made during the 'limit' period in a throttled function?",
    takeaway: "Debounce for 'at the end'; Throttle for 'at a steady rate'.",
    badges: ["Performance", "Events", "Optimization"],
  },
  "useState - state updates, functional updater, batching": {
    title: "useState - state updates, functional updater, batching",
    eyebrow: "Interview prep",
    quickAnswer:
      "useState lets you add state to functional components. State updates are asynchronous and batched by React for performance. Use functional updates if the next state depends on the previous one.",
    answer:
      "When you call the state setter, React doesn't update the variable immediately—it schedules a re-render. If you call it multiple times in the same event handler, React 'batches' them into a single update. Functional updaters (e.g., setCount(c => c + 1)) are critical when you need to perform multiple updates or when your logic depends on the absolute latest state, avoiding 'stale closures'.",
    why: "State is the engine of React. Misunderstanding how it updates leads to bugs where UI doesn't reflect data correctly, or performance issues from excessive re-renders.",
    table: {
      headers: ["Feature", "Direct Update", "Functional Update"],
      rows: [
        ["Syntax", "setCount(count + 1)", "setCount(c => c + 1)"],
        ["Stale State", "Vulnerable", "Safe"],
        ["Multiple calls", "Only last one wins", "All are applied"],
        ["Use case", "Simple overwrites", "Counters, Toggles, Lists"],
      ],
    },
    example: `
function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // These will only increment by 1 total due to batching/stale scope
    setCount(count + 1);
    setCount(count + 1);

    // This will correctly increment by 2
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  };

  return <button onClick={increment}>{count}</button>;
}
`,
    interviewQuestion: "What is state batching in React? Why should you use a functional updater when incrementing a counter?",
    followUp: "Can you use useState to store a large object? What are the tradeoffs?",
    takeaway: "State updates are snapshots. Use functional updates for dependencies on previous state and rely on React's automatic batching.",
    badges: ["React", "Hooks", "State"],
  },
  "useEffect - dependency array, cleanup, common pitfalls": {
    title: "useEffect - dependency array, cleanup, common pitfalls",
    eyebrow: "Interview prep",
    quickAnswer:
      "useEffect runs side effects (API calls, subscriptions) after render. The dependency array controls when it re-runs. The cleanup function prevents memory leaks.",
    answer:
      "useEffect is for synchronizing your component with an external system. If the dependency array is empty [], it runs once on mount. If you include variables [id], it runs whenever they change. The return function is the 'cleanup' phase—React runs it before the effect re-runs and when the component unmounts. Forgetting to clean up intervals or event listeners is a major cause of memory leaks.",
    why: "Effects are the primary way to interact with the world outside React. Managing them correctly ensures data stays in sync and the app remains fast.",
    table: {
      headers: ["Dependency Array", "Timing"],
      rows: [
        ["No array", "Runs after every single render"],
        ["Empty array []", "Runs only once (on mount)"],
        ["Value array [data]", "Runs on mount + whenever 'data' changes"],
        ["Cleanup function", "Runs before re-run + on unmount"],
      ],
    },
    example: `
useEffect(() => {
  const socket = connect(id);
  
  // Side effect
  socket.on('message', (msg) => setMessage(msg));

  // CLEANUP: Extremely important!
  return () => {
    socket.disconnect();
  };
}, [id]); // Only re-connect if ID changes
`,
    interviewQuestion: "When does the cleanup function in useEffect run? What happens if you forget the dependency array?",
    followUp: "How do you fetch data inside useEffect without creating race conditions?",
    takeaway: "Use effects for external synchronization. Always clean up subscriptions/timers. Keep dependency arrays honest.",
    badges: ["React", "Hooks", "Lifecycle"],
  },
  "useRef - DOM refs, mutable values without re-render": {
    title: "useRef - DOM refs, mutable values without re-render",
    eyebrow: "Interview prep",
    quickAnswer:
      "useRef stores a mutable value that persists between renders but DOES NOT trigger a re-render when changed. It's used for DOM access or tracking 'instance' variables.",
    answer:
      "Unlike state, changing ref.current is a synchronous mutation that React doesn't track. It's perfect for things that shouldn't affect the UI, like keeping track of a timer ID or storing the previous value of a prop for comparison. Its most common use case is getting direct access to a DOM element (e.g., to focus an input or measure its size).",
    why: "Not every piece of data belongs in state. Putting things that don't drive UI into state causes unnecessary renders and slows down your app.",
    table: {
      headers: ["Feature", "useState", "useRef"],
      rows: [
        ["Re-renders UI?", "Yes", "No"],
        ["Value Persistence", "Persistent", "Persistent"],
        ["Update Method", "Asynchronous setter", "Direct mutation (.current)"],
        ["Best for", "UI Data / Inputs", "DOM Nodes / Timers / Prev State"],
      ],
    },
    example: `
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  
  const onButtonClick = () => {
    // Access the DOM node directly
    inputEl.current.focus();
  };

  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
`,
    interviewQuestion: "What is the difference between useRef and useState? When would you use a ref instead of state?",
    followUp: "Can you explain how to use useRef to track the 'previous' value of a prop?",
    takeaway: "Use state for UI-driving data; use refs for direct DOM interaction or invisible mutable values.",
    badges: ["React", "Hooks", "DOM"],
  },
  "useContext - avoid prop drilling": {
    title: "useContext - avoid prop drilling",
    eyebrow: "Interview prep",
    quickAnswer:
      "useContext lets a component subscribe to a React Context. It provides a way to pass data through the component tree without having to pass props down manually at every level.",
    answer:
      "Context is designed to share data that can be considered 'global' for a tree of React components, such as the current authenticated user, theme, or preferred language. When the Provider's value changes, all components calling useContext for that context will re-render. To prevent unnecessary re-renders, it's best to keep context values stable (using useMemo) and split contexts into smaller, logical pieces.",
    why: "Prop Drilling. Passing props through 5 layers of components just to get a 'theme' color to a button is messy and hard to maintain. Context solves this by providing a direct 'teleportation' of data.",
    table: {
      headers: ["Feature", "Props", "Context"],
      rows: [
        ["Data Flow", "Explicit (Manual)", "Implicit (Automatic)"],
        ["Complexity", "Low (Best for shallow trees)", "Medium (Best for global data)"],
        ["Re-renders", "Component-only", "All consumers re-render"],
        ["Best Use", "Component UI state", "Auth, Theme, Localization"],
      ],
    },
    example: `
const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>I am styled by context!</button>;
}
`,
    interviewQuestion: "What is prop drilling and how does Context solve it? What are the performance implications of using Context?",
    followUp: "Can you use Context as a complete replacement for Redux or Zustand?",
    takeaway: "Use Context for global, stable data. Avoid it for high-frequency updates or independent component state.",
    badges: ["React", "State Management", "Prop Drilling"],
  },
  "useReducer - complex state logic": {
    title: "useReducer - complex state logic",
    eyebrow: "Interview prep",
    quickAnswer:
      "useReducer is an alternative to useState for managing complex state logic. It uses a 'reducer' function (state, action) => newState, similar to Redux.",
    answer:
      "While useState is great for independent values, useReducer excels when you have multiple related state pieces (e.g., status, data, error) that change together. It centralizes all state transitions into a single function, making the logic easier to test and reason about. It also allows you to pass 'dispatch' down through context instead of multiple callbacks.",
    why: "Scalability. As components grow, managing 10 separate useStates becomes messy. useReducer provides a structured way to handle complex workflows like forms or API loading states.",
    table: {
      headers: ["Criteria", "useState", "useReducer"],
      rows: [
        ["Complexity", "Low", "Medium to High"],
        ["State type", "Primitives / Simple Objects", "Nested / Related Objects"],
        ["Logic location", "Inside component", "Separate reducer function"],
        ["Testing", "Tied to UI", "Pure function testing"],
      ],
    },
    example: `
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <button onClick={() => dispatch({type: 'increment'})}>{state.count}</button>;
}
`,
    interviewQuestion: "When would you prefer useReducer over multiple useState hooks?",
    followUp: "How can you optimize a useReducer that has expensive initial state calculation?",
    takeaway: "Use useReducer for complex, multi-part state or when you want to separate logic from UI.",
    badges: ["React", "Hooks", "State"],
  },
  "useMemo - expensive computations": {
    title: "useMemo - expensive computations",
    ...note(
      "useMemo caches the result of a calculation until its dependencies change. It helps when a computation is expensive or when stable derived values reduce child re-renders.",
      "const filtered = useMemo(() => items.filter(matchesSearch), [items, matchesSearch]);",
      "Is useMemo a performance guarantee?",
      "No. It is a hint for caching calculations; use it only when recomputation has a real cost or identity matters.",
      ["React", "useMemo", "Performance"],
    ),
  },
  "useCallback - stable function references": {
    title: "useCallback - stable function references",
    eyebrow: "Interview prep",
    quickAnswer:
      "useCallback is a hook that returns a memoized version of a callback function that only changes if one of the dependencies has changed.",
    answer:
      "By default, functions inside a component are recreated on every render. This isn't usually a problem unless you pass that function to a child component wrapped in React.memo or use it as a dependency in another hook. useCallback ensures the function 'identity' remains the same between renders, preventing downstream re-renders or infinite effect loops.",
    why: "Performance and Identity. If an effect has a function as a dependency, and that function is recreated every render, the effect will run every render. useCallback stops this cycle.",
    table: {
      headers: ["Scenario", "Normal Function", "useCallback"],
      rows: [
        ["Every Render", "New instance created", "Same instance returned"],
        ["Memory Usage", "Lower", "Slightly higher (caching)"],
        ["Dependency on State", "Direct", "Via dependency array"],
        ["Best Use", "Simple event handlers", "Props for memoized children"],
      ],
    },
    example: `
const handleClick = useCallback(() => {
  console.log('Clicked!', count);
}, [count]); // Only changes if count changes

return <Child onClick={handleClick} />;
`,
    interviewQuestion: "Why would you use useCallback? Does it make the function itself run faster?",
    followUp: "What is the relationship between useCallback and React.memo?",
    takeaway: "Only use useCallback when function identity matters (memoized children or effect dependencies).",
    badges: ["React", "Optimization", "Hooks"],
  },
  "useLayoutEffect - sync DOM mutations": {
    title: "useLayoutEffect - sync DOM mutations",
    ...note(
      "useLayoutEffect runs after React updates the DOM but before the browser paints. It is used when you must measure layout or make a visual adjustment before the user sees the frame.",
      "useLayoutEffect(() => { const height = ref.current.offsetHeight; setHeight(height); }, []);",
      "How is useLayoutEffect different from useEffect?",
      "useLayoutEffect blocks paint for layout-critical work; useEffect runs after paint and is better for most side effects.",
      ["React", "DOM", "Layout"],
    ),
  },
  "useId, useTransition, useDeferredValue (React 18)": {
    title: "useId, useTransition, useDeferredValue (React 18)",
    ...note(
      "useId creates stable accessible IDs, useTransition marks non-urgent updates, and useDeferredValue lets React keep showing an older value while expensive UI catches up.",
      "const [isPending, startTransition] = useTransition(); startTransition(() => setTab(nextTab));",
      "What problem does startTransition solve?",
      "It keeps urgent interactions responsive by letting React delay less urgent rendering work.",
      ["React 18", "Concurrency", "UX"],
    ),
  },
  "Building reusable hooks (useFetch, useDebounce, useLocalStorage)": {
    title: "Building reusable hooks (useFetch, useDebounce, useLocalStorage)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Custom hooks are functions that start with 'use' and can call other hooks. They let you extract and reuse stateful logic between components without adding extra UI wrappers.",
    answer:
      "Custom hooks are the primary way to share logic in modern React. Instead of repeating the same fetch or resize listener in 5 components, you extract it into a useFetch or useWindowSize hook. This keeps your components lean and focused on rendering, while the logic lives in a reusable, testable unit.",
    why: "DRY (Don't Repeat Yourself). Extraction of logic into hooks is what killed the need for Render Props and HOCs in most cases.",
    example: `
// Reusable hook
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

// In component
const [name, setName] = useLocalStorage('name', 'Guest');
`,
    interviewQuestion: "What is a custom hook? Why would you use one instead of a regular utility function?",
    followUp: "Can a custom hook return something other than an array or object?",
    takeaway: "Custom hooks = stateful logic extraction. Use them to keep components clean and logic reusable.",
    badges: ["React", "Custom Hooks", "Abstraction"],
  },
  "Hook composition patterns": {
    title: "Hook composition patterns",
    ...note(
      "Hook composition means building larger hooks from smaller hooks. It keeps concerns separate, such as combining URL state, fetching, caching, and debounced input without bloating components.",
      "function useSearchUsers(query) { const debounced = useDebounce(query, 300); return useFetch(`/users?q=${debounced}`); }",
      "Why is hook composition better than one giant custom hook?",
      "Small hooks are easier to test, reuse, replace, and reason about independently.",
      ["React", "Composition", "Hooks"],
    ),
  },
  "Rules of hooks and linting": {
    title: "Rules of hooks and linting",
    ...note(
      "Hooks must be called at the top level of React components or custom hooks, never inside conditions, loops, or nested functions. This keeps the hook call order stable across renders.",
      "if (enabled) { /* do not call useEffect here */ }",
      "Why do hooks need to run in the same order on every render?",
      "React matches hook state by call order, so changing the order breaks which state belongs to which hook.",
      ["React", "Rules of Hooks", "Linting"],
    ),
  },
  "Controlled vs uncontrolled components": {
    title: "Controlled vs uncontrolled components",
    eyebrow: "Interview prep",
    quickAnswer:
      "Controlled components have their state managed by React (via useState). Uncontrolled components have their state managed by the DOM (via useRef).",
    answer:
      "In a controlled component, the input's value is driven by React state. Every keystroke triggers a state update, which then updates the input value. This gives you total control for validation and instant UI feedback. In an uncontrolled component, you use a ref to 'pull' the value from the field when you need it (like on form submission). Uncontrolled is often simpler for large forms where performance is a concern.",
    why: "Forms are the most common source of state bugs. Knowing when to 'let go' of state (uncontrolled) vs when to 'own' it (controlled) is key to balanced React architecture.",
    table: {
      headers: ["Feature", "Controlled", "Uncontrolled"],
      rows: [
        ["State source", "React state", "DOM (Ref)"],
        ["Performance", "Slower (re-renders on every key)", "Faster (no re-renders on key)"],
        ["Validation", "Instant / Easy", "On submit / Manual"],
        ["Complexity", "High", "Low"],
      ],
    },
    example: `
// Controlled
function Controlled() {
  const [val, setVal] = useState("");
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// Uncontrolled
function Uncontrolled() {
  const inputRef = useRef();
  const submit = () => console.log(inputRef.current.value);
  return <input ref={inputRef} />;
}
`,
    interviewQuestion: "What is the main benefit of controlled components? When would you use an uncontrolled component?",
    followUp: "How do you handle default values in an uncontrolled component?",
    takeaway: "Use controlled for validation and dynamic UI. Use uncontrolled for simple forms or performance-critical inputs.",
    badges: ["React", "Forms", "State"],
  },
  "Compound components": {
    title: "Compound components",
    ...note(
      "Compound components are related components that work together through shared context, giving users a flexible API like Tabs, TabList, Tab, and TabPanel.",
      "<Tabs><Tabs.List /><Tabs.Panel /></Tabs>",
      "What problem do compound components solve?",
      "They provide flexible composition while hiding shared state and coordination inside the parent component.",
      ["React", "Patterns", "Composition"],
    ),
  },
  "Render props pattern": {
    title: "Render props pattern",
    ...note(
      "A render prop is a function prop that lets a component share behavior while the caller controls what UI gets rendered.",
      "<MouseTracker render={(position) => <Cursor position={position} />} />",
      "How is a render prop different from normal children?",
      "The child is a function that receives data or behavior from the component and returns UI.",
      ["React", "Render props", "Patterns"],
    ),
  },
  "HOC (Higher Order Components)": {
    title: "Higher Order Components (HOC)",
    eyebrow: "Interview prep",
    quickAnswer:
      "A Higher-Order Component (HOC) is a pattern where a function takes a component and returns a new component with added logic or props.",
    answer:
      "HOCs are based on functional programming's 'Composition' pattern. They are used for cross-cutting concerns like Authentication, Logging, or Theme injection. While Hooks have replaced many HOC use cases, HOCs remain powerful for wrapping third-party components or implementing logic that must wrap the entire component tree.",
    why: "Code Reusability. Instead of adding 'isLoggedIn' checks to every page, you wrap your pages in a 'withAuth' HOC. It keeps the core component clean and focused on its UI responsibility.",
    table: {
      headers: ["Feature", "HOC", "Hook"],
      rows: [
        ["Nesting", "Creates 'Wrapper Hell'", "Flat structure"],
        ["Prop Collisions", "Can overwrite props", "Scoped variables"],
        ["Best Use", "Injecting external logic", "Internal state/effects"],
        ["Composition", "Static (at export)", "Dynamic (at runtime)"],
      ],
    },
    example: `
// Custom HOC example
const withLogger = (WrappedComponent) => {
  return (props) => {
    useEffect(() => {
      console.log('Component mounted:', WrappedComponent.name);
    }, []);
    return <WrappedComponent {...props} />;
  };
};

export default withLogger(UserProfile);
`,
    interviewQuestion: "What is an HOC and why would you use one over a Hook in specific scenarios?",
    followUp: "What is 'Wrapper Hell' and how do HOCs contribute to it?",
    takeaway: "Use HOCs for component-level decoration. Prefer Hooks for logic sharing within components.",
    badges: ["React", "Advanced Patterns", "Architecture"],
  },
  "Forwarding refs (forwardRef)": {
    title: "Forwarding refs (forwardRef)",
    ...note(
      "forwardRef lets a component pass a ref down to a child DOM node or component. It is useful for reusable inputs, focus management, and component libraries.",
      "const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);",
      "Why can refs not be passed like normal props in older React patterns?",
      "ref is handled specially by React, so forwardRef explicitly exposes the inner target.",
      ["React", "Refs", "Component APIs"],
    ),
  },
  "Portals (modals, tooltips)": {
    title: "Portals (modals, tooltips)",
    ...note(
      "Portals render children into a different DOM node while keeping them in the same React tree. They are useful for modals, popovers, and tooltips that must escape parent overflow or z-index boundaries.",
      "createPortal(<Modal />, document.body);",
      "Do events still bubble through the React tree when using portals?",
      "Yes. The DOM placement changes, but React event bubbling follows the React component tree.",
      ["React", "Portals", "Modals"],
    ),
  },
  "Error boundaries": {
    title: "Error boundaries",
    eyebrow: "Interview prep",
    quickAnswer:
      "Error Boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI.",
    answer:
      "Before Error Boundaries, a single JS error in a small component would crash the entire React app (white screen of death). Now, you can wrap specific parts of your app (like a sidebar or a widget) in an Error Boundary. If that part crashes, the rest of the app stays interactive. Note: Error boundaries only catch errors during rendering, in lifecycle methods, and in constructors.",
    why: "User Experience and Resilience. A crashed search bar shouldn't stop a user from being able to use the rest of the dashboard.",
    table: {
      headers: ["Catches", "Does NOT catch"],
      rows: [
        ["Render errors", "Event handlers"],
        ["Lifecycle errors", "Asynchronous code (setTimeout, fetch)"],
        ["Constructor errors", "Server-side rendering"],
        ["N/A", "Errors in the boundary itself"],
      ],
    },
    example: `
// NOTE: Error boundaries must be class components (for now)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return <h1>Something went wrong.</h1>;
    return this.props.children;
  }
}
`,
    interviewQuestion: "What is an Error Boundary? Can you implement one using functional components?",
    followUp: "Why do error boundaries not catch errors in event handlers?",
    takeaway: "Wrap unstable parts of your app in Error Boundaries to prevent total app crashes.",
    badges: ["React", "Stability", "Best Practices"],
  },
  "Context API - global state, avoiding re-renders": {
    title: "Context API - global state, avoiding re-renders",
    ...note(
      "Context can share global-ish values across a subtree, but every consumer may re-render when the provider value identity changes. Splitting contexts and memoizing provider values helps reduce unnecessary updates.",
      "<AuthContext.Provider value={auth}>{children}</AuthContext.Provider>",
      "How do you avoid unnecessary re-renders with Context?",
      "Split unrelated state into separate providers and keep provider values stable when possible.",
      ["React", "Context", "Performance"],
    ),
  },
  "Zustand - simple global store": {
    title: "Zustand - simple global store",
    eyebrow: "Interview prep",
    quickAnswer:
      "Zustand is a small, fast, and scalable bear-bones state-management solution. It uses a simplified Flux pattern but without the boilerplate of Redux.",
    answer:
      "Zustand is popular because it's 'just a hook'. You create a store, define your state and actions, and then use it in your components. Crucially, it doesn't use Context under the hood, so components only re-render when the specific slice of state they subscribe to changes. This makes it more performant and easier to debug than giant Context objects.",
    why: "State management is the #1 architectural challenge in React. Zustand provides the 'sweet spot' between the simplicity of Context and the power of Redux.",
    table: {
      headers: ["Library", "Complexity", "Re-renders", "Boilerplate"],
      rows: [
        ["Context", "Low", "Full subtree (unless optimized)", "Medium"],
        ["Zustand", "Low", "Granular (Slice-based)", "Very Low"],
        ["Redux", "High", "Granular (Selector-based)", "High"],
      ],
    },
    example: `
import { create } from 'zustand';

const useStore = create((set) => ({
  bears: 0,
  increase: () => set((state) => ({ bears: state.bears + 1 })),
  removeAll: () => set({ bears: 0 }),
}));

function BearCounter() {
  // Only re-renders if 'bears' changes
  const bears = useStore((state) => state.bears);
  return <h1>{bears} around here...</h1>;
}
`,
    interviewQuestion: "Why would you choose Zustand over React Context for global state?",
    followUp: "How do you handle asynchronous actions in Zustand?",
    takeaway: "Use Zustand for global state that needs to be fast and easy to write. It's the modern standard for simple stores.",
    badges: ["React", "State", "Zustand"],
  },
  "Redux Toolkit (RTK) - slices, thunks": {
    title: "Redux Toolkit (RTK) - slices, thunks",
    ...note(
      "Redux Toolkit is the standard way to write Redux. Slices define reducers and actions together, while thunks handle async workflows like fetching and dispatching multiple actions.",
      "const todosSlice = createSlice({ name: 'todos', initialState, reducers: { added() {} } });",
      "Why is Redux Toolkit preferred over hand-written Redux?",
      "It reduces boilerplate, includes good defaults, and makes immutable updates easier with Immer.",
      ["React", "Redux Toolkit", "State"],
    ),
  },
  "TanStack Query (React Query) - server state, caching": {
    title: "TanStack Query (React Query) - server state, caching",
    eyebrow: "Interview prep",
    quickAnswer:
      "TanStack Query is a data-fetching library that manages 'server state' (fetching, caching, synchronization, and updating).",
    answer:
      "Most 'global state' in apps is just a cache of what's on the server. React Query handles the complex logic of caching that data, refetching it in the background when you focus the window, and handling loading/error states automatically. It eliminates the need for manual useEffect fetching and stores data in a global cache that any component can access.",
    why: "Server state is different from client state. It needs expiration, deduplication, and background updates. React Query is the 'missing piece' for network-heavy React apps.",
    table: {
      headers: ["Feature", "Manual Fetch (useEffect)", "TanStack Query"],
      rows: [
        ["Caching", "Manual / None", "Automatic"],
        ["Loading/Error", "Manual state variables", "Provided (isLoading, isError)"],
        ["Refetch on focus", "No", "Yes (Automatic)"],
        ["Deduplication", "No (multiple renders = multiple fetches)", "Yes (one fetch for all)"],
      ],
    },
    example: `
function UserProfile({ id }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),
    staleTime: 5000, // Keep data 'fresh' for 5 seconds
  });

  if (isLoading) return <span>Loading...</span>;
  if (error) return <span>Error: {error.message}</span>;

  return <div>{data.name}</div>;
}
`,
    interviewQuestion: "What is the difference between 'stale' data and 'cached' data in React Query?",
    followUp: "How does the 'queryKey' affect caching and refetching?",
    takeaway: "Use React Query for ALL server data. It's much more than just a fetch wrapper—it's a state manager for your API.",
    badges: ["React", "Server State", "Caching"],
  },
  "Jotai / Recoil - atomic state": {
    title: "Jotai / Recoil - atomic state",
    ...note(
      "Atomic state libraries model state as small independent atoms. Components subscribe to only the atoms they use, making state composition flexible and granular.",
      "const countAtom = atom(0);",
      "What is the benefit of atomic state compared with one large global store?",
      "Atoms reduce broad re-renders and let state be composed from small focused units.",
      ["React", "Atomic state", "Jotai"],
    ),
  },
  "React.memo - prevent unnecessary re-renders": {
    title: "React.memo - prevent unnecessary re-renders",
    eyebrow: "Interview prep",
    quickAnswer:
      "React.memo is a higher-order component that memoizes a functional component. It skips re-rendering the component if its props haven't changed.",
    answer:
      "By default, when a parent renders, all its children render too. React.memo performs a shallow comparison of props. If props are the same as last time, React skips the render and reuses the last result. This is a powerful optimization, but it can be negated if you pass 'new' object or function references every time (this is why we use useMemo/useCallback alongside it).",
    why: "Performance. In large lists or complex dashboards, skipping even 50ms of rendering across 100 components makes a massive difference in 'feel'.",
    table: {
      headers: ["Scenario", "Behavior"],
      rows: [
        ["No Memo", "Renders every time parent renders"],
        ["With Memo (Same Props)", "Skips render (reuses last)"],
        ["With Memo (New Props)", "Renders normally"],
        ["Object Props", "Always re-renders unless memoized (useMemo)"],
      ],
    },
    example: `
const ExpensiveComponent = React.memo(({ data, onClick }) => {
  console.log("Rendering...");
  return <div onClick={onClick}>{data.title}</div>;
});

// In Parent
const handleClick = useCallback(() => {}, []); // Stable ref
const data = useMemo(() => ({ title: "Hello" }), []); // Stable ref

return <ExpensiveComponent data={data} onClick={handleClick} />;
`,
    interviewQuestion: "How does React.memo work? When would it fail to optimize a component?",
    followUp: "What is the difference between React.memo and useMemo?",
    takeaway: "Use memo for expensive components with stable props. Always pair it with stable callback/object references.",
    badges: ["React", "Performance", "Optimization"],
  },
  "Code splitting - React.lazy + Suspense": {
    title: "Code splitting - React.lazy + Suspense",
    ...note(
      "Code splitting loads parts of the app only when needed. React.lazy imports a component dynamically, and Suspense renders fallback UI while the chunk loads.",
      "const Settings = lazy(() => import('./Settings'));",
      "What is the main benefit of code splitting?",
      "It reduces the initial bundle size so users download less JavaScript on first load.",
      ["React", "Lazy loading", "Suspense"],
    ),
  },
  "Virtualization - react-window / react-virtual": {
    title: "Virtualization - react-window / react-virtual",
    ...note(
      "Virtualization renders only the visible rows of a long list plus a small buffer. This keeps DOM size small and improves scrolling performance.",
      "<FixedSizeList itemCount={10000} itemSize={36}>{Row}</FixedSizeList>",
      "Why is rendering 10,000 list items at once a performance problem?",
      "Too many DOM nodes increase layout, paint, memory, and event costs; virtualization limits that work.",
      ["React", "Lists", "Performance"],
    ),
  },
  "Profiler API and React DevTools": {
    title: "Profiler API and React DevTools",
    ...note(
      "React Profiler measures render timing and helps find components that render too often or take too long. React DevTools shows component trees, props, state, hooks, and performance profiles.",
      "<Profiler id=\"Search\" onRender={handleRender}><Search /></Profiler>",
      "How do you investigate unnecessary React re-renders?",
      "Use React DevTools Profiler, inspect changed props, and optimize only after measuring the actual bottleneck.",
      ["React", "Profiler", "DevTools"],
    ),
  },
  "Concurrent features - startTransition": {
    title: "Concurrent features - startTransition",
    ...note(
      "startTransition marks state updates as non-urgent so React can keep urgent interactions, like typing and clicking, responsive while rendering heavier UI in the background.",
      "startTransition(() => setFilteredItems(nextItems));",
      "Does startTransition make slow code faster?",
      "No. It changes scheduling priority; you still need to optimize expensive work when it is truly slow.",
      ["React", "Concurrency", "Scheduling"],
    ),
  },
  "React Router v6 - Routes, loaders, actions": {
    title: "React Router v6 - Routes, loaders, actions",
    ...note(
      "React Router v6 maps URLs to route elements, and data routers add loaders for reading data and actions for mutations before or during navigation.",
      "<Route path=\"/users/:id\" element={<UserPage />} />",
      "What are loaders and actions in React Router data APIs?",
      "Loaders fetch route data, and actions handle submissions or mutations tied to routes.",
      ["React", "Router", "Data APIs"],
    ),
  },
  "Protected routes and navigation guards": {
    title: "Protected routes and navigation guards",
    ...note(
      "Protected routes restrict access based on auth, roles, or app state. The route either renders the protected page or redirects the user to login or an unauthorized page.",
      "return user ? <Outlet /> : <Navigate to=\"/login\" replace />;",
      "Where should authorization be enforced: frontend, backend, or both?",
      "Both. The frontend improves UX, but the backend must enforce real security.",
      ["React", "Auth", "Routing"],
    ),
  },
  "React Hook Form - register, watch, validation": {
    title: "React Hook Form - register, watch, validation",
    ...note(
      "React Hook Form manages form state with minimal re-renders. register connects inputs, watch observes values, and validation rules or resolvers validate user input.",
      "<input {...register('email', { required: true })} />",
      "Why is React Hook Form often faster than fully controlled forms?",
      "It relies heavily on refs and subscriptions, so typing does not need to re-render the whole form.",
      ["React", "Forms", "Validation"],
    ),
  },
  "Zod - schema validation": {
    title: "Zod - schema validation",
    ...note(
      "Zod defines runtime validation schemas and can infer TypeScript types from them. It helps keep client validation, API validation, and data contracts consistent.",
      "const UserSchema = z.object({ email: z.string().email() });",
      "Why use schema validation instead of only TypeScript types?",
      "TypeScript disappears at runtime; Zod validates real user input and API data while the app runs.",
      ["Validation", "Zod", "Runtime safety"],
    ),
  },
  "Unit Testing and TDD (Jest/Mocha)": {
    title: "Unit Testing and TDD (Jest/Mocha)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Unit testing involves testing individual components or functions in isolation to ensure they work correctly. TDD is the process of writing tests before code.",
    answer:
      "Jest is currently the most popular framework because it includes everything in one package: a test runner, assertion library (expect), and mocking tools. Mocha is more flexible but requires external libraries like 'Chai' for assertions and 'Sinon' for mocks. Key concepts include 'describe' blocks for grouping and 'it' or 'test' for individual assertions.",
    why: "Maintainability. Tests are your safety net. They allow you to refactor code or upgrade dependencies with confidence, knowing that you haven't broken existing features.",
    table: {
      headers: ["Term", "Meaning", "Example"],
      rows: [
        ["Mocking", "Faking a dependency", "jest.fn()"],
        ["Assertion", "Checking a result", "expect(x).toBe(y)"],
        ["Coverage", "How much code is tested", "--coverage flag"],
        ["Snapshot", "Testing UI/Large objects", "toMatchSnapshot()"],
      ],
    },
    example: `
// sum.test.js
const sum = (a, b) => a + b;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

// Mocking an API call
jest.mock('./api');
`,
    interviewQuestion: "What is the difference between Unit, Integration, and E2E testing?",
    followUp: "Explain the Red-Green-Refactor cycle in TDD.",
    takeaway: "Write unit tests for complex logic. Use mocks to isolate the code being tested.",
    badges: ["Testing", "Jest", "Quality"],
  },
  "React Testing Library - queries, user events": {
    title: "React Testing Library - queries, user events",
    eyebrow: "Interview prep",
    quickAnswer:
      "RTL is a testing utility that focuses on testing components as a user would. It encourages using accessibility markers (roles, labels) instead of implementation details.",
    answer:
      "The philosophy of RTL is: 'The more your tests resemble the way your software is used, the more confidence they can give you.' Instead of checking state or internal methods, you query for a button with a specific name, click it, and check if the expected text appears on the screen. This makes tests resilient to refactors.",
    why: "Maintainability. Tests that depend on internal state break every time you change your code. Tests that depend on the UI only break if the UI actually changes.",
    table: {
      headers: ["Query Type", "Use Case", "Throws if missing?"],
      rows: [
        ["getBy...", "Element must exist", "Yes"],
        ["queryBy...", "Check element is NOT there", "No (returns null)"],
        ["findBy...", "Wait for async element", "Yes (Promise)"],
        ["userEvent", "Simulate real clicks/typing", "N/A"],
      ],
    },
    example: `
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('increments counter on click', async () => {
  render(<Counter />);
  const user = userEvent.setup();

  const button = screen.getByRole('button', { name: /increment/i });
  await user.click(button);

  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
`,
    interviewQuestion: "Why should you use getByRole instead of querySelector in your tests?",
    followUp: "What is the difference between getBy, queryBy, and findBy?",
    takeaway: "Test behavior, not implementation. Use accessibility-first queries for robust tests.",
    badges: ["Testing", "RTL", "Accessibility"],
  },
  "MSW (Mock Service Worker) - API mocking": {
    title: "MSW (Mock Service Worker) - API mocking",
    ...note(
      "MSW intercepts network requests at the boundary and returns mocked responses. It lets tests and local development use realistic API behavior without hitting real services.",
      "http.get('/api/users', () => HttpResponse.json([{ id: 1 }]))",
      "Why is MSW better than mocking fetch directly in many tests?",
      "It tests the app's real request code while replacing only the network response.",
      ["Testing", "MSW", "API mocking"],
    ),
  },
  "View, Text, Image, ScrollView, SafeAreaView": {
    title: "View, Text, Image, ScrollView, SafeAreaView",
    ...note(
      "These are core React Native building blocks: View is a container, Text renders text, Image renders media, ScrollView scrolls small content, and SafeAreaView avoids notches and system UI.",
      "<SafeAreaView><ScrollView><Text>Hello</Text></ScrollView></SafeAreaView>",
      "Why can you not use div and span in React Native?",
      "React Native renders native components, not browser DOM nodes.",
      ["React Native", "Core components", "UI"],
    ),
  },
  "StyleSheet API - Flexbox in React Native": {
    title: "StyleSheet API - Flexbox in React Native",
    eyebrow: "Interview prep",
    quickAnswer:
      "React Native uses Flexbox for layout, but with some differences from CSS: flexDirection defaults to 'column', and all dimensions are unitless density-independent pixels.",
    answer:
      "StyleSheet.create() is the preferred way to define styles. It sends styles through the bridge to native only once. In React Native, everything is a Flexbox container by default. Key differences from web: 'column' is the default direction, 'flex: 1' means 'fill all available space', and there are no shorthand properties like 'margin: 10px 5px'.",
    why: "Layout is the #1 challenge when moving from Web to Mobile. Understanding how Flexbox works differently on mobile prevents 'disappearing element' bugs and broken layouts across devices.",
    table: {
      headers: ["Feature", "React Native", "Web (CSS)"],
      rows: [
        ["flexDirection", "Defaults to 'column'", "Defaults to 'row'"],
        ["Units", "Unitless (e.g., 10)", "Required (e.g., '10px')"],
        ["Display", "Only 'flex' and 'none'", "block, inline, grid, etc."],
        ["Position", "Defaults to 'relative'", "Defaults to 'static'"],
      ],
    },
    example: `
const styles = StyleSheet.create({
  container: {
    flex: 1, // Fill screen
    flexDirection: 'row', // Horizontal
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    width: 100,
    height: 100,
    margin: 10, // Not '10px'
  }
});
`,
    interviewQuestion: "What are the main differences between Flexbox in React Native vs Flexbox on the Web?",
    followUp: "How do you handle responsive designs for different screen sizes in React Native?",
    takeaway: "Think in columns by default. Use unitless numbers. Avoid inline styles for better performance.",
    badges: ["React Native", "Layout", "Styles"],
  },
  "TouchableOpacity, Pressable, Button": {
    title: "TouchableOpacity, Pressable, Button",
    ...note(
      "Button is simple and platform-styled, TouchableOpacity gives opacity feedback, and Pressable is the modern flexible API for press states like pressed, hovered, and focused.",
      "<Pressable onPress={save}>{({ pressed }) => <Text>{pressed ? 'Saving' : 'Save'}</Text>}</Pressable>",
      "Why is Pressable usually preferred for custom buttons?",
      "It exposes interaction state and gives more control over styling and behavior.",
      ["React Native", "Pressable", "Input"],
    ),
  },
  "FlatList and SectionList - performance patterns": {
    title: "FlatList and SectionList - performance patterns",
    eyebrow: "Interview prep",
    quickAnswer:
      "FlatList is a high-performance component for rendering large lists. It virtualizes rows, meaning it only renders what's visible on the screen to save memory.",
    answer:
      "Unlike ScrollView which renders every item at once, FlatList handles large data sets by keeping a small window of rendered items. For maximum performance, you should use stable 'keyExtractor', keep your 'renderItem' functions simple, and use 'getItemLayout' if you know the item heights beforehand to skip measurement cycles.",
    why: "Mobile devices have limited memory. Trying to render 1000 complex items in a ScrollView will crash the app; FlatList is the standard solution.",
    table: {
      headers: ["Feature", "ScrollView", "FlatList"],
      rows: [
        ["Data Size", "Small (1-20 items)", "Large (Unlimited)"],
        ["Performance", "Slower (renders all)", "Faster (Virtualization)"],
        ["Memory Use", "High", "Low"],
        ["Features", "Simple scrolling", "Header/Footer/Pull-to-refresh"],
      ],
    },
    example: `
const MyList = () => (
  <FlatList
    data={DATA}
    renderItem={({ item }) => <Item title={item.title} />}
    keyExtractor={item => item.id}
    initialNumToRender={10}
    maxToRenderPerBatch={5}
    windowSize={5}
  />
);
`,
    interviewQuestion: "How does FlatList achieve high performance for large lists? What is virtualization?",
    followUp: "When would you choose SectionList over FlatList?",
    takeaway: "Always use FlatList for long lists. Optimize with stable keys and light-weight render items.",
    badges: ["React Native", "Performance", "Lists"],
  },
  "TextInput - keyboard handling, forms": {
    title: "TextInput - keyboard handling, forms",
    ...note(
      "TextInput collects user text and can be controlled with state or integrated with form libraries. Mobile forms must handle keyboard type, return behavior, focus, and avoiding keyboard overlap.",
      "<TextInput value={email} onChangeText={setEmail} keyboardType=\"email-address\" />",
      "What mobile-specific issues do TextInput forms introduce?",
      "Keyboard overlap, focus management, return key behavior, autocorrect, and platform-specific input quirks.",
      ["React Native", "Forms", "Keyboard"],
    ),
  },
  "Modal, ActivityIndicator, Alert": {
    title: "Modal, ActivityIndicator, Alert",
    ...note(
      "Modal displays content above the current screen, ActivityIndicator shows loading state, and Alert opens a native system dialog for important confirmations or messages.",
      "<ActivityIndicator size=\"large\" />",
      "When should you use Alert instead of a custom modal?",
      "Use Alert for simple native confirmations; use a custom modal when design, content, or interaction needs more control.",
      ["React Native", "Feedback", "Modal"],
    ),
  },
  "Platform.OS - platform-specific code": {
    title: "Platform.OS - platform-specific code",
    ...note(
      "Platform.OS identifies the current platform so you can handle iOS, Android, or web differences. It is useful for styles, permissions, native behavior, and small platform branches.",
      "const paddingTop = Platform.OS === 'ios' ? 20 : 0;",
      "How do you manage platform differences without making components messy?",
      "Keep branches small, extract platform-specific helpers, or use .ios.js and .android.js files for bigger differences.",
      ["React Native", "Platform", "iOS Android"],
    ),
  },
  "React Navigation v6 - Stack, Tab, Drawer": {
    title: "React Navigation v6 - Stack, Tab, Drawer",
    eyebrow: "Interview prep",
    quickAnswer:
      "React Navigation is the most popular routing library for RN. It uses a Stack navigator for 'drilling down', Tabs for main sections, and a Drawer for side menus.",
    answer:
      "Navigation in mobile is different from web because it's 'stateful'. When you push a screen onto a Stack, the previous screen stays 'alive' underneath it. This is why useEffect cleanups don't always run when you navigate away. You have to use 'useFocusEffect' or navigation listeners to handle 'screen visible' events.",
    why: "App flow defines the user experience. Mastering how to nest Stacks inside Tabs is the bread and butter of building professional mobile apps.",
    table: {
      headers: ["Navigator", "Visual Pattern", "Best Use"],
      rows: [
        ["Stack", "Cards sliding in", "Product Details, Settings"],
        ["Bottom Tab", "Icons at bottom", "Main app areas (Home, Profile)"],
        ["Drawer", "Side panel", "Secondary features, Multi-account"],
      ],
    },
    example: `
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
`,
    interviewQuestion: "What is the difference between a Stack and a Tab navigator? How do you pass data between screens?",
    followUp: "Why does useEffect not always run when navigating between screens in a stack?",
    takeaway: "Understand the navigation lifecycle. Use Stacks for drill-downs and Tabs for global navigation.",
    badges: ["React Native", "Navigation", "UX"],
  },
  "Expo Router - file-based routing": {
    title: "Expo Router - file-based routing",
    ...note(
      "Expo Router maps files in the app directory to routes. It brings web-style file-based routing to React Native and supports layouts, dynamic routes, and deep links.",
      "app/users/[id].tsx maps to a user detail route.",
      "Why might a team choose Expo Router over manually configuring navigators?",
      "It reduces routing boilerplate and makes route structure visible from the file system.",
      ["React Native", "Expo Router", "Routing"],
    ),
  },
  "Deep linking and URL schemes": {
    title: "Deep linking and URL schemes",
    ...note(
      "Deep linking opens a specific screen in the app from a URL, notification, email, or browser. URL schemes and universal/app links connect external URLs to app routes.",
      "myapp://product/42",
      "What must be handled when implementing deep links?",
      "Parse the URL, map it to navigation state, handle cold starts, and validate sensitive parameters.",
      ["React Native", "Deep links", "Navigation"],
    ),
  },
  "Navigation params and type safety": {
    title: "Navigation params and type safety",
    ...note(
      "Navigation params pass route-specific data between screens. Type safety prevents navigating with missing or invalid params, especially in TypeScript apps.",
      "navigation.navigate('Profile', { userId: '42' });",
      "What should and should not be passed as navigation params?",
      "Pass small serializable identifiers or options, not large objects, secrets, or frequently changing global state.",
      ["React Native", "Navigation", "Types"],
    ),
  },
  "Nested navigators": {
    title: "Nested navigators",
    ...note(
      "Nested navigators combine navigation patterns, such as tabs containing stacks. Each navigator owns its own navigation history and screen options.",
      "A Home tab can contain HomeList and HomeDetails stack screens.",
      "What is a common pitfall with nested navigators?",
      "Confusing which navigator receives navigation actions or where screen options should be configured.",
      ["React Native", "Navigation", "Nested"],
    ),
  },
  "SQLite & AsyncStorage": {
    title: "SQLite & AsyncStorage",
    eyebrow: "Interview prep",
    quickAnswer:
      "AsyncStorage is a simple key-value store. SQLite is a full relational database for complex local data storage.",
    answer:
      "AsyncStorage is unencrypted and best for small things like Auth Tokens or Theme settings. SQLite is for large datasets that require querying, relationships, and indexing. For even better performance and encryption, many pros use 'WatermelonDB' or 'Realm', but SQLite remains the standard for structured local data in React Native.",
    why: "Offline Capability. Users expect apps to work without internet. Storing data locally ensures a fast, resilient experience even in 'Airplane Mode'.",
    table: {
      headers: ["Feature", "AsyncStorage", "SQLite"],
      rows: [
        ["Data Type", "Strings only", "Relational (Tables)"],
        ["Performance", "Slow for large data", "Fast (Indexed)"],
        ["Querying", "Manual / Limited", "SQL (SELECT, JOIN)"],
        ["Best Use", "Settings, Tokens", "Offline Caching, Full Apps"],
      ],
    },
    example: `
// AsyncStorage
await AsyncStorage.setItem('token', 'xyz123');

// SQLite
const db = SQLite.openDatabase('mydb.db');
db.transaction(tx => {
  tx.executeSql('SELECT * FROM users WHERE id = ?', [1], (_, { rows }) => {
    console.log(rows._array);
  });
});
`,
    interviewQuestion: "When would you choose SQLite over AsyncStorage in a React Native app?",
    followUp: "Is AsyncStorage encrypted by default?",
    takeaway: "Use AsyncStorage for simple flags. Use SQLite for relational data and offline-first apps.",
    badges: ["React Native", "Storage", "Database"],
  },
  "Camera (expo-camera)": {
    title: "Camera (expo-camera)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Expo Camera is a universal component that provides a high-level API for taking photos, recording videos, and scanning barcodes.",
    answer:
      "Using the camera requires runtime permission handling. You must check 'status' from 'requestCameraPermissionsAsync()'. The component supports both front and back cameras, flash modes, and zoom levels. For advanced use cases like face detection or real-time filters, you might need 'react-native-vision-camera'.",
    why: "Native Features. Mobile apps are distinct because of their ability to interact with hardware. Camera integration is a core skill for any mobile developer.",
    table: {
      headers: ["Feature", "Expo Camera", "Vision Camera"],
      rows: [
        ["Setup", "Easy (Expo built-in)", "Complex (Native deps)"],
        ["Performance", "Good", "Excellent (60fps frames)"],
        ["Barcodes", "Built-in", "Plugin required"],
        ["Manual Controls", "Basic", "Advanced (ISO, Shutter)"],
      ],
    },
    example: `
import { Camera, CameraType } from 'expo-camera';

function App() {
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission?.granted) {
    return <Button onPress={requestPermission} title="Grant Permission" />;
  }

  return <Camera style={styles.camera} type={CameraType.back} />;
}
`,
    interviewQuestion: "How do you handle camera permissions in React Native?",
    followUp: "What is the difference between expo-camera and react-native-vision-camera?",
    takeaway: "Always handle permission denial gracefully. Use expo-camera for most apps.",
    badges: ["React Native", "Camera", "Hardware"],
  },
  "Location (expo-location)": {
    title: "Location (expo-location)",
    eyebrow: "Interview prep",
    quickAnswer:
      "expo-location allows reading a device's geolocation, tracking movement, and geocoding coordinates into human-readable addresses.",
    answer:
      "Location services require two layers of permission: 'Foreground' (while app is open) and 'Background' (always on). For tracking, 'watchPositionAsync' is more efficient than polling. You must also handle 'High Accuracy' settings, which consume more battery but provide GPS-level precision.",
    why: "Personalization. Maps, delivery services, and weather apps all rely on accurate location data. Knowing how to handle permissions gracefully is the mark of a pro mobile dev.",
    table: {
      headers: ["Feature", "Foreground", "Background"],
      rows: [
        ["Permission", "When in use", "Always allowed"],
        ["Battery Impact", "Moderate", "High"],
        ["Setup", "Simple", "Requires extra config"],
        ["Best for", "Search, Check-ins", "Running apps, Geofencing"],
      ],
    },
    example: `
import * as Location from 'expo-location';

async function getLocation() {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') return;

  let location = await Location.getCurrentPositionAsync({});
  console.log(location.coords.latitude);
}
`,
    interviewQuestion: "What is the difference between getCurrentPositionAsync and watchPositionAsync?",
    followUp: "How do you handle users who deny location permissions?",
    takeaway: "Always check permissions first. Use Foreground permission unless background tracking is strictly necessary.",
    badges: ["React Native", "Location", "Permissions"],
  },
  "Push Notifications (expo-notifications)": {
    title: "Push Notifications (expo-notifications)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Push notifications allow you to send messages to your users even when they aren't actively using the app. Expo provides a unified API for iOS and Android.",
    answer:
      "To send push notifications, you need an 'Expo Push Token'. You send this token to your server, which then uses Expo's push service to deliver the message. Notifications can be 'Local' (triggered by the app itself) or 'Remote' (triggered by a server). Handling notifications while the app is in the foreground vs background requires different listeners.",
    why: "Retention. Notifications are the #1 way to bring users back to your app. Mastering the flow from token generation to delivery is essential for growth-focused apps.",
    table: {
      headers: ["Type", "Triggered By", "Internet Required?"],
      rows: [
        ["Local", "App Logic (Timer)", "No"],
        ["Push (Remote)", "External Server", "Yes"],
        ["Silent", "Background sync", "Yes"],
      ],
    },
    example: `
// Get the token to send to your backend
const token = (await Notifications.getExpoPushTokenAsync()).data;

// Handle notification while app is open
Notifications.addNotificationReceivedListener(notification => {
  console.log(notification.request.content.title);
});
`,
    interviewQuestion: "Explain the full flow of sending a push notification from a Node.js server to an Expo app.",
    followUp: "How do you handle notification permissions on iOS vs Android?",
    takeaway: "Save the user's Push Token in your database. Handle foreground notifications gracefully.",
    badges: ["React Native", "Notifications", "Retention"],
  },
  "Image Picker (expo-image-picker)": {
    title: "Image Picker (expo-image-picker)",
    ...note(
      "expo-image-picker lets users select media from the library or capture new media after permissions. The returned asset can be previewed, uploaded, or processed.",
      "const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });",
      "What should you validate after picking an image?",
      "Check cancellation, file type, size, dimensions, and upload requirements before sending it to a server.",
      ["React Native", "Images", "Uploads"],
    ),
  },
  "Haptics, SecureStore, FileSystem": {
    title: "Haptics, SecureStore, FileSystem",
    ...note(
      "Haptics provides tactile feedback, SecureStore stores sensitive values more safely, and FileSystem reads or writes files on the device.",
      "await SecureStore.setItemAsync('token', token);",
      "When would you use SecureStore instead of AsyncStorage?",
      "Use SecureStore for sensitive values like tokens; use AsyncStorage for non-sensitive preferences.",
      ["React Native", "Device APIs", "Security"],
    ),
  },
  "Animated API - basic animations": {
    title: "Animated API - basic animations",
    eyebrow: "Interview prep",
    quickAnswer:
      "The Animated API is the built-in system for creating fluid animations. It uses a declarative approach to define values and how they change over time.",
    answer:
      "To use it, you define an 'Animated.Value', link it to a style property of an 'Animated.View' (or Text/Image), and then trigger an animation using timing, spring, or decay. The most important performance tip is to set 'useNativeDriver: true', which offloads the animation to the native thread, keeping it smooth even if the JS thread is busy.",
    why: "Mobile users expect high-quality animations. A 'laggy' animation makes the entire app feel cheap and unprofessional.",
    table: {
      headers: ["Animation Type", "Feel", "Use Case"],
      rows: [
        ["Timing", "Linear / Bezier", "Fades, Simple movement"],
        ["Spring", "Bouncy / Natural", "Buttons, Modals, Lists"],
        ["Decay", "Initial velocity", "Flinging / Scrolling items"],
      ],
    },
    example: `
const fadeAnim = useRef(new Animated.Value(0)).current;

const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true, // Offload to Native thread
  }).start();
};

return <Animated.View style={{ opacity: fadeAnim }} />;
`,
    interviewQuestion: "What is 'useNativeDriver' in React Native animations? Why is it important for performance?",
    followUp: "What are the limitations of the built-in Animated API compared to Reanimated?",
    takeaway: "Always use native driver where possible. Use springs for a native feel.",
    badges: ["React Native", "Animation", "Performance"],
  },
  "Reanimated 3 - worklets, useSharedValue": {
    title: "Reanimated 3 - worklets, useSharedValue",
    eyebrow: "Interview prep",
    quickAnswer:
      "Reanimated 3 is the industry standard for complex, gesture-driven animations. It runs logic on the 'UI Thread' using special functions called 'worklets'.",
    answer:
      "Unlike the built-in Animated API which often relies on the JS-to-Native bridge, Reanimated runs your animation logic directly on the UI thread. It uses 'shared values' that can be modified from the UI thread and 'worklets' which are small JS functions that are serialized and run on that thread. This enables 60FPS animations for complex gestures like swiping, pinching, and complex layout transitions.",
    why: "Advanced UI. If you want to build something like a Tinder swipe or a custom bottom sheet, Reanimated is the only way to ensure it doesn't lag.",
    table: {
      headers: ["Feature", "Animated API", "Reanimated 3"],
      rows: [
        ["Running Thread", "JS Thread (mostly)", "UI Thread"],
        ["Gesture Sync", "Can be laggy", "Synchronous / Smooth"],
        ["Learning Curve", "Low", "Medium/High"],
        ["Layout Animations", "Basic", "Advanced / Automatic"],
      ],
    },
    example: `
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

function Box() {
  const width = useSharedValue(100);

  const style = useAnimatedStyle(() => ({
    width: withSpring(width.value),
  }));

  return <Animated.View style={[styles.box, style]} />;
}
`,
    interviewQuestion: "What is a 'worklet' in Reanimated? How does it solve performance issues in gestures?",
    followUp: "What is the difference between a normal JS value and a useSharedValue?",
    takeaway: "Use Reanimated for any gesture-based or complex layout animation to guarantee smoothness.",
    badges: ["React Native", "Reanimated", "UI Thread"],
  },
  "Gesture Handler - pan, pinch, tap": {
    title: "Gesture Handler - pan, pinch, tap",
    ...note(
      "Gesture Handler provides native-driven gesture recognition for taps, pans, pinches, swipes, and complex gesture composition.",
      "const pan = Gesture.Pan().onUpdate((event) => { x.value = event.translationX; });",
      "Why not rely only on basic touch events for complex gestures?",
      "Native gesture handling is smoother, more reliable, and better for composing mobile interactions.",
      ["React Native", "Gestures", "Touch"],
    ),
  },
  "Lottie animations": {
    title: "Lottie animations",
    ...note(
      "Lottie renders vector animations exported as JSON, often from After Effects. It is useful for polished loading, success, empty, and onboarding animations.",
      "<LottieView source={require('./success.json')} autoPlay loop={false} />",
      "What is a tradeoff of using Lottie?",
      "Animations look polished, but large or complex JSON files can affect bundle size and performance.",
      ["React Native", "Lottie", "Animation"],
    ),
  },
  "Zustand / Redux Toolkit (same as React)": {
    title: "Zustand / Redux Toolkit (same as React)",
    ...note(
      "React Native can use the same client-state libraries as React web. Zustand is lightweight with selectors, while Redux Toolkit is structured and predictable for larger apps.",
      "const user = useUserStore((state) => state.user);",
      "Does mobile state management differ from web state management?",
      "The core patterns are similar, but mobile often adds offline, persistence, and navigation lifecycle concerns.",
      ["React Native", "State", "Stores"],
    ),
  },
  "MMKV - fast local storage": {
    title: "MMKV - fast local storage",
    ...note(
      "MMKV is a fast key-value storage library for React Native. It is synchronous and commonly used for preferences, cached flags, and performance-sensitive local data.",
      "storage.set('theme', 'dark'); const theme = storage.getString('theme');",
      "Why choose MMKV over AsyncStorage?",
      "MMKV is much faster for frequent small reads and writes, but you still need to choose secure storage for secrets when required.",
      ["React Native", "MMKV", "Storage"],
    ),
  },
  "React Query for mobile": {
    title: "React Query for mobile",
    ...note(
      "React Query manages server data on mobile with caching, retries, refetching, and offline-aware patterns. It helps screens stay responsive across app focus and network changes.",
      "useQuery({ queryKey: ['profile'], queryFn: fetchProfile });",
      "What mobile concerns affect server-state caching?",
      "Network changes, app backgrounding, stale data, retries, and offline fallback all matter more on mobile.",
      ["React Native", "Server state", "Caching"],
    ),
  },
  "Offline-first patterns": {
    title: "Offline-first patterns",
    ...note(
      "Offline-first design lets the app remain useful without a network by caching data locally, queuing mutations, and syncing when connectivity returns.",
      "Save a draft locally, mark it pending, then upload it when the device is online.",
      "What is the hardest part of offline-first apps?",
      "Conflict resolution: deciding what happens when local and server changes disagree.",
      ["React Native", "Offline", "Sync"],
    ),
  },
  "Expo EAS Build - cloud builds": {
    title: "Expo EAS Build - cloud builds",
    eyebrow: "Interview prep",
    quickAnswer:
      "EAS (Expo Application Services) Build is a cloud-based build system that creates native app binaries (IPA/APK/AAB) for iOS and Android without needing a local Mac or complex Android setup.",
    answer:
      "EAS Build is the successor to 'expo build'. It allows you to build custom dev clients and production apps in the cloud. It handles the 'prebuild' step (generating android/ios folders) and compiles the code using hosted workers. You configure it using an 'eas.json' file which defines different profiles (development, preview, production).",
    why: "Accessibility and Speed. Building for iOS usually requires a Mac with Xcode. EAS Build allows Windows/Linux users to build iOS apps and provides a consistent environment for CI/CD.",
    table: {
      headers: ["Build Method", "Requires Mac?", "Custom Native Code?", "Setup Complexity"],
      rows: [
        ["EAS Build (Cloud)", "No", "Yes", "Low"],
        ["Local Build", "Yes (for iOS)", "Yes", "High"],
        ["Old 'expo build'", "No", "No", "Obsolete"],
      ],
    },
    example: `
// eas.json configuration
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}

// Run in terminal: eas build --platform ios --profile production
`,
    interviewQuestion: "What is EAS Build and how does it differ from the legacy 'expo build'?",
    followUp: "How do you handle secrets (like API keys) during an EAS build?",
    takeaway: "Use EAS Build for a hassle-free, cloud-based native build process. Keep your eas.json organized.",
    badges: ["React Native", "Expo", "Deployment"],
  },
  "App signing - Android keystore, iOS certs": {
    title: "App signing - Android keystore, iOS certs",
    ...note(
      "App signing proves the app came from the trusted developer. Android uses keystores, while iOS uses certificates and provisioning profiles.",
      "A production Android build must be signed before Play Store upload.",
      "Why must signing credentials be protected?",
      "If signing keys are lost or leaked, releases can be blocked or app integrity can be compromised.",
      ["React Native", "Signing", "Release"],
    ),
  },
  "OTA updates with EAS Update": {
    title: "OTA updates with EAS Update",
    ...note(
      "Over-the-air updates ship JavaScript and asset changes without a full app store release. They cannot change native code or native permissions already compiled into the binary.",
      "eas update --branch production --message \"Fix onboarding copy\"",
      "What kinds of changes cannot be shipped with OTA updates?",
      "Native module changes, native configuration changes, and permission changes require a new binary.",
      ["React Native", "OTA", "Expo"],
    ),
  },
  "App Store + Play Store submission": {
    title: "App Store + Play Store submission",
    eyebrow: "Interview prep",
    quickAnswer:
      "Submitting involves creating developer accounts, generating production builds (AAB for Android, IPA for iOS), and uploading them via Transporter (iOS) or Play Console (Android).",
    answer:
      "For Android, you need a Google Play Developer account ($25 one-time) and an AAB file. For iOS, you need an Apple Developer Program membership ($99/year) and a Mac to upload the IPA (or use EAS Submit). Both stores require metadata: screenshots, descriptions, privacy policies, and age ratings. App Store review usually takes 24-48 hours, while Play Store is usually faster but can vary.",
    why: "The Final Mile. An app isn't useful until it's in the users' hands. Understanding the requirements for each store prevents last-minute rejections.",
    table: {
      headers: ["Platform", "Format", "Cost", "Review Time"],
      rows: [
        ["Google Play", ".aab", "$25 (One-time)", "1-7 days"],
        ["Apple App Store", ".ipa", "$99 (Annual)", "1-2 days"],
      ],
    },
    example: `
# Using EAS to submit to both stores
eas submit --platform all
`,
    interviewQuestion: "What are the core requirements for submitting an app to the Apple App Store?",
    followUp: "What is the difference between a Keystore (Android) and a Distribution Certificate (iOS)?",
    takeaway: "Prepare metadata and screenshots early. Use EAS Submit to automate the upload process.",
    badges: ["React Native", "Deployment", "App Store"],
  },
  "Environment variables in Expo": {
    title: "Environment variables in Expo",
    ...note(
      "Expo apps can use environment variables for build-time configuration, API URLs, feature flags, and release profiles. Public client values must not contain secrets.",
      "EXPO_PUBLIC_API_URL=https://api.example.com",
      "Can you safely put secret API keys in Expo client environment variables?",
      "No. Anything bundled into the client can be inspected; secrets belong on a backend.",
      ["React Native", "Expo", "Env"],
    ),
  },
  "Node.js event loop and non-blocking I/O": {
    title: "Node.js event loop and non-blocking I/O",
    eyebrow: "Interview prep",
    quickAnswer:
      "Node.js is a single-threaded, non-blocking, event-driven runtime. It offloads I/O tasks to the system (via libuv) so it can handle thousands of concurrent connections without waiting.",
    answer:
      "The 'secret sauce' of Node is the Event Loop. When you do an I/O task (like reading a file or querying a DB), Node doesn't stop and wait. It hands the task to the OS/libuv and moves to the next request. When the I/O is done, a callback is pushed to the task queue. The event loop then picks it up and executes it when the call stack is empty. This is why Node is excellent for I/O-heavy apps but poor for CPU-heavy math.",
    why: "Scaling. Traditional servers (like Apache) create a new thread for every user, which eats memory. Node handles everyone on one thread, making it incredibly lightweight and fast for web traffic.",
    table: {
      headers: ["Phase", "Purpose"],
      rows: [
        ["Timers", "Executes callbacks from setTimeout / setInterval"],
        ["Pending Callbacks", "Executes I/O callbacks deferred from previous cycle"],
        ["Poll", "Retrieves new I/O events; executes I/O scripts"],
        ["Check", "Executes setImmediate callbacks"],
        ["Close", "Executes close events (e.g., socket.on('close'))"],
      ],
    },
    example: `
const fs = require('fs');

console.log('Start');

// Async I/O: Non-blocking
fs.readFile('test.txt', () => {
  console.log('File Read Done');
});

console.log('End');

// Output:
// Start
// End
// File Read Done (after loop finishes)
`,
    interviewQuestion: "Is Node.js truly single-threaded? How does it handle concurrent requests?",
    followUp: "What happens if you run a heavy for-loop (10 billion iterations) in a Node request?",
    takeaway: "Don't block the event loop. Use async APIs for all I/O.",
    badges: ["Node.js", "Event Loop", "Performance"],
  },
  "CommonJS vs ES Modules": {
    title: "CommonJS vs ES Modules",
    ...note(
      "CommonJS uses require and module.exports, while ES Modules use import and export. ESM is standard JavaScript, supports static analysis, and handles top-level await in supported environments.",
      "import express from 'express'; const express = require('express');",
      "What is one practical difference between CommonJS and ESM?",
      "CommonJS loads synchronously at runtime; ESM has static structure and different resolution rules.",
      ["Node.js", "Modules", "ESM"],
    ),
  },
  "fs, path, os, process modules": {
    title: "fs, path, os, process modules",
    ...note(
      "Node core modules provide system access: fs works with files, path handles safe file paths, os exposes machine info, and process exposes runtime arguments, environment, and exit behavior.",
      "const filePath = path.join(process.cwd(), 'data.json');",
      "Why should you use path.join instead of string concatenation for paths?",
      "It handles platform-specific separators and avoids fragile path construction.",
      ["Node.js", "Core modules", "Runtime"],
    ),
  },
  "Streams and Buffers": {
    title: "Streams and Buffers",
    eyebrow: "Interview prep",
    quickAnswer:
      "Buffers represent binary data (raw memory), and Streams process that data chunk by chunk instead of loading everything into memory at once.",
    answer:
      "A Buffer is a fixed-size chunk of memory outside the V8 heap. A Stream is an abstract interface for working with streaming data in Node.js. There are 4 types: Readable (reading), Writable (writing), Duplex (both), and Transform (modifying while reading). Piping streams (e.g., .pipe()) is the most efficient way to move data from a source to a destination without blocking the event loop or running out of memory.",
    why: "Memory Management. If you try to read a 2GB file with fs.readFile, your server will likely crash. With streams, you only ever have a few kilobytes in memory at a time.",
    table: {
      headers: ["Type", "Example", "Usage"],
      rows: [
        ["Readable", "fs.createReadStream()", "Reading a large file"],
        ["Writable", "fs.createWriteStream()", "Writing logs to a file"],
        ["Duplex", "net.Socket", "TCP communication"],
        ["Transform", "zlib.createGzip()", "Compressing data on the fly"],
      ],
    },
    example: `
const fs = require('fs');
const zlib = require('zlib');

// Efficiently zip a file using streams
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'))
  .on('finish', () => console.log('Done!'));
`,
    interviewQuestion: "What is backpressure in Node.js streams? Why is it important?",
    followUp: "What is the difference between a Buffer and a regular JavaScript Array?",
    takeaway: "Use streams for all large data operations to keep memory usage low and the event loop responsive.",
    badges: ["Node.js", "Performance", "Memory"],
  },
  "Child Processes (exec, spawn, fork)": {
    title: "Child Processes (exec, spawn, fork)",
    eyebrow: "Interview prep",
    quickAnswer:
      "The child_process module allows Node.js to run system commands and other scripts in separate processes to avoid blocking the main Event Loop.",
    answer:
      "There are three main methods: 'exec' runs a command in a shell and buffers the output (good for small results). 'spawn' streams the output (best for long-running processes). 'fork' is a specialized version of spawn that creates a new Node instance with an IPC (Inter-Process Communication) channel for easy message passing.",
    why: "CPU-Intensive Tasks. Since Node is single-threaded, a heavy calculation (like image processing) will freeze your server. Offloading these to a child process is how you scale a Node app.",
    table: {
      headers: ["Method", "Shell?", "Output", "Best Use"],
      rows: [
        ["exec", "Yes", "Buffered (Max 200kb)", "Quick Shell scripts"],
        ["spawn", "No", "Streamed", "Large data, long tasks"],
        ["fork", "No", "IPC Channel", "Other Node scripts"],
      ],
    },
    example: `
const { spawn, fork } = require('child_process');

// Streaming a system command
const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', data => console.log(\`Output: \${data}\`));

// Forking a background worker
const worker = fork('./worker.js');
worker.send({ task: 'heavy_calc' });
worker.on('message', result => console.log(result));
`,
    interviewQuestion: "When would you use 'fork' instead of 'spawn'?",
    followUp: "What are the dangers of using 'exec' with user input?",
    takeaway: "Never block the Event Loop. Use fork for Node tasks and spawn for streaming shell tasks.",
    badges: ["Node.js", "Scalability", "Architecture"],
  },
  "npm scripts, package.json, semver": {
    title: "npm scripts, package.json, semver",
    ...note(
      "package.json defines project metadata, scripts, and dependencies. npm scripts automate tasks, and semantic versioning communicates breaking, feature, and patch changes.",
      "\"scripts\": { \"dev\": \"vite\", \"build\": \"vite build\" }",
      "What does ^1.2.3 mean in package.json?",
      "It allows compatible minor and patch updates below 2.0.0, following semver assumptions.",
      ["Node.js", "npm", "Semver"],
    ),
  },
  "Routing - GET/POST/PUT/DELETE/PATCH": {
    title: "Routing - GET/POST/PUT/DELETE/PATCH",
    ...note(
      "Express routes connect HTTP methods and paths to handlers. GET reads, POST creates, PUT replaces, PATCH partially updates, and DELETE removes resources.",
      "app.get('/users/:id', (req, res) => res.json({ id: req.params.id }));",
      "What is the difference between PUT and PATCH?",
      "PUT usually replaces a resource, while PATCH updates selected fields.",
      ["Express", "Routing", "HTTP"],
    ),
  },
  "Middleware - built-in, third-party, custom": {
    title: "Middleware - built-in, third-party, custom",
    eyebrow: "Interview prep",
    quickAnswer:
      "Middleware are functions that have access to the request (req), response (res), and the next middleware function in the cycle. They can modify req/res or end the cycle.",
    answer:
      "Express is essentially a stack of middleware functions. A middleware can: 1) Execute any code. 2) Make changes to the request/response objects. 3) End the request-response cycle. 4) Call 'next()' to pass control to the next function. Common examples include body parsers (express.json), authentication checkers, and error handlers.",
    why: "Modular Logic. Middleware allows you to separate concerns. You can write one 'auth' middleware and apply it to 50 different routes without repeating code.",
    table: {
      headers: ["Type", "Example"],
      rows: [
        ["Built-in", "express.json(), express.static()"],
        ["Third-party", "cors(), helmet(), morgan()"],
        ["Application-level", "app.use((req, res, next) => { ... })"],
        ["Error-handling", "app.use((err, req, res, next) => { ... })"],
      ],
    },
    example: `
// Custom Logging Middleware
const logger = (req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Move to the next middleware
};

app.use(logger);

app.get('/', (req, res) => {
  res.send('Hello World');
});
`,
    interviewQuestion: "What happens if you forget to call next() in a middleware function?",
    followUp: "How do you pass data from one middleware to the next one?",
    takeaway: "Middleware is the backbone of Express. Always call next() or send a response to avoid hanging requests.",
    badges: ["Express", "Middleware", "Backend"],
  },
  "Request/Response cycle": {
    title: "Request/Response cycle",
    ...note(
      "The request-response cycle starts when Express receives a request, runs matching middleware and route handlers, then ends when a response is sent or an error is passed.",
      "app.post('/login', validate, authenticate, sendToken);",
      "Why is it important to return after sending a response in some handlers?",
      "Code after res.send can still run and may try to send another response or perform unwanted work.",
      ["Express", "HTTP", "Lifecycle"],
    ),
  },
  "Error handling middleware (4-param)": {
    title: "Error handling middleware (4-param)",
    ...note(
      "Express error middleware has four parameters: err, req, res, and next. Express calls it when next(error) is used or an async wrapper forwards a failure.",
      "app.use((err, req, res, next) => res.status(500).json({ message: err.message }));",
      "Why does Express error middleware need four parameters?",
      "The four-parameter signature tells Express this middleware handles errors, not normal requests.",
      ["Express", "Errors", "Middleware"],
    ),
  },
  "Router separation - modular routes": {
    title: "Router separation - modular routes",
    eyebrow: "Interview prep",
    quickAnswer:
      "Express Router allows you to group related routes into separate files, keeping the main app.js clean and modular.",
    answer:
      "As an application grows, putting 100 routes in one file becomes unmanageable. express.Router() creates mini-apps that handle their own routes and middleware. You can then mount these routers onto the main app using app.use('/prefix', router). This is essential for building scalable, maintainable backends.",
    why: "Clean Architecture. Separation of concerns makes the code easier to test, find, and update without affecting unrelated parts of the API.",
    table: {
      headers: ["Feature", "Single File", "Modular Router"],
      rows: [
        ["Readability", "Low (Spaghetti code)", "High"],
        ["Scalability", "Hard", "Easy"],
        ["Middleware", "Global only", "Route-group specific"],
        ["Testing", "Difficult", "Can test routers in isolation"],
      ],
    },
    example: `
// user.routes.js
const router = express.Router();
router.get('/profile', getProfile);

// app.js
app.use('/users', userRoutes);
`,
    interviewQuestion: "Why is it important to separate routes in an Express application?",
    followUp: "Can you apply middleware to a specific router instead of the whole app?",
    takeaway: "Use Router for feature-based grouping. Keep app.js for configuration and wiring.",
    badges: ["Express", "Architecture", "Best Practices"],
  },
  "CORS configuration": {
    title: "CORS configuration",
    eyebrow: "Interview prep",
    quickAnswer:
      "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that restricts web pages from making requests to a different domain than the one that served the web page.",
    answer:
      "When a browser makes a cross-origin request (e.g., from localhost:3000 to api.example.com), it first sends a 'Preflight' (OPTIONS) request to check if the server allows the action. The server responds with headers like Access-Control-Allow-Origin. In Express, we use the 'cors' middleware to simplify this configuration. It's critical to whitelist only trusted domains in production instead of using '*', which is a security risk.",
    why: "Browser Security. Without CORS, any website could potentially make requests to your bank's API if you are logged in. CORS ensures that only your authorized frontend can talk to your backend.",
    table: {
      headers: ["Header", "Purpose"],
      rows: [
        ["Access-Control-Allow-Origin", "Specifies which origins are allowed"],
        ["Access-Control-Allow-Methods", "Specifies allowed HTTP methods (GET, POST, etc.)"],
        ["Access-Control-Allow-Headers", "Specifies allowed request headers"],
        ["Access-Control-Allow-Credentials", "Allows sending cookies/auth headers"],
      ],
    },
    example: `
const cors = require('cors');

const corsOptions = {
  origin: 'https://your-frontend.com',
  optionsSuccessStatus: 200,
  credentials: true
};

app.use(cors(corsOptions));
`,
    interviewQuestion: "What is a CORS preflight request? Why does the browser send it?",
    followUp: "How do you enable CORS for multiple specific domains in Express?",
    takeaway: "Whitelisting is safer than '*'. Use the cors middleware for standard configurations.",
    badges: ["Express", "Security", "Networking"],
  },
  "Rate limiting (express-rate-limit)": {
    title: "Rate limiting (express-rate-limit)",
    eyebrow: "Interview prep",
    quickAnswer:
      "Rate limiting is a technique to limit the number of requests a user can make to your API within a specific timeframe.",
    answer:
      "Rate limiting protects your server from 'Brute Force' attacks, Denial of Service (DoS), and API abuse. You can set limits per IP address or per user account. In Express, 'express-rate-limit' is the standard middleware. For distributed systems with multiple servers, you should use a store like Redis to keep track of request counts across all instances.",
    why: "Stability and Cost. One bad script or a malicious user can crash your server by sending millions of requests. Rate limiting ensures fair usage for all users.",
    table: {
      headers: ["Strategy", "Description", "Best Use"],
      rows: [
        ["Fixed Window", "X requests per Y minutes", "General API protection"],
        ["Sliding Window", "X requests in the last Y minutes", "Precise limiting"],
        ["Leaky Bucket", "Steady processing rate", "Traffic shaping"],
        ["Token Bucket", "Allow bursts up to a limit", "Handling peak traffic"],
      ],
    },
    example: `
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: 'Too many requests, please try again later.'
});

app.use('/api/', apiLimiter);
`,
    interviewQuestion: "Why is rate limiting important? How would you implement it in a distributed system?",
    followUp: "What HTTP status code is returned when a user exceeds their rate limit?",
    takeaway: "Use rate limiting on sensitive routes (login, signup) and global API boundaries.",
    badges: ["Express", "Security", "Reliability"],
  },
  "JWT - sign, verify, refresh tokens": {
    title: "JWT - sign, verify, refresh tokens",
    eyebrow: "Interview prep",
    quickAnswer:
      "JWT (JSON Web Token) is a stateless way to handle authentication. It consists of a Header, Payload, and Signature. Tokens are signed by the server to prevent tampering.",
    answer:
      "A common pattern is using a short-lived 'Access Token' (e.g., 15 mins) and a long-lived 'Refresh Token' (e.g., 7 days). The access token is sent in the 'Authorization: Bearer' header for every request. When it expires, the client uses the refresh token (usually stored in an httpOnly cookie) to get a new access token. This minimizes the impact if an access token is stolen.",
    why: "Statelessness. Unlike sessions which require a database lookup for every request, JWTs allow the server to verify the user simply by checking the signature, making it highly scalable for distributed systems.",
    table: {
      headers: ["Token Type", "Lifetime", "Storage", "Purpose"],
      rows: [
        ["Access Token", "Short (5-15m)", "Memory / LocalStorage", "Authorize requests"],
        ["Refresh Token", "Long (7-30d)", "httpOnly Cookie", "Get new access tokens"],
        ["ID Token", "Short", "LocalStorage", "User profile info (OIDC)"],
      ],
    },
    example: `
const jwt = require('jsonwebtoken');

// Sign a token
const accessToken = jwt.sign(
  { userId: 123, role: 'admin' },
  process.env.JWT_SECRET,
  { expiresIn: '15m' }
);

// Verify a token
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded.userId);
} catch (err) {
  console.log('Invalid or Expired Token');
}
`,
    interviewQuestion: "What is the difference between an access token and a refresh token? Why not just use one long-lived token?",
    followUp: "Can you revoke a JWT? If so, how?",
    takeaway: "Keep access tokens short-lived. Use httpOnly cookies for refresh tokens to prevent XSS theft.",
    badges: ["Auth", "JWT", "Security"],
  },
  "bcrypt - password hashing": {
    title: "bcrypt - password hashing",
    eyebrow: "Interview prep",
    quickAnswer:
      "bcrypt is a library for securely hashing passwords. It uses a 'salt' and a 'cost factor' (rounds) to make the hash resistant to brute-force and rainbow table attacks.",
    answer:
      "Passwords should NEVER be stored in plain text or even encrypted. They must be hashed. bcrypt is 'slow' by design. If a hacker steals your database, it will take them years to guess even simple passwords because every single check takes ~100ms. The 'salt' ensures that two users with the same password (e.g., 'password123') will have completely different hashes in the DB.",
    why: "User Privacy. If your DB is compromised, password hashing is the only thing protecting your users' accounts on other websites (since people reuse passwords).",
    table: {
      headers: ["Feature", "Purpose"],
      rows: [
        ["Hashing", "One-way transformation (cannot be reversed)"],
        ["Salting", "Unique random string added to prevent rainbow tables"],
        ["Cost Factor", "Determines how slow the hashing is (CPU intensive)"],
        ["Comparison", "bcrypt.compare() handles the salt internally"],
      ],
    },
    example: `
const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 12; // Standard cost factor
  return await bcrypt.hash(password, saltRounds);
};

const checkPassword = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match; // true or false
};
`,
    interviewQuestion: "Why should you use a library like bcrypt instead of a fast hash like MD5 or SHA256 for passwords?",
    followUp: "What is a rainbow table attack, and how does salting prevent it?",
    takeaway: "Use a high salt round (12+). Never store plain text. Always use bcrypt.compare().",
    badges: ["Auth", "Security", "Hashing"],
  },
  "Cookie-based auth vs Bearer tokens": {
    title: "Cookie-based auth vs Bearer tokens",
    ...note(
      "Cookie auth stores credentials in browser cookies, often httpOnly and secure. Bearer token auth sends a token in the Authorization header, commonly used by APIs and mobile clients.",
      "Authorization: Bearer <access_token>",
      "What is a tradeoff between cookies and bearer tokens?",
      "Cookies can be protected from JavaScript with httpOnly but need CSRF protection; bearer tokens need careful client storage.",
      ["Auth", "Cookies", "Tokens"],
    ),
  },
  "OAuth 2.0 (Google, GitHub login)": {
    title: "OAuth 2.0 (Google, GitHub login)",
    ...note(
      "OAuth 2.0 lets users grant an app limited access through a provider like Google or GitHub. The authorization code flow exchanges a temporary code for tokens on the backend.",
      "User logs in with Google, backend exchanges code, app creates a session.",
      "Why should the authorization code be exchanged on the backend?",
      "It keeps client secrets off the frontend and lets the server validate tokens securely.",
      ["Auth", "OAuth", "SSO"],
    ),
  },
  "helmet.js - HTTP security headers": {
    title: "helmet.js - HTTP security headers",
    ...note(
      "Helmet sets common HTTP security headers for Express apps. It helps reduce risks like clickjacking, MIME sniffing, and insecure browser behavior.",
      "app.use(helmet());",
      "Does Helmet make an app fully secure?",
      "No. It adds useful headers, but you still need auth, validation, safe queries, logging, and secure deployment.",
      ["Express", "Security", "Headers"],
    ),
  },
  "Input validation - express-validator / Zod": {
    title: "Input validation - express-validator / Zod",
    ...note(
      "Input validation checks request data before business logic runs. Libraries like express-validator and Zod validate shape, types, required fields, and constraints.",
      "const schema = z.object({ email: z.string().email(), age: z.number().min(18) });",
      "Why validate on the backend if the frontend already validates?",
      "Clients can be bypassed; backend validation is the real trust boundary.",
      ["Express", "Validation", "Security"],
    ),
  },
  "SQL injection and XSS prevention": {
    title: "SQL injection and XSS prevention",
    eyebrow: "Interview prep",
    quickAnswer:
      "SQL Injection is injecting malicious SQL into queries. XSS is injecting malicious JS into the browser. Prevention: Use parameterized queries for SQL and escape/sanitize output for XSS.",
    answer:
      "SQLi happens when you concatenate user input into a query string: `SELECT * FROM users WHERE name = '` + name + `'`. A hacker can enter `' OR 1=1 --`. To fix this, use placeholders: `WHERE name = $1`. XSS happens when you render raw user input in HTML. Use libraries like DOMPurify or let frameworks like React handle escaping for you.",
    why: "Top OWASP Risks. These are the two most common ways apps get hacked. Mastering these is non-negotiable for a backend developer.",
    table: {
      headers: ["Vulnerability", "Primary Defense"],
      rows: [
        ["SQL Injection", "Parameterized Queries / ORM"],
        ["XSS (Cross-Site Scripting)", "Output Escaping / Content Security Policy (CSP)"],
        ["CSRF", "Anti-CSRF Tokens / SameSite Cookies"],
        ["Brute Force", "Rate Limiting / Account Lockout"],
      ],
    },
    example: `
// BAD (Vulnerable to SQLi)
const query = "SELECT * FROM users WHERE id = " + req.params.id;

// GOOD (Safe)
const query = {
  text: 'SELECT * FROM users WHERE id = $1',
  values: [req.params.id],
};
db.query(query);
`,
    interviewQuestion: "What is SQL injection? How can you prevent it in a Node.js application?",
    followUp: "How does an ORM like Prisma or Mongoose help prevent injection attacks?",
    takeaway: "NEVER trust user input. Use prepared statements for DBs and sanitize all HTML output.",
    badges: ["Security", "OWASP", "Best Practices"],
  },
  "PostgreSQL - queries, joins, indexes": {
    title: "PostgreSQL - queries, joins, indexes",
    ...note(
      "PostgreSQL is a relational database where queries retrieve and transform rows, joins combine tables, and indexes speed up lookups at the cost of extra storage and write overhead.",
      "SELECT users.name, orders.total FROM users JOIN orders ON orders.user_id = users.id;",
      "When should you add an index?",
      "Add indexes for frequent filters, joins, and ordering patterns after checking query plans and real performance needs.",
      ["Database", "PostgreSQL", "Indexes"],
    ),
  },
  "Prisma ORM - models, migrations, relations": {
    title: "Prisma ORM - models, migrations, relations",
    eyebrow: "Interview prep",
    quickAnswer:
      "Prisma is a next-generation Node.js and TypeScript ORM. It uses a declarative schema file to define your database models and provides a type-safe client for queries.",
    answer:
      "Unlike traditional ORMs where you define models in JS classes, Prisma uses its own `schema.prisma` file. This acts as the single source of truth. Prisma Migrate then generates SQL migrations to keep your DB in sync with the schema. The Prisma Client is auto-generated based on your schema, providing perfect auto-complete and type safety for your queries.",
    why: "Developer Experience (DX). Prisma eliminates entire categories of bugs related to incorrect table names or missing fields. It makes complex joins feel like simple object access.",
    table: {
      headers: ["Feature", "Prisma", "TypeORM / Sequelize"],
      rows: [
        ["Schema Definition", "Custom DSL (.prisma)", "JS/TS Classes & Decorators"],
        ["Type Safety", "Auto-generated Client", "Manual Interfaces"],
        ["Migrations", "Prisma Migrate (Declarative)", "Manual Migration Files"],
        ["Relations", "Implicit & Explicit", "Explicit Decorators"],
      ],
    },
    example: `
// 1. Define in schema.prisma
// model User { id Int @id; email String; posts Post[] }

// 2. Use in code
const usersWithPosts = await prisma.user.findMany({
  where: { email: { contains: 'gmail.com' } },
  include: { posts: true }, // Simple Joins!
});
`,
    interviewQuestion: "What are the advantages of using Prisma over a traditional ORM like Sequelize?",
    followUp: "How does Prisma handle database migrations?",
    takeaway: "Use Prisma for modern, type-safe database access. Keep your schema file organized and always run 'prisma generate' after changes.",
    badges: ["Database", "ORM", "Prisma"],
  },
  "MongoDB + Mongoose": {
    title: "MongoDB + Mongoose",
    ...note(
      "MongoDB stores document data, and Mongoose adds schemas, validation, models, and query helpers for Node apps. It works well when data is naturally document-shaped.",
      "const user = await User.findById(id);",
      "How is MongoDB modeling different from relational modeling?",
      "MongoDB often embeds related data in documents, while relational databases usually normalize across tables.",
      ["Database", "MongoDB", "Mongoose"],
    ),
  },
  "Redis - caching, sessions, pub/sub": {
    title: "Redis - caching, sessions, pub/sub",
    ...note(
      "Redis is an in-memory data store used for fast caching, sessions, queues, rate limits, locks, and pub/sub messaging.",
      "await redis.set(`user:${id}`, JSON.stringify(user), { EX: 300 });",
      "What is the risk of caching data in Redis?",
      "Cached data can become stale, so you need expiration, invalidation, and clear ownership of source-of-truth data.",
      ["Database", "Redis", "Cache"],
    ),
  },
  "Connection pooling": {
    title: "Connection pooling",
    ...note(
      "Connection pooling reuses a fixed set of database connections instead of opening a new connection per request. It improves performance and protects the database from too many connections.",
      "const pool = new Pool({ max: 10 });",
      "Why can too many database connections hurt performance?",
      "Each connection consumes database resources; beyond a limit, more connections add contention instead of throughput.",
      ["Database", "Pooling", "Performance"],
    ),
  },
  "Database transactions": {
    title: "Database transactions",
    ...note(
      "A transaction groups database operations so they either all commit or all roll back. It protects consistency when multiple related writes must succeed together.",
      "await prisma.$transaction([debitAccount(), creditAccount()]);",
      "When do you need a transaction?",
      "Use one when partial success would corrupt business rules, like payments, inventory, or multi-table updates.",
      ["Database", "Transactions", "Consistency"],
    ),
  },
  "REST API design - resources, status codes, versioning": {
    title: "REST API design - resources, status codes, versioning",
    eyebrow: "Interview prep",
    quickAnswer:
      "REST (Representational State Transfer) is an architectural style for designing APIs. It uses resources (URLs), HTTP methods (verbs), and status codes (results).",
    answer:
      "A good REST API follows predictable patterns. Resources should be nouns (`/users`), not verbs (`/getUsers`). Methods define the action: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove). Versioning (e.g., `/v1/`) is essential to avoid breaking changes for clients as your API evolves.",
    why: "Predictability. When you follow REST standards, other developers can guess how to use your API without reading every line of documentation.",
    table: {
      headers: ["Status Code", "Meaning", "Example"],
      rows: [
        ["200 OK", "Success", "GET /users"],
        ["201 Created", "Success (Resource created)", "POST /users"],
        ["400 Bad Request", "Client Error (Bad input)", "Invalid JSON"],
        ["401 Unauthorized", "Client Error (Missing auth)", "No JWT"],
        ["403 Forbidden", "Client Error (Insufficient rights)", "Not an admin"],
        ["404 Not Found", "Client Error (Missing resource)", "Wrong ID"],
        ["500 Internal Server Error", "Server Error (App crashed)", "DB connection failed"],
      ],
    },
    example: `
// RESTful URL Structure
GET    /api/v1/posts       // List all posts
POST   /api/v1/posts       // Create a post
GET    /api/v1/posts/123   // Get specific post
PATCH  /api/v1/posts/123   // Update post
DELETE /api/v1/posts/123   // Delete post
`,
    interviewQuestion: "What makes an API RESTful? Give examples of 3 different HTTP status codes.",
    followUp: "Why is versioning important in API design?",
    takeaway: "Use plural nouns for resources. Be strict with status codes. Always version your API.",
    badges: ["API", "REST", "Architecture"],
  },
  "File uploads - Multer + cloud storage (S3/Cloudinary)": {
    title: "File uploads - Multer + cloud storage (S3/Cloudinary)",
    ...note(
      "Multer parses multipart file uploads in Express, while cloud storage like S3 or Cloudinary stores files outside the app server. The API should validate size, type, and ownership.",
      "app.post('/upload', upload.single('avatar'), uploadAvatar);",
      "Why should uploaded files usually not be stored only on the Node server disk?",
      "Server disks may be ephemeral, hard to scale, and not ideal for CDN delivery or backups.",
      ["API", "Uploads", "Storage"],
    ),
  },
  "Pagination - cursor vs offset": {
    title: "Pagination - cursor vs offset",
    eyebrow: "Interview prep",
    quickAnswer:
      "Offset pagination skips records (LIMIT 10 OFFSET 20). Cursor pagination uses a stable marker (e.g., createdAt timestamp) to fetch the next set of results.",
    answer:
      "Offset pagination is easier to implement but gets slow as you skip more rows (DB still has to read all skipped rows). It also suffers from 'drifting'—if a new item is added while you're paging, you might see the same item twice. Cursor pagination is much faster for large datasets and is the standard for 'infinite scroll' feeds.",
    why: "Performance at Scale. For a table with 1 million rows, `OFFSET 900000` can take several seconds, while a cursor-based query will remain constant speed.",
    table: {
      headers: ["Feature", "Offset Pagination", "Cursor Pagination"],
      rows: [
        ["Ease of Use", "High (Easy to jump to page 5)", "Low (Hard to jump)"],
        ["Performance", "Degrades with depth", "Constant / High"],
        ["Drift Resistance", "Poor (shows duplicates)", "Excellent"],
        ["Best for", "Admin Tables / Small Data", "Social Feeds / Large Data"],
      ],
    },
    example: `
// Offset (Simple)
// SELECT * FROM posts LIMIT 10 OFFSET 20;

// Cursor (Performant)
// SELECT * FROM posts WHERE id > 123 LIMIT 10;
`,
    interviewQuestion: "What is the main drawback of offset-based pagination in a large database?",
    followUp: "How does cursor-based pagination handle the 'drifting' data problem?",
    takeaway: "Use Offset for simple search results. Use Cursors for infinite feeds or massive tables.",
    badges: ["API", "Performance", "Database"],
  },
  "WebSockets - Socket.io rooms, events": {
    title: "WebSockets - Socket.io rooms, events",
    ...note(
      "WebSockets keep a persistent two-way connection between client and server. Socket.io adds events, rooms, reconnection, and fallbacks for real-time features.",
      "io.to(roomId).emit('message:new', message);",
      "When would you choose WebSockets over normal HTTP?",
      "Use WebSockets for low-latency real-time updates like chat, live dashboards, games, or collaboration.",
      ["API", "WebSockets", "Realtime"],
    ),
  },
  "GraphQL basics - schema, resolvers": {
    title: "GraphQL basics - schema, resolvers",
    ...note(
      "GraphQL exposes a typed schema where clients ask for exactly the fields they need. Resolvers are functions that fetch or compute data for schema fields.",
      "type User { id: ID!, name: String! }",
      "What problem does GraphQL solve compared with some REST APIs?",
      "It reduces over-fetching and under-fetching by letting clients request precise data shapes.",
      ["API", "GraphQL", "Schema"],
    ),
  },
  "Webhooks - receiving and sending": {
    title: "Webhooks - receiving and sending",
    ...note(
      "Webhooks are HTTP callbacks sent when an external event happens. Receivers must verify signatures, handle retries, process idempotently, and respond quickly.",
      "app.post('/webhooks/stripe', verifySignature, handleStripeEvent);",
      "Why is idempotency important for webhooks?",
      "Providers may retry events, so processing the same event twice must not duplicate payments, emails, or state changes.",
      ["API", "Webhooks", "Integrations"],
    ),
  },
  "Environment variables - dotenv, .env.example": {
    title: "Environment variables - dotenv, .env.example",
    ...note(
      "Environment variables configure apps per environment without hardcoding secrets or deployment-specific values. .env.example documents required variables without real secrets.",
      "DATABASE_URL=postgres://user:pass@host:5432/app",
      "Why should .env not be committed but .env.example should?",
      ".env contains secrets; .env.example documents configuration needed by teammates and deployments.",
      ["DevOps", "Environment", "Secrets"],
    ),
  },
  "Docker - Dockerfile, docker-compose": {
    title: "Docker - Dockerfile, docker-compose",
    eyebrow: "Interview prep",
    quickAnswer:
      "Docker is a tool to containerize applications. A Dockerfile defines the app's environment, and Docker Compose manages multi-container setups (like an app + its database).",
    answer:
      "Docker ensures 'it works on my machine' works everywhere. A Dockerfile is a set of instructions to build an image: `FROM node`, `COPY . .`, `RUN npm install`, `CMD [\"npm\", \"start\"]`. Docker Compose is a YAML file that orchestrates multiple images, allowing you to spin up your entire backend stack (Node, Redis, Postgres) with a single command.",
    why: "Consistency and Portability. Without Docker, setting up a project can take hours of installing local DBs and specific Node versions. With Docker, it's one command: `docker-compose up`.",
    table: {
      headers: ["Term", "Meaning"],
      rows: [
        ["Image", "A read-only blueprint for a container"],
        ["Container", "A running instance of an image"],
        ["Dockerfile", "The build instructions for an image"],
        ["Volume", "Persistent data storage outside the container"],
      ],
    },
    example: `
# Basic Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
`,
    interviewQuestion: "What is the difference between a Docker Image and a Container?",
    followUp: "How do you keep your Docker images small for production?",
    takeaway: "Containerize your app early. Use multi-stage builds and alpine images to keep things light.",
    badges: ["DevOps", "Docker", "Containers"],
  },
  "Deploy to Railway / Render / Fly.io": {
    title: "Deploy to Railway / Render / Fly.io",
    ...note(
      "Platforms like Railway, Render, and Fly.io deploy Node apps by connecting a repo, setting build/start commands, configuring environment variables, and attaching services like databases.",
      "Set build command: npm install && npm run build; start command: npm start.",
      "What must be configured before deploying a backend?",
      "Environment variables, database connection, start command, health checks, logs, and production CORS/security settings.",
      ["DevOps", "Deployment", "Hosting"],
    ),
  },
  "GitHub Actions - CI/CD pipelines": {
    title: "GitHub Actions - CI/CD pipelines",
    eyebrow: "Interview prep",
    quickAnswer:
      "GitHub Actions is a CI/CD platform that lets you automate your build, test, and deployment pipeline directly from your GitHub repository.",
    answer:
      "Workflows are defined in YAML files in the `.github/workflows` folder. You can trigger them on `push`, `pull_request`, or a schedule. A typical pipeline: 1) Checkout code. 2) Install dependencies. 3) Run Linter. 4) Run Tests. 5) Build Docker image. 6) Deploy to production. This ensures that only high-quality, tested code ever reaches your users.",
    why: "Automation. Manual deployments are prone to human error. CI/CD catches bugs before they reach production and makes the release process fast and predictable.",
    table: {
      headers: ["Component", "Purpose"],
      rows: [
        ["Workflow", "The overall automated process (YAML)"],
        ["Job", "A set of steps that run on the same runner"],
        ["Step", "An individual task (e.g., run npm test)"],
        ["Action", "A reusable standalone command"],
      ],
    },
    example: `
name: Node.js CI
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
`,
    interviewQuestion: "What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?",
    followUp: "How do you securely handle API keys in a GitHub Action?",
    takeaway: "Automate everything. Never deploy code that hasn't passed your test suite in CI.",
    badges: ["DevOps", "CI/CD", "GitHub"],
  },
  "Logging - Winston / Morgan": {
    title: "Logging - Winston / Morgan",
    ...note(
      "Morgan logs HTTP request details, while Winston creates structured application logs with levels, formats, and transports. Good logs explain what happened without exposing secrets.",
      "logger.info('User created', { userId });",
      "What makes production logs useful?",
      "Structured fields, request IDs, clear levels, timestamps, and no sensitive data.",
      ["Node.js", "Logging", "Observability"],
    ),
  },
  "PM2 - process management": {
    title: "PM2 - process management",
    ...note(
      "PM2 is a Node process manager that keeps apps running, restarts crashes, manages logs, and can run clustered processes.",
      "pm2 start server.js --name api",
      "Why use a process manager in production?",
      "It restarts failed processes, manages lifecycle commands, and improves operational reliability.",
      ["Node.js", "PM2", "Production"],
    ),
  },
  "Nginx basics - reverse proxy": {
    title: "Nginx basics - reverse proxy",
    eyebrow: "Interview prep",
    quickAnswer:
      "Nginx is a high-performance web server and reverse proxy. It acts as a 'front door' for your Node.js apps, handling SSL, load balancing, and static file serving.",
    answer:
      "Instead of exposing your Node.js app directly to the internet on port 3000, you put Nginx on port 80/443. It receives the request and forwards (proxies) it to Node. Nginx is much faster than Node at serving images/CSS and handling many concurrent TCP connections. It's also where you typically install your SSL certificates (Let's Encrypt).",
    why: "Security and Efficiency. Nginx protects your app from direct exposure and takes the heavy lifting of SSL and static assets off of Node's single thread.",
    table: {
      headers: ["Feature", "Why it helps"],
      rows: [
        ["SSL Termination", "Handles HTTPS encryption efficiently"],
        ["Load Balancing", "Distributes traffic across multiple Node instances"],
        ["Gzip", "Compresses responses to save bandwidth"],
        ["Static Serving", "Serves images/JS without touching Node"],
      ],
    },
    example: `
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
`,
    interviewQuestion: "Why should you use Nginx as a reverse proxy instead of exposing Node.js directly?",
    followUp: "What is the difference between a forward proxy and a reverse proxy?",
    takeaway: "Nginx is the production standard for proxying. Use it for SSL, static files, and security hardening.",
    badges: ["DevOps", "Nginx", "Security"],
  },
};
