export const topics = [
  {
    id: "introduction",
    title: "Introduction",
    category: "Basics",
    readingTime: "3 min",
    difficulty: "Beginner",
    introduction: "JavaScript is a <u>lightweight</u>, interpreted, or JIT-compiled programming language with first-class functions. It is best known as the scripting language for Web pages.",
    //introduction: "<div class=\"flex flex-col md:flex-row w-full bg-yellow-300 p-2\"><div class=\"w-full md:w-1/3 bg-rose-600 text-white\">01</div><div class=\"w-full md:w-1/3 bg-rose-600 text-white\"><a href='https://www.wander.com/'>02</a></div><div class=\"w-full md:w-1/3 bg-rose-600 text-white\">03</div></div>",
    sections: [
      // {
      //   title: "Test Image",
      //   content: "I test this has work or not",
      //   image: "https://media.geeksforgeeks.org/wp-content/uploads/20230929165105/JavaScript-Courses-&-Certifications.png" // Just place this file in public/images/
      // },
      {
        title: "What is JavaScript?",
        content: "JavaScript is a multi-paradigm language: it supports event-driven, functional, and prototype-based programming styles. Initially used only in web browsers, it has now expanded to server-side environments (Node.js) and mobile application frameworks.",
        code: `// A simple greeting function
function greet(user) {
  return \`Hello, \${user}! Welcome to JavaScript.\`;
}

console.log(greet("Developer"));`
      },
      {
        title: "How It Works",
        content: "Modern JavaScript engines, like V8 (Chrome/Node.js) and SpiderMonkey (Firefox), compile JavaScript code into optimized machine code just-in-time (JIT) before running it.",
        code: `// Dynamic typing in action
let value = 42;       // value is a Number
value = "Now a string"; // value is now a String
console.log(value);`
      }
    ],
    practiceQAs: [
      {
        question: "Write a script that checks if a variable is defined and prints its type.",
        answer: "You can use the typeof operator. It returns a string representing the type of the unevaluated operand, returning 'undefined' for uninitialized variables.",
        example: "let x;\nconsole.log(typeof x); // \"undefined\"\nx = 42;\nconsole.log(typeof x); // \"number\""
      }
    ],
    interviewQAs: [
      {
        question: "Is JavaScript an interpreted or compiled language?",
        answer: "Modern JavaScript is JIT-compiled (Just-In-Time compiled). While historically classified as an interpreted scripting language, engines like V8 compile source code directly into native machine code at runtime for optimized execution speeds.",
        example: `// Engines optimize hot paths like this loop
for (let i = 0; i < 1000000; i++) {
  // Compiled to optimized machine instructions on the fly
}`
      }
    ]
  },
  {
    id: "variables",
    title: "Variables",
    category: "Basics",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "Variables are containers for storing data values. JavaScript supports three declaration keywords: var, let, and const.",
    sections: [
      {
        title: "var vs let vs const",
        content: "var is function-scoped and hoisted. let and const are block-scoped, introduce a Temporal Dead Zone (TDZ) before declaration, and const variables cannot be reassigned.",
        code: `// var is function scoped
var x = 10;

// let is block scoped
let y = 20;
y = 25; // Reassignment is OK 

// const is block scoped and constant
const z = 30;
// z = 35; // TypeError: Assignment to constant variable.`
      },
      {
        title: "Temporal Dead Zone (TDZ)",
        content: "A let or const variable cannot be accessed before its declaration line. Accessing it throws a ReferenceError. This region is called the TDZ.",
        code: `function testTDZ() {
  // console.log(a); // ReferenceError: Cannot access 'a' before initialization
  let a = 5;
  console.log(a); // 5
}`
      }
    ],
    practiceQAs: [
      {
        question: "Write a code snippet to demonstrate variable hoisting with var versus let.",
        answer: "var declarations are hoisted and initialized as undefined. let declarations are hoisted but not initialized (they sit in the Temporal Dead Zone), throwing a ReferenceError if accessed early.",
        example: "console.log(a); // undefined\nvar a = 1;\n\ntry {\n  console.log(b); // ReferenceError\n  let b = 2;\n} catch (e) {\n  console.log(e.name); // \"ReferenceError\"\n}"
      }
    ],
    interviewQAs: [
      {
        question: "What is the Temporal Dead Zone (TDZ) in let/const?",
        answer: "The TDZ is the period between entering a block scope and the actual line of code where a let or const variable is declared. During this time, the variable exists in memory but cannot be accessed; doing so throws a ReferenceError.",
        example: `function checkTDZ() {
  // console.log(x); // Throws ReferenceError (TDZ active)
  let x = 10;      // TDZ ends for x
  console.log(x);  // 10 (safe to access)
}`
      },
      {
        question: "Why is it generally recommended to use 'const' over 'let' or 'var'?",
        answer: "Using 'const' enforces immutability of the variable reference, making code easier to reason about, preventing accidental reassignments, and allowing compiler optimizations. 'let' should only be used when variable re-assignment is explicitly required.",
        example: `const user = { name: "John" };
user.name = "Bob"; // Mutation is allowed (reference is not changed)
// user = {};      // Reassignment throws TypeError! (reference is locked)`
      }
    ]
  },
  {
    id: "data-types",
    title: "Data Types",
    category: "Basics",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "JavaScript is dynamically typed. It has 7 primitive types and 1 object type.",
    sections: [
      {
        title: "Primitive Types",
        content: "Primitives are immutable values stored directly in the call stack. They include: Number, String, Boolean, Undefined, Null, Symbol, and BigInt.",
        code: `const age = 30;             // Number
const name = "Sanjib";      // String
const isDev = true;         // Boolean
let job;                    // Undefined
const car = null;           // Null
const sym = Symbol("id");   // Symbol
const largeNum = 9007199254740991n; // BigInt`
      },
      {
        title: "Object Types",
        content: "Objects are mutable collections of key-value pairs stored in the heap, referenced by a memory pointer. Functions, arrays, and regular objects are all object types.",
        code: `const person = { name: "Alice", age: 25 };
const numbers = [1, 2, 3];
const greet = function() { return "Hi"; };

console.log(typeof person);  // "object"
console.log(typeof numbers); // "object"
console.log(typeof greet);   // "function"`
      }
    ],
    practiceQAs: [
      {
        question: "How can you check if a value is a primitive value or an object?",
        answer: "A value is an object if typeof value === 'object' and it is not null, or if it is a function. Otherwise, it is a primitive (string, number, boolean, symbol, undefined, bigint, or null).",
        example: "function isPrimitive(val) {\n  return val === null || (typeof val !== 'object' && typeof val !== 'function');\n}\nconsole.log(isPrimitive(42));     // true\nconsole.log(isPrimitive({}));     // false\nconsole.log(isPrimitive(null));   // true"
      }
    ],
    interviewQAs: [
      {
        question: "Why does typeof null evaluate to 'object'?",
        answer: "This is a historical bug in the initial implementation of JavaScript. Values were stored in 32-bit units with type tags. The object tag was 000, and null represented the null pointer (all zeroes), causing null to be incorrectly tagged as an object.",
        example: `const val = null;
console.log(typeof val); // "object"

// Safe null check
const isNull = (x) => x === null;
console.log(isNull(val)); // true`
      },
      {
        question: "What is the difference between Primitive types and Object types regarding memory allocation?",
        answer: "Primitive values are stored directly on the execution stack (static size, immutable). Objects (including Arrays and Functions) are allocated on the heap (dynamic size, mutable) and accessed via stack reference pointers.",
        example: `// Primitive mutation copy
let a = 10;
let b = a;
b = 20; // a remains 10

// Object reference copy
let objA = { val: 10 };
let objB = objA;
objB.val = 20; // objA.val is now 20! (Points to same heap reference)`
      }
    ]
  },
  {
    id: "operators",
    title: "Operators",
    category: "Basics",
    readingTime: "5 min",
    difficulty: "Beginner",
    introduction: "Operators carry out operations on values and variables. Key categories include arithmetic, assignment, comparison, logical, and newer nullish operators.",
    sections: [
      {
        title: "Comparison Operators",
        content: "JavaScript distinguishes strict equality (===) from abstract equality (==). Strict equality compares both value and type, while abstract equality performs type coercion.",
        code: `console.log(5 == "5");  // true (abstract equality)
console.log(5 === "5"); // false (strict equality)
console.log(null === undefined); // false
console.log(null == undefined);  // true`
      },
      {
        title: "Nullish Coalescing (??)",
        content: "The ?? operator returns its right-hand side operand when its left-hand side is null or undefined, unlike || which checks for falsy values (like 0 or empty string).",
        code: `const count = 0;
const defaultCount = count || 10;  // 10 (since 0 is falsy)
const actualCount = count ?? 10;   // 0 (since 0 is not null/undefined)

console.log(defaultCount);
console.log(actualCount);`
      }
    ],
    practiceQAs: [
      {
        question: "Implement a function that performs division and returns both the quotient and the remainder.",
        answer: "You can use the division operator '/' combined with Math.floor() to extract the quotient, and the modulo operator '%' to capture the remainder.",
        example: "const divide = (a, b) => ({\n  quotient: Math.floor(a / b),\n  remainder: a % b\n});\nconsole.log(divide(10, 3)); // { quotient: 3, remainder: 1 }"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between standard OR (||) and Nullish Coalescing (??)?",
        answer: "The || operator returns the right-hand value for any falsy left-hand value (0, empty string, false, NaN, null, undefined). The ?? operator only returns the right-hand value when the left-hand side is null or undefined, allowing falsy but valid values like 0 or empty strings to persist.",
        example: `const userSpeed = 0;
const speed1 = userSpeed || 50;  // 50 (0 is falsy)
const speed2 = userSpeed ?? 50;  // 0  (0 is not nullish)`
      }
    ]
  },
  {
    id: "type-conversion",
    title: "Type Conversion",
    category: "Basics",
    readingTime: "4 min",
    difficulty: "Intermediate",
    introduction: "Type conversion is the process of converting a value from one type to another. It can be explicit (coercion by the developer) or implicit (handled automatically by the JS engine).",
    sections: [
      {
        title: "Explicit Type Conversion",
        content: "Developers convert types explicitly using standard constructors like Number(), String(), and Boolean().",
        code: `const numStr = "123";
const num = Number(numStr); // Explicit to Number
const str = String(num);    // Explicit to String
const bool = Boolean(1);    // Explicit to Boolean (true)`
      },
      {
        title: "Implicit Type Coercion",
        content: "JavaScript automatically coerces values in certain operations. For instance, addition with a string results in string concatenation.",
        code: `console.log("5" + 2);  // "52" (String addition)
console.log("5" - 2);  // 3 (String subtraction coerced to number)
console.log(true + 1); // 2 (true is coerced to 1)
console.log(!"");      // true (empty string is falsy)`
      }
    ],
    practiceQAs: [
      {
        question: "Show how to safely convert a string representation of a binary number (e.g. '1010') to its decimal equivalent.",
        answer: "Use the global parseInt(string, radix) function and pass 2 as the radix (base) parameter to specify binary parsing.",
        example: "const binaryStr = \"1010\";\nconst decimalVal = parseInt(binaryStr, 2);\nconsole.log(decimalVal); // 10"
      }
    ],
    interviewQAs: [
      {
        question: "Why does [] + [] evaluate to empty string, while [] + {} evaluates to '[object Object]'?",
        answer: "In both cases, addition (+) triggers implicit type coercion to string. An empty array [] coerces to an empty string ''. Thus, [] + [] is '' + '', yielding ''. An empty object {} coerces to '[object Object]', yielding '' + '[object Object]', which results in '[object Object]'.",
        example: `console.log([] + []); // ""
console.log([] + {}); // "[object Object]"
console.log({} + []); // "[object Object]" (depending on parser context)`
      }
    ]
  },
  {
    id: "control-flow",
    title: "Control Flow",
    category: "Basics",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "Control flow defines the order in which individual statements or instructions are executed in a program.",
    sections: [
      {
        title: "Conditional Statements",
        content: "Use if-else statements for branching logic and switch-case statements for checking matching values.",
        code: `const hour = 14;
if (hour < 12) {
  console.log("Good morning");
} else if (hour < 18) {
  console.log("Good afternoon");
} else {
  console.log("Good evening");
}`
      },
      {
        title: "Error Handling (try-catch)",
        content: "Use try-catch block to handle runtime errors without crashing the entire script. The finally block executes regardless of the outcome.",
        code: `try {
  let result = riskyOperation();
} catch (error) {
  console.error("An error occurred:", error.message);
} finally {
  console.log("This will always run");
}`
      }
    ],
    practiceQAs: [
      {
        question: "Write a switch-case statement that handles string categories ('mammal', 'bird') and defaults to 'unknown'.",
        answer: "A switch statement evaluates an expression and matches its value against case clauses, executing corresponding blocks of code. Use a default case to catch unhandled values.",
        example: "const getSpecies = (cat) => {\n  switch(cat) {\n    case \mammal\: return \"Dog\";\n    case \bird\: return \"Eagle\";\n    default: return \"Unknown\";\n  }\n};\nconsole.log(getSpecies(\"mammal\")); // \"Dog\"\nconsole.log(getSpecies(\"fish\"));   // \"Unknown\""
      }
    ],
    interviewQAs: [
      {
        question: "Does the code in a 'finally' block run if the 'try' or 'catch' block contains a 'return' statement?",
        answer: "Yes, the finally block will always execute even if there is an explicit return statement inside the try or catch block. In fact, if the finally block itself returns a value, that return value will override any returns made in try/catch.",
        example: `function testFinally() {
  try {
    return 1;
  } finally {
    return 2; // Overrides the previous return 1
  }
}
console.log(testFinally()); // 2`
      }
    ]
  },
  {
    id: "functions",
    title: "Functions",
    category: "Core Concepts",
    readingTime: "5 min",
    difficulty: "Beginner",
    introduction: "Functions are block of codes designed to perform a particular task. They are first-class citizens in JavaScript.",
    sections: [
      {
        title: "Declaration vs Expression vs Arrow",
        content: "Function declarations are hoisted, function expressions are not. Arrow functions provide a shorter syntax and capture 'this' lexically from their surrounding context.",
        code: `// Function Declaration (Hoisted)
function add(a, b) { return a + b; }

// Function Expression (Not Hoisted)
const subtract = function(a, b) { return a - b; };

// Arrow Function (Lexical 'this')
const multiply = (a, b) => a * b;`
      },
      {
        title: "First-Class Citizens",
        content: "Functions can be passed as arguments, returned from other functions, and assigned as property values to variables or objects.",
        code: `// Passing a function as a callback
const runOperation = (a, b, op) => op(a, b);
const result = runOperation(5, 4, multiply); // 20
console.log(result);`
      }
    ],
    practiceQAs: [
      {
        question: "Create an arrow function that returns the square of a number, and rewrite it as a standard function declaration.",
        answer: "Arrow functions use shorthand syntax and bind this lexically. Standard function declarations are hoisted to the top of their scope and bind their own this context.",
        example: "const squareArrow = x => x * x;\n\nfunction squareDec(x) {\n  return x * x;\n}\nconsole.log(squareArrow(5)); // 25\nconsole.log(squareDec(5));   // 25"
      }
    ],
    interviewQAs: [
      {
        question: "How does the 'this' binding differ between standard functions and arrow functions?",
        answer: "Standard functions bind 'this' dynamically based on how they are called (e.g., as an object method, constructor, or simple call). Arrow functions do not have their own 'this' binding; they resolve 'this' lexically, inheriting it from the enclosing execution context.",
        example: `const obj = {
  name: "Alice",
  regular: function() { console.log(this.name); },
  arrow: () => { console.log(this.name); }
};
obj.regular(); // "Alice"
obj.arrow();   // undefined (inherits global/window context)`
      }
    ]
  },
  {
    id: "scope",
    title: "Scope",
    category: "Core Concepts",
    readingTime: "4 min",
    difficulty: "Intermediate",
    introduction: "Scope determines the accessibility or visibility of variables in different parts of your code.",
    sections: [
      {
        title: "Types of Scope",
        content: "JavaScript features three main types of scope: Global scope (accessible everywhere), Function scope (declared inside a function), and Block scope (let/const declared inside curly braces {}).",
        code: `const globalVar = "I am global";

function scopeDemo() {
  const functionVar = "I am function-scoped";
  if (true) {
    const blockVar = "I am block-scoped";
    var functionScopedVar = "I am function-scoped despite 'if'";
  }
  // console.log(blockVar); // ReferenceError
  console.log(functionScopedVar); // OK
}`
      },
      {
        title: "The Scope Chain",
        content: "If the engine cannot find a variable in the local scope, it looks outward to the parent scope, continuing up to the global scope.",
        code: `const outer = "Outer";
function outerFunc() {
  const inner = "Inner";
  function innerFunc() {
    console.log(\`\${inner} & \${outer}\`); // Accesses parents
  }
  innerFunc();
}`
      }
    ],
    practiceQAs: [
      {
        question: "Write a snippet that defines a global, a block, and a function-scoped variable, demonstrating their access boundaries.",
        answer: "Global variables are accessible anywhere. Block-scoped let/const are restricted to their enclosing brackets {}. Function-scoped var is accessible throughout the declaring function.",
        example: "const globalVal = \"global\";\nfunction scopeTest() {\n  var funcVal = \"func\";\n  if (true) {\n    let blockVal = \"block\";\n    console.log(globalVal, funcVal, blockVal); // All accessible\n  }\n  // console.log(blockVal); // ReferenceError: blockVal is not defined\n}"
      }
    ],
    interviewQAs: [
      {
        question: "What is lexical scoping?",
        answer: "Lexical scoping (also called static scoping) means that variable scope is determined by the physical location of the variable declaration in the source code at compile time, not by how functions are invoked at runtime.",
        example: `const name = "Global";
function first() {
  console.log(name); // Lexically looks up to global scope
}
function second() {
  const name = "Local";
  first(); // Prints "Global", not "Local"
}
second();`
      }
    ]
  },
  {
    id: "hoisting",
    title: "Hoisting",
    category: "Core Concepts",
    readingTime: "4 min",
    difficulty: "Intermediate",
    introduction: "Hoisting is the behavior where variable and function declarations are moved to the top of their containing scope during compilation.",
    sections: [
      {
        title: "Variable Hoisting",
        content: "var variables are hoisted with a value of undefined. let and const variables are hoisted but reside in the Temporal Dead Zone (TDZ) and cannot be read before their declarations.",
        code: `console.log(myVar); // undefined
var myVar = 2;

// console.log(myLet); // ReferenceError
let myLet = 3;`
      },
      {
        title: "Function Hoisting",
        content: "Function declarations are fully hoisted, meaning they can be invoked before they are declared in the script file.",
        code: `hoistedFunc(); // "I am hoisted!"

function hoistedFunc() {
  console.log("I am hoisted!");
}`
      }
    ],
    practiceQAs: [
      {
        question: "What is the output of calling a function declaration before it is defined, and why?",
        answer: "Function declarations are fully hoisted (meaning their entire definition is moved to the top of their scope at compile time), allowing them to be called before their definition lines.",
        example: "sayHello(); // Output: \"Hello!\"\n\nfunction sayHello() {\n  console.log(\"Hello!\");\n}"
      }
    ],
    interviewQAs: [
      {
        question: "What happens when a variable and a function share the same name in the same scope, regarding hoisting?",
        answer: "Function declarations are hoisted before variable declarations. However, if a variable is assigned a value later in the execution flow, it will overwrite the reference to the hoisted function.",
        example: `console.log(typeof foo); // "function" (hoisted first)
var foo = "Now a string";  // Assignment happens at runtime
console.log(typeof foo); // "string"

function foo() {}`
      }
    ]
  },
  {
    id: "closures",
    title: "Closures",
    category: "Core Concepts",
    readingTime: "5 min",
    difficulty: "Advanced",
    introduction: "A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).",
    sections: [
      {
        title: "Lexical Scoping in Action",
        content: "Closures allow an inner function to access variables from its outer scope even after the outer function has finished executing.",
        code: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`
      },
      {
        title: "Private Variables",
        content: "Closures are useful for data encapsulation, mimicking private methods that other object-oriented languages support.",
        code: `function makeBank(initialBalance) {
  let balance = initialBalance;
  return {
    deposit: (amt) => { balance += amt; },
    getBalance: () => balance
  };
}

const account = makeBank(100);
account.deposit(50);
console.log(account.getBalance()); // 150
console.log(account.balance);       // undefined (Encapsulated)`
      }
    ],
    practiceQAs: [
      {
        question: "Create a counter function using closures that increments a private state variable.",
        answer: "A closure allows a returned inner function to maintain lexical reference variables from its parent scope even after the outer function has returned, achieving private variable storage.",
        example: "function createCounter() {\n  let count = 0;\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2"
      }
    ],
    interviewQAs: [
      {
        question: "How can closures lead to memory leaks in JavaScript?",
        answer: "Closures hold references to variables in their parent scopes. As long as the inner function is kept alive (e.g. bound to a timer or a global handler), the parent lexical scope cannot be garbage collected, potentially retaining large data blocks in memory.",
        example: `function leakMemory() {
  const hugeArray = new Array(1000000).fill("data");
  return function() {
    // Reference to hugeArray is retained
    return hugeArray.length;
  };
}`
      },
      {
        question: "What is the difference between a closure and a simple nested function?",
        answer: "Every closure is a nested function, but a nested function only becomes a closure when it references variables from its outer enclosing scope and is executed outside that scope, retaining access to those outer parameters.",
        example: `function buildGreeting(words) {
  // Nested function returning closure referencing 'words'
  return (name) => words + " " + name;
}
const hi = buildGreeting("Hello");
console.log(hi("Sanjib")); // "Hello Sanjib" (retains 'words' scope reference)`
      }
    ]
  },
  {
    id: "objects",
    title: "Objects",
    category: "Data Structures",
    readingTime: "5 min",
    difficulty: "Beginner",
    introduction: "Objects are key-value collections of data and behaviors. Almost everything in JavaScript is built upon objects.",
    sections: [
      {
        title: "Property & Method Creation",
        content: "Objects are created using object literals or constructors. Properties are accessed with dot notation or bracket notation.",
        code: `const user = {
  name: "Sanjib",
  role: "Lead Developer",
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
};

console.log(user.name);         // Dot notation: "Sanjib"
console.log(user["role"]);      // Bracket notation: "Lead Developer"
console.log(user.greet());      // "Hello, my name is Sanjib"`
      },
      {
        title: "Prototypes & Prototypal Chain",
        content: "Objects can inherit features from other objects via prototype linkages. When a property is queried, JS crawls up the prototype chain until it finds the key or returns undefined.",
        code: `const animal = { eats: true };
const rabbit = Object.create(animal); // rabbit prototype points to animal
rabbit.jumps = true;

console.log(rabbit.jumps); // true
console.log(rabbit.eats);  // true (inherited)`
      }
    ],
    practiceQAs: [
      {
        question: "Write a code block to clone an object shallowly and deeply.",
        answer: "Shallow cloning copies properties at the first level (via spread {...obj}). Deep cloning parses nested levels, which can be done using structuredClone() or JSON serialization.",
        example: "const original = { a: 1, b: { c: 2 } };\nconst shallow = { ...original };\nconst deep = structuredClone(original);\n\noriginal.b.c = 99;\nconsole.log(shallow.b.c); // 99 (shares reference)\nconsole.log(deep.b.c);    // 2 (deep copy remains intact)"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between Object.keys() and a for...in loop?",
        answer: "Object.keys() returns an array containing only the object's *own* enumerable property names. A for...in loop iterates over all enumerable properties, including those inherited from its prototype chain.",
        example: `const prototypeObj = { inheritedProp: "Yes" };
const mainObj = Object.create(prototypeObj);
mainObj.ownProp = "Yes";

console.log(Object.keys(mainObj)); // ["ownProp"]

for (let key in mainObj) {
  console.log(key); // "ownProp", then "inheritedProp"
}`
      }
    ]
  },
  {
    id: "arrays",
    title: "Arrays",
    category: "Data Structures",
    readingTime: "5 min",
    difficulty: "Beginner",
    introduction: "Arrays are list-like objects containing methods to perform traversal and mutation operations.",
    sections: [
      {
        title: "Common Iteration Methods",
        content: "Instead of standard loops, functional techniques like map, filter, and reduce provide declarative pathways to transform arrays.",
        code: `const numbers = [1, 2, 3, 4, 5];

// map transforms items
const squared = numbers.map(x => x * x); // [1, 4, 9, 16, 25]

// filter retains matching items
const evens = numbers.filter(x => x % 2 === 0); // [2, 4]

// reduce accumulates items into a single result
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15`
      },
      {
        title: "Slice vs Splice",
        content: "slice returns a shallow copy of a portion of an array without mutating the original, whereas splice alters the array by removing/replacing elements in-place.",
        code: `const letters = ["a", "b", "c", "d"];

const copy = letters.slice(1, 3); // ["b", "c"] (letters is unchanged)

letters.splice(2, 1, "z"); // Removes 1 item at index 2, adds "z"
console.log(letters);       // ["a", "b", "z", "d"]`
      }
    ],
    practiceQAs: [
      {
        question: "Write a snippet that filters odd numbers from an array and returns the squares of the remaining even numbers.",
        answer: "You can chain map() and filter() prototype methods. filter() filters items matching a condition, and map() transforms elements in place.",
        example: "const nums = [1, 2, 3, 4, 5, 6];\nconst evensSquared = nums.filter(n => n % 2 === 0).map(n => n * n);\nconsole.log(evensSquared); // [4, 16, 36]"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between slice and splice?",
        answer: "slice is a non-mutating method that returns a shallow copy of a section of an array. splice is a mutating method that alters the contents of the original array by deleting, replacing, or inserting items in-place.",
        example: `const arr1 = [1, 2, 3];
const sub = arr1.slice(0, 2); // arr1 is still [1, 2, 3]

const arr2 = [1, 2, 3];
arr2.splice(0, 2); // arr2 is now [3] (mutated)`
      }
    ]
  },
  {
    id: "strings",
    title: "Strings",
    category: "Data Structures",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "Strings are primitive values representing text characters. They are immutable and indexed.",
    sections: [
      {
        title: "Template Literals",
        content: "Template literals allow embedded expressions, multi-line formatting, and string interpolation using backticks (\`\`) and dollar expressions (\${}).",
        code: `const subject = "JavaScript";
const mood = "awesome";

// Multi-line interpolation
const output = \`Working with \${subject}
is absolutely \${mood}!\`;
console.log(output);`
      },
      {
        title: "Methods & Manipulation",
        content: "Strings share array-like properties and support index search, splitting, slicing, and replacements.",
        code: `const str = "Frontend Development";

console.log(str.includes("Dev")); // true
console.log(str.slice(0, 8));     // "Frontend"
console.log(str.toLowerCase());    // "frontend development"
console.log(str.split(" "));       // ["Frontend", "Development"]`
      }
    ],
    practiceQAs: [
      {
        question: "Write a function to check if a string is a palindrome (reads the same forwards and backwards) ignoring character case.",
        answer: "Clean the string by converting it to lowercase, split it into an array of characters, reverse it, join it back, and compare it with the original clean string.",
        example: "const isPalindrome = (str) => {\n  const clean = str.toLowerCase();\n  return clean === clean.split(\"\").reverse().join(\"\");\n};\nconsole.log(isPalindrome(\"Racecar\")); // true\nconsole.log(isPalindrome(\"hello\"));   // false"
      }
    ],
    interviewQAs: [
      {
        question: "Are JavaScript strings mutable?",
        answer: "No, strings in JavaScript are primitive values and are immutable. Any operation that modifies a string does not alter the original string in memory; instead, it generates and returns a new string reference.",
        example: `let str = "Hello";
str[0] = "J"; // Fails silently (or throws in strict mode)
console.log(str); // "Hello"

str = "J" + str.slice(1); // Re-assigning to a new string
console.log(str); // "Jello"`
      }
    ]
  },
  {
    id: "loops",
    title: "Loops",
    category: "Basics",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "Loops offer quick ways to execute statements repeatedly. JavaScript has classic syntax alongside iterator-specific loops.",
    sections: [
      {
        title: "For, While, and Do-While",
        content: "Use for loops when the repetition count is predetermined, while loops when checking conditions, and do-while loops to ensure the body runs at least once.",
        code: `// For loop
for (let i = 0; i < 3; i++) {
  console.log(i);
}

// While loop
let count = 0;
while (count < 3) {
  console.log(count++);
}`
      },
      {
        title: "For...in vs For...of",
        content: "for...in iterates over the enumerable keys of an object. for...of iterates over the values of an iterable structure (like arrays, strings, maps).",
        code: `const obj = { a: 1, b: 2 };
for (let key in obj) {
  console.log(key, obj[key]); // "a 1", "b 2"
}

const arr = [10, 20];
for (let val of arr) {
  console.log(val); // 10, 20
}`
      }
    ],
    practiceQAs: [
      {
        question: "Write a loop that prints numbers from 1 to 15, but skips numbers divisible by 3 using the continue statement.",
        answer: "The continue statement terminates execution of the statements in the current iteration of the loop, skipping directly to the next loop evaluation.",
        example: "for (let i = 1; i <= 15; i++) {\n  if (i % 3 === 0) continue;\n  console.log(i); // Skips 3, 6, 9, 12, 15\n}"
      }
    ],
    interviewQAs: [
      {
        question: "When should you use for...in vs for...of?",
        answer: "Use for...in when you want to iterate over the keys or properties of an object. Use for...of when iterating over elements/values of an iterable object (such as Arrays, Sets, Maps, or Strings).",
        example: `const arr = ["a", "b"];
for (let index in arr) console.log(index); // "0", "1" (keys)
for (let val of arr) console.log(val);     // "a", "b" (values)`
      }
    ]
  },
  {
    id: "dom",
    title: "DOM Manipulation",
    category: "Web APIs",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "The Document Object Model (DOM) is a programming interface for web documents. It represents the page structure as nodes.",
    sections: [
      {
        title: "Querying & Selecting Nodes",
        content: "Elements are selected using selectors like querySelector and querySelectorAll which support CSS queries.",
        code: `// Select a single element
const header = document.querySelector("#header");

// Select a list of elements
const buttons = document.querySelectorAll(".btn-action");
buttons.forEach(btn => {
  btn.style.color = "blue";
});`
      },
      {
        title: "Creating & Appending Elements",
        content: "New tags are created with document.createElement and inserted into the page using methods like appendChild or append.",
        code: `const list = document.querySelector("ul");
const newItem = document.createElement("li");
newItem.textContent = "Learn Async JS";
newItem.classList.add("list-item");

list.appendChild(newItem);`
      }
    ],
    practiceQAs: [
      {
        question: "Write a script to create a list item <li>, set its text, and append it to a list element.",
        answer: "Use document.createElement('li') to generate the element, textContent to declare string values, and appendChild() to insert it into a container.",
        example: "const li = document.createElement(\"li\");\nli.textContent = \"JavaScript practice item\";\n// const ul = document.getElementById(\"my-list\");\n// ul.appendChild(li);"
      }
    ],
    interviewQAs: [
      {
        question: "What is a DocumentFragment and why is it used?",
        answer: "A DocumentFragment is a lightweight, minimal document object that has no parent. It exists as a virtual DOM subtree. Appending nodes to a DocumentFragment does not trigger page reflows or repaints, allowing multiple DOM nodes to be built offline and appended in a single render operation.",
        example: `const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const el = document.createElement("div");
  fragment.appendChild(el); // Zero reflows
}
document.body.appendChild(fragment); // Triggers exactly one reflow`
      }
    ]
  },
  {
    id: "events",
    title: "Events",
    category: "Web APIs",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "Events are signals that something has occurred in the web browser, such as clicking a button or typing inside an input field.",
    sections: [
      {
        title: "Event Listeners & Bubbling",
        content: "Events propagate up the DOM tree after firing on their target. This is bubbling. To stop propagation, call event.stopPropagation().",
        code: `const btn = document.querySelector("button");

btn.addEventListener("click", (event) => {
  console.log("Button clicked!");
  // Stops the click from bubbling up to parent containers
  event.stopPropagation();
});`
      },
      {
        title: "Event Delegation",
        content: "Instead of adding event listeners to multiple individual children, you add a single listener to a parent element and intercept events depending on target characteristics.",
        code: `const list = document.querySelector("ul");

list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("List item text:", event.target.textContent);
  }
});`
      }
    ],
    practiceQAs: [
      {
        question: "Add an event listener to a button that prevents event bubbling (propagation).",
        answer: "Invoke e.stopPropagation() inside the event callback listener to stop the click trigger from bubbling up to ancestral wrappers.",
        example: "const button = document.createElement(\"button\");\nbutton.addEventListener(\"click\", (e) => {\n  e.stopPropagation();\n  console.log(\"Click handled here, won't bubble up!\");\n});"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between event.preventDefault() and event.stopPropagation()?",
        answer: "event.preventDefault() stops the default browser action associated with the event (like following a hyperlink or submitting a form). event.stopPropagation() stops the event from bubbling up the DOM tree to parent element listeners.",
        example: `link.addEventListener("click", (e) => {
  e.preventDefault();  // Browser won't open target link
  e.stopPropagation(); // Parent containers won't hear click
});`
      }
    ]
  },
  {
    id: "promises",
    title: "Promises",
    category: "Asynchronous",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "A Promise is an object representing the eventual completion or failure of an asynchronous operation.",
    sections: [
      {
        title: "Creating & Consuming Promises",
        content: "A Promise is constructed using callbacks containing resolve and reject parameters. It is consumed using then, catch, and finally.",
        code: `const fetchUserData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) {
        resolve({ name: "Alice", id: 1 });
      } else {
        reject("Failed to fetch user");
      }
    }, 1000);
  });
};

fetchUserData()
  .then(data => console.log(data))
  .catch(err => console.error(err))
  .finally(() => console.log("Request finished."));`
      },
      {
        title: "Promise.all vs Promise.race",
        content: "Promise.all awaits all parallel promises to fulfill. Promise.race returns the outcome of the first promise that settles.",
        code: `const p1 = new Promise(r => setTimeout(r, 100, "One"));
const p2 = new Promise(r => setTimeout(r, 200, "Two"));

Promise.all([p1, p2]).then(values => console.log(values)); // ["One", "Two"]
Promise.race([p1, p2]).then(winner => console.log(winner)); // "One"`
      }
    ],
    practiceQAs: [
      {
        question: "Write a function 'delay(ms)' that returns a Promise resolving after ms milliseconds.",
        answer: "You can instantiate a Promise that resolves when an asynchronous setTimeout completes after the specified millisecond duration.",
        example: "const delay = ms => new Promise(resolve => setTimeout(resolve, ms));\n\ndelay(500).then(() => console.log(\"Resolved after 500ms!\"));"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between Promise.all() and Promise.allSettled()?",
        answer: "Promise.all() rejects immediately if any of the input promises reject. Promise.allSettled() waits for all promises to settle (either fulfill or reject) and returns an array of outcome objects describing the status and value/reason for each.",
        example: `const p1 = Promise.resolve("Success");
const p2 = Promise.reject("Fail");

Promise.all([p1, p2])
  .catch(err => console.log("Rejected: " + err)); // Rejects immediately

Promise.allSettled([p1, p2])
  .then(res => console.log(res)); // [{status: "fulfilled", ...}, {status: "rejected", ...}]`
      },
      {
        question: "What is 'callback hell' and how do promises resolve it?",
        answer: "Callback hell refers to heavily nested, unreadable asynchronous callback structures that occur when executing multiple sequential operations. Promises resolve this by allowing flat chaining using '.then()' statements.",
        example: `// Callback Hell
step1(val1, (val2) => {
  step2(val2, (val3) => {
    console.log(val3);
  });
});

// Promise Chain (flat)
step1(val1)
  .then(val2 => step2(val2))
  .then(val3 => console.log(val3));`
      }
    ]
  },
  {
    id: "async-await",
    title: "Async / Await",
    category: "Asynchronous",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "Async/await is syntactical sugar built on top of Promises, allowing asynchronous code to be written like synchronous code.",
    sections: [
      {
        title: "Asynchronous Functions",
        content: "The async keyword transforms a function to return a Promise. The await keyword pauses execution until the promise settles.",
        code: `async function getUserProfile() {
  try {
    const user = await fetchUserData(); // Awaits promise completion
    const details = await fetchDetails(user.id);
    return details;
  } catch (error) {
    console.error("Failed to load profile:", error);
  }
}`
      },
      {
        title: "Concurrent Awaiting",
        content: "Avoid sequential awaits when tasks do not depend on each other. Resolve them concurrently using Promise.all.",
        code: `async function fetchStats() {
  // Good: Concurrent executions
  const [users, sales] = await Promise.all([
    getUsersList(),
    getSalesData()
  ]);
}`
      }
    ],
    practiceQAs: [
      {
        question: "Implement a function that wraps an asynchronous call with async/await and handles errors using try/catch.",
        answer: "An async function allows using the await keyword to pause execution until a Promise resolves. Enclose the await statement in try/catch to intercept rejections.",
        example: "async function fetchUserData() {\n  try {\n    const response = await fetch(\"https://api.github.com/users/octocat\");\n    const user = await response.json();\n    console.log(user.login);\n  } catch (err) {\n    console.error(\"Failed to load user\", err);\n  }\n}"
      }
    ],
    interviewQAs: [
      {
        question: "How do you handle errors in async/await functions?",
        answer: "Errors in async/await are handled using standard synchronous try/catch blocks wrapper structures. When a promise rejected is awaited inside a try block, the exception is thrown and caught in the catch block.",
        example: `async function requestData() {
  try {
    const result = await fetch("invalid-url");
  } catch (err) {
    console.error("Caught network error:", err.message);
  }
}`
      }
    ]
  },
  {
    id: "fetch-api",
    title: "Fetch API",
    category: "Web APIs",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "The Fetch API provides an interface for fetching network resources (e.g. AJAX requests).",
    sections: [
      {
        title: "HTTP Request Methods",
        content: "fetch returns a promise. You must read/transform responses using json() or text(). Be aware that fetch does not reject on HTTP error states (like 404 or 500); check response.ok.",
        code: `// GET Request
async function getPosts() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error(\`HTTP error! status: \${response.status}\`);
  }
  const posts = await response.json();
  console.log(posts.slice(0, 3));
}`
      },
      {
        title: "POST Request with Headers",
        content: "Send data using POST by specifying method, body, and headers configurations.",
        code: `async function createPost() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "New Post", body: "Hello World", userId: 1 })
  });
  const data = await response.json();
  console.log(data);
}`
      }
    ],
    practiceQAs: [
      {
        question: "Fetch user details from a public API endpoint and log the payload's username.",
        answer: "Call fetch() which resolves to a Response. Call .json() to decode the body, then chain a callback resolver to read the JSON fields.",
        example: "fetch(\"https://api.github.com/users/octocat\")\n  .then(res => res.json())\n  .then(data => console.log(data.login)) // \"octocat\"\n  .catch(err => console.error(\"Fetch failed\", err));"
      }
    ],
    interviewQAs: [
      {
        question: "Does fetch reject on a 404 or 500 error status?",
        answer: "No, a fetch() promise does not reject on HTTP error statuses (like 404, 500, or 403). It only rejects on structural network disruptions or DNS failures. To handle HTTP errors, you must inspect response.ok or response.status in the resolved block.",
        example: `fetch("/non-existent-page")
  .then(res => {
    if (!res.ok) {
      console.log("Failed with status: " + res.status); // 404
    }
  })
  .catch(err => console.log("Not called for 404"));`
      }
    ]
  },
  {
    id: "modules",
    title: "Modules",
    category: "Core Concepts",
    readingTime: "4 min",
    difficulty: "Intermediate",
    introduction: "Modules let you split your codebase into separate files. ES Modules (ESM) utilize standard import and export syntax.",
    sections: [
      {
        title: "Export & Import Syntaxes",
        content: "Exports can be named exports (multiple per file) or default exports (one per file). Imports match these configurations.",
        code: `// mathUtils.js
export const add = (a, b) => a + b;
export const pi = 3.14159;
export default function multiply(a, b) { return a * b; }

// app.js
import multiplyFunc, { add, pi } from "./mathUtils.js";`
      },
      {
        title: "Dynamic Imports",
        content: "Import files dynamically on-demand using function-like imports, which returns a promise resolving to the imported module object.",
        code: `// Lazy loading modules
button.addEventListener("click", async () => {
  const { heavyCalculator } = await import("./calc.js");
  heavyCalculator();
});`
      }
    ],
    practiceQAs: [
      {
        question: "Export a default helper function and a named constant value from an ES module.",
        answer: "Use 'export default functionName' for the primary function export, and 'export const name = val' for secondary exports.",
        example: "// file: helpers.js\nexport default function sum(a, b) { return a + b; }\nexport const PI = 3.14159;\n\n// file: main.js\n// import sum, { PI } from './helpers.js';"
      }
    ],
    interviewQAs: [
      {
        question: "Are ES Modules evaluated dynamically or statically?",
        answer: "ES Modules are statically parsed and evaluated. This means import and export links are resolved before the script begins execution (allowing static analysis and treeshaking bundles). This is why standard imports cannot reside inside if-else blocks.",
        example: `// Static analysis allows treeshaking:
// If pi is never used, build tools strip it out automatically
import { add } from "./mathUtils.js";`
      }
    ]
  },
  {
    id: "classes",
    title: "Classes",
    category: "Advanced",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "JavaScript Classes are syntactic sugar over prototype-based inheritance, offering clean object-oriented syntax.",
    sections: [
      {
        title: "Class Definition",
        content: "Classes contain constructors, methods, getters, setters, and static definitions.",
        code: `class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }

  // Prototype method
  describe() {
    return \`User: \${this.username} (\${this.email})\`;
  }

  // Static helper method
  static formatName(str) {
    return str.trim().toUpperCase();
  }
}`
      },
      {
        title: "Inheritance (extends)",
        content: "Subclasses extend superclasses using the extends keyword. Inside constructors, super() must be called before accessing 'this'.",
        code: `class Admin extends User {
  constructor(username, email, permissions) {
    super(username, email); // Calls parent constructor
    this.permissions = permissions;
  }
  
  hasAccess(permission) {
    return this.permissions.includes(permission);
  }
}`
      }
    ],
    practiceQAs: [
      {
        question: "Define a parent class 'Vehicle' and a subclass 'Car' that overrides constructor settings and uses super().",
        answer: "Subclasses extend parent classes using the extends keyword. The subclass constructor must invoke super() before accessing 'this' to run the parent initialization.",
        example: "class Vehicle {\n  constructor(type) { this.type = type; }\n}\nclass Car extends Vehicle {\n  constructor(brand) {\n    super(\"Car\");\n    this.brand = brand;\n  }\n}\nconst myCar = new Car(\"Toyota\");\nconsole.log(myCar.type, myCar.brand); // \"Car\" \"Toyota\""
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between a prototype method and a static method in a Class?",
        answer: "Prototype methods are defined on the class prototype and are inherited by all instances of that class. Static methods are defined on the class object itself and can only be called directly on the class, not on its instantiated objects.",
        example: `class Model {
  describe() {} // Prototype method (accessible via new Model().describe())
  static create() {} // Static method (accessible via Model.create())
}`
      }
    ]
  },
  {
    id: "oop",
    title: "OOP Concepts",
    category: "Advanced",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "Object-Oriented Programming (OOP) is a paradigm centered around objects rather than logic. JavaScript resolves this prototypes.",
    sections: [
      {
        title: "Encapsulation & Private Properties",
        content: "Encapsulation groups state and behaviors. Modern JS supports private class properties prefixed with a hash (#).",
        code: `class BankAccount {
  #balance = 0; // Private field

  constructor(owner) {
    this.owner = owner;
  }

  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  get balance() { // Getter
    return this.#balance;
  }
}`
      },
      {
        title: "Polymorphism",
        content: "Polymorphism allows subclasses to override methods inherited from parent classes.",
        code: `class Animal {
  speak() { return "Generic sound"; }
}

class Dog extends Animal {
  speak() { return "Woof! Woof!"; } // Overrides parent
}`
      }
    ],
    practiceQAs: [
      {
        question: "Bind a custom context object to a constructor method so that its properties are correctly mapped inside a new instance.",
        answer: "By invoking a function with the new keyword, a new blank object is constructed, its prototype is linked, and it binds the 'this' execution context to that instance.",
        example: "function User(name) {\n  this.name = name;\n}\nconst user = new User(\"Alice\");\nconsole.log(user.name); // \"Alice\""
      }
    ],
    interviewQAs: [
      {
        question: "How can you achieve encapsulation in vanilla JavaScript objects without ES6 classes?",
        answer: "Encapsulation can be achieved by using closures. By declaring variables inside a constructor or factory function scope, they remain private to that function scope. Methods returned as a public object act as closures and provide the only interface for accessing those variables.",
        example: `function Counter() {
  let value = 0; // Encapsulated private variable
  this.increment = () => { value++; };
  this.getValue = () => value;
}`
      }
    ]
  },
  {
    id: "es6",
    title: "ES6+ Features",
    category: "Core Concepts",
    readingTime: "4 min",
    difficulty: "Beginner",
    introduction: "ECMAScript 2015 (ES6) and subsequent revisions brought syntax additions to improve JavaScript ergonomics.",
    sections: [
      {
        title: "Destructuring & Spread Operator",
        content: "Destructuring extracts fields from arrays or objects easily. The spread/rest operator (...) expands collections or gathers parameters.",
        code: `// Destructuring
const user = { username: "Bob", id: 99 };
const { username } = user;

// Spread operator
const first = [1, 2];
const combined = [...first, 3, 4]; // [1, 2, 3, 4]

// Rest operator
function sumAll(...args) {
  return args.reduce((a, b) => a + b);
}`
      },
      {
        title: "Optional Chaining (?.)",
        content: "Optional chaining allows safe reading of deep properties without throwing ReferenceErrors if parent values are missing.",
        code: `const userProfile = { details: { age: 26 } };
console.log(userProfile.address?.city); // undefined (safe)
// console.log(userProfile.address.city); // TypeError!`
      }
    ],
    practiceQAs: [
      {
        question: "Swap two variable values in one line using array destructuring syntax.",
        answer: "JavaScript allows swapping variable positions without requiring a temporary placeholder variable using array positional destructuring: [a, b] = [b, a].",
        example: "let a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log(a, b); // 2, 1"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between rest parameters and the spread operator?",
        answer: "The spread operator (...) expands an array or object into individual elements. The rest operator (...) does the opposite: it gathers multiple individual arguments or elements and packages them into a single array structure.",
        example: `// Rest parameter gathers arguments:
function collect(...args) { console.log(args); } // [1, 2]

// Spread operator expands array:
const arr = [1, 2];
collect(...arr); // spread expands [1,2] into collect(1, 2)`
      }
    ]
  },
  {
    id: "memory-management",
    title: "Memory Management",
    category: "Advanced",
    readingTime: "5 min",
    difficulty: "Advanced",
    introduction: "Memory allocation is handled automatically. Understanding stack, heap, and garbage collection mechanisms prevents memory leaks.",
    sections: [
      {
        title: "Stack vs Heap",
        content: "JavaScript allocates memory in the Stack (static data, primitives, pointers) and the Heap (dynamic data, objects).",
        code: `const num = 100; // Primitive (Stack)
const profile = { name: "John" }; // Object (Heap, reference in Stack)`
      },
      {
        title: "Garbage Collection & Leaks",
        content: "Engines run garbage collectors using 'mark-and-sweep' heuristics. Memory leaks can occur from forgotten timers, global scopes, or closures.",
        code: `function leakingTimer() {
  const hugeData = new Array(1000000).fill("X");
  setInterval(() => {
    // hugeData is captured in a closure and never garbage collected!
    console.log("Timer active");
  }, 1000);
}`
      }
    ],
    practiceQAs: [
      {
        question: "Illustrate how circular references are formed between two objects.",
        answer: "A circular reference occurs when two or more objects hold references to each other, forming a cyclic dependency loop.",
        example: "let objA = {};\nlet objB = {};\nobjA.friend = objB;\nobjB.friend = objA;\n// objA and objB link to each other"
      }
    ],
    interviewQAs: [
      {
        question: "How does the Mark-and-Sweep garbage collection algorithm work?",
        answer: "The garbage collector establishes a set of 'roots' (like the global window object and active call stack references). It traverses the memory graph, marking all objects reachable from those roots. Any objects left unmarked (unreachable) are cleaned, freeing up their memory.",
        example: `let user = { name: "John" }; // Object is reachable
user = null; // Object is now unreachable and will be swept`
      }
    ]
  },
  {
    id: "performance",
    title: "Performance",
    category: "Advanced",
    readingTime: "5 min",
    difficulty: "Advanced",
    introduction: "Performance optimization is critical. Key techniques include limiting heavy operations, throttling events, and understanding browser rendering paths.",
    sections: [
      {
        title: "Debounce vs Throttle",
        content: "Debouncing triggers execution only after a period of inactivity. Throttling limits function calls to a periodic tick duration.",
        code: `// Debounce implementation
function debounce(func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}

// Throttle implementation
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}`
      },
      {
        title: "Reflows & Repaints",
        content: "Reflow recalculates the layout tree, while repaint paints updated pixels. Group DOM updates or use document fragments to avoid layout thrashing.",
        code: `// Bad: Causes 3 reflows
element.style.width = "100px";
element.style.height = "100px";
element.style.margin = "10px";

// Good: Causes 1 reflow
element.classList.add("new-layout");`
      }
    ],
    practiceQAs: [
      {
        question: "Implement a basic debounce function that postpones executing a target callback until a delay timer runs out.",
        answer: "A debounce function returns a wrapper closure that clears any active timeout schedule using clearTimeout() and restarts a new timer using setTimeout().",
        example: "function debounce(func, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => func(...args), delay);\n  };\n}"
      }
    ],
    interviewQAs: [
      {
        question: "What is the difference between debouncing and throttling?",
        answer: "Debouncing groups multiple events together and triggers execution only after a set period of absolute silence or inactivity. Throttling limits the frequency of execution, ensuring the callback runs at most once per defined time interval during continuous trigger inputs.",
        example: `// Use case:
// - Debounce: Search bar input (wait until typing pauses)
// - Throttle: Scroll events (run diagnostics every 100ms)`
      }
    ]
  },
  {
    id: "interview-questions",
    title: "Interview Questions",
    category: "Resources",
    readingTime: "10 min",
    difficulty: "Advanced",
    introduction: "Review conceptual challenges commonly encountered in technical assessments. Below are 10 core practice questions covering fundamental JS behaviors.",
    sections: [
      {
        title: "1. Difference between == and ===",
        content: "== performs type coercion before checking values, while === checks both type and value strictly.",
        code: `console.log(5 == "5");  // true
console.log(5 === "5"); // false`
      },
      {
        title: "2. Explaining Prototypal Inheritance",
        content: "Objects are linked to a prototype chain. When a property is queried, JS traverses up the chain until it finds the property or reaches null.",
        code: `const parent = { name: "Parent" };
const child = Object.create(parent);
console.log(child.name); // "Parent"`
      },
      {
        title: "3. Explaining Closures",
        content: "A closure allows an inner function to retain lexical reference variables from its parent scopes even after the parent function context has returned.",
        code: `function outer() {
  const value = "Closure Value";
  return () => console.log(value);
}
const inner = outer();
inner(); // "Closure Value"`
      },
      {
        title: "4. The Event Loop",
        content: "Understands the separation of the Call Stack, Web APIs, Microtask Queue (Promises), and Macrotask Queue (setTimeout). Microtasks execute before macrotasks.",
        code: `setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
// Output: "Promise", then "Timeout"`
      },
      {
        title: "5. Temporal Dead Zone (TDZ)",
        content: "Variables declared with let and const are initialized but cannot be accessed before their declaration line. Accessing them throws ReferenceError.",
        code: `// console.log(x); // ReferenceError
let x = 10;`
      },
      {
        title: "6. The behaviour of the 'this' keyword",
        content: "In standard functions, 'this' depends on call site invocation. In arrow functions, 'this' is bound statically to the surrounding lexical context.",
        code: `const obj = {
  regular() { console.log(this); },
  arrow: () => console.log(this)
};`
      },
      {
        title: "7. call, apply, and bind",
        content: "call invokes a function with a specified 'this' and comma-separated arguments. apply takes arguments as an array. bind returns a new function with bound 'this'.",
        code: `function greet(greeting) { console.log(greeting + ", " + this.name); }
const person = { name: "Bob" };
greet.call(person, "Hello"); // "Hello, Bob"`
      },
      {
        title: "8. Promises & Callback Hell avoidance",
        content: "Promises replace deeply nested asynchronous callbacks with a clean method-chaining approach (.then, .catch) or linear async/await syntax.",
        code: `doWork()
  .then(res => process(res))
  .catch(err => handleError(err));`
      },
      {
        title: "9. Debounce vs Throttle",
        content: "Debouncing delays execution until triggers pause. Throttling enforces a maximum frequency, running at most once per time window.",
        code: `// Throttling window scroll events
window.addEventListener("scroll", throttle(() => {}, 200));`
      },
      {
        title: "10. Mark-and-Sweep garbage collection",
        content: "GC traces memory graphs from roots (global objects). Any memory nodes that are unreachable from these roots are swept.",
        code: `let x = { val: 10 };
x = null; // Swept during next GC cycles`
      }
    ],
    practiceQAs: [
      {
        question: "Practice: Write a recursive function that calculates the factorial of a number.",
        answer: "A recursive function calls itself with modified arguments until a base conditional checks true (such as n <= 1), triggering return stacks.",
        example: "const factorial = n => n <= 1 ? 1 : n * factorial(n - 1);\nconsole.log(factorial(5)); // 120"
      }
    ],
    interviewQAs: [
      {
        question: "Practice Work: Explain how the JavaScript Event Loop resolves macro vs micro tasks.",
        answer: "The Event Loop continuously checks the call stack. Once the stack is empty, it processes all tasks in the Microtask Queue (e.g. promise resolutions, queueMicrotask). After the microtask queue is fully cleared, it takes one task from the Macrotask Queue (e.g. setTimeout, setInterval), runs it, and then loops back to clear any new microtasks before starting the next macrotask.",
        example: `console.log("Start");
setTimeout(() => console.log("Macro"), 0);
Promise.resolve().then(() => console.log("Micro"));
console.log("End");
// Prints: Start -> End -> Micro -> Macro`
      }
    ]
  },
  {
    id: "best-practices",
    title: "Best Practices",
    category: "Resources",
    readingTime: "5 min",
    difficulty: "Intermediate",
    introduction: "Writing readable, clean, and maintainable JavaScript is as important as writing correct code.",
    sections: [
      {
        title: "Use Strict Mode",
        content: "Strict mode ('use strict') prevents silent errors, resolves unsafe variables, and optimizes runtime engine evaluations.",
        code: `// Enable globally or inside functions
"use strict";

// x = 10; // ReferenceError: x is not defined`
      },
      {
        title: "Immutability & Pure Functions",
        content: "Avoid direct object mutations. Create updated copies using spread operations. Maintain pure functions without side effects.",
        code: `// Bad: Modifying params in place
function addBonus(user) {
  user.salary += 1000;
  return user;
}

// Good: Return clean copies
const addBonusPure = (user) => ({
  ...user,
  salary: user.salary + 1000
});`
      }
    ],
    practiceQAs: [
      {
        question: "Write a code block demonstrating why avoiding global variables is highly recommended.",
        answer: "Global variables clutter the lexical namespace and risk being overwritten or modified by separate script modules, leading to hard-to-debug crashes.",
        example: "// Wrap code in scopes or module blocks to contain variables\n(() => {\n  const privateState = \"Scoped variable\";\n  console.log(privateState); // Accessible\n})();\n// console.log(privateState); // ReferenceError: privateState is not defined"
      }
    ],
    interviewQAs: [
      {
        question: "What is a pure function and why is it preferred?",
        answer: "A pure function is a function that always returns the exact same output for the same input arguments, and produces zero side effects (e.g. does not alter external variables, DOM elements, or network states). Pure functions are preferred because they are highly predictable, trivial to test, and safe from unexpected mutations.",
        example: `// Pure Function
const multiply = (x, y) => x * y;

// Impure Function (mutates external state)
let total = 0;
const add = (x) => { total += x; return total; };`
      }
    ]
  }
];
