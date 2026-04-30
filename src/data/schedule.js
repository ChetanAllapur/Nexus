const slot = (focus, topic) => ({ focus, topic });
const day = (dayLabel, slotA, slotB) => ({ day: dayLabel, slotA, slotB });

export const SCHEDULE = [
  {
    week: 1,
    month: 1,
    theme: "JS Core I",
    days: [
      day("Mon", slot("Learn", "var/let/const, Hoisting, TDZ, Scope"), slot("Build", "Scope quiz app - test your JS knowledge in code")),
      day("Tue", slot("Learn", "Closures - how and why, practical examples"), slot("Build", "Build a counter factory using closures")),
      day("Wed", slot("Learn", "this keyword - all 4 binding rules + arrow fn"), slot("Build", "Build an OOP bank account class using this")),
      day("Thu", slot("Learn", "Prototype chain, Object.create, class syntax"), slot("Build", "Build a linked list using prototype inheritance")),
      day("Fri", slot("Learn", "call / apply / bind - deep dive"), slot("Build", "Review and refactor week's code. Push to GitHub")),
    ],
    items: [
      "var, let, const and temporal dead zone (TDZ)",
      "Hoisting in JavaScript",
      "Closures - lexical environment and private variables",
      "Scope - global, function, and block scope",
      "this keyword and binding rules (call, apply, bind)",
      "Prototype chain and inheritance",
      "ES6 Classes - constructor, super, and methods"
    ]
  },
  {
    week: 2,
    month: 1,
    theme: "JS Async",
    days: [
      day("Mon", slot("Learn", "Event loop - call stack, task queue, microtasks"), slot("Build", "Visualize event loop execution order in console")),
      day("Tue", slot("Learn", "Promises - then/catch/chaining/Promise.all"), slot("Build", "Multi-source data fetcher using Promise.all")),
      day("Wed", slot("Learn", "async/await - error handling, patterns"), slot("Build", "Convert all promise chains to async/await")),
      day("Thu", slot("Learn", "Fetch API + AbortController + error handling"), slot("Build", "Build a weather API fetcher with timeout/abort")),
      day("Fri", slot("Learn", "Generators, Iterators, for...of"), slot("Build", "Project sprint: Async multi-step form with API")),
    ],
    items: [
      "Event Loop - Call stack, Microtasks, and Macrotasks",
      "Promises - resolve, reject, and chaining",
      "async / await and error handling (try/catch)",
      "Fetch API + AbortController",
      "Generators and Iterators",
      "for...of vs for...in loops"
    ]
  },
  {
    week: 3,
    month: 1,
    theme: "JS Modern",
    days: [
      day("Mon", slot("Learn", "Destructuring - arrays, objects, nested, defaults"), slot("Build", "Refactor existing code using destructuring")),
      day("Tue", slot("Learn", "Spread/Rest, Optional chaining, Nullish coalescing"), slot("Build", "Config merger utility using spread patterns")),
      day("Wed", slot("Learn", "map/filter/reduce/flatMap - deep practice"), slot("Build", "Data transformation pipeline (array of users -> stats)")),
      day("Thu", slot("Learn", "Modules (ESM), dynamic import(), Map/Set"), slot("Build", "Modular utility library - split into ES modules")),
      day("Fri", slot("Learn", "Debounce, Throttle, Memoization, Pure functions"), slot("Build", "Search input with debounce + memoized results")),
    ],
    items: [
      "Destructuring (Arrays & Objects)",
      "Spread and Rest operators (...)",
      "Optional Chaining (?.) and Nullish Coalescing (??)",
      "Higher Order Functions (map, filter, reduce)",
      "ES Modules (import/export)",
      "Debounce and Throttle",
      "Memoization and Pure Functions"
    ]
  },
  {
    week: 4,
    month: 1,
    theme: "JS DOM + Project",
    days: [
      day("Mon", slot("Learn", "DOM - query, event delegation, bubbling"), slot("Build", "Build a drag-and-drop todo list (no libraries)")),
      day("Tue", slot("Learn", "Custom Events, IntersectionObserver, MutationObserver"), slot("Build", "Infinite scroll using IntersectionObserver")),
      day("Wed", slot("Learn", "Error handling - try/catch, custom error classes"), slot("Build", "Add error boundaries + retry logic to fetcher")),
      day("Thu", slot("Build", "PROJECT: Multi-step form with validation + API submit"), slot("Build", "Continue project - localStorage, error states, polish")),
      day("Fri", slot("Build", "Deploy project (Netlify/Vercel) + write README"), slot("Review", "Week review + JS self-assessment. Plan Month 2")),
    ],
    items: [
      "DOM Traversal and Manipulation",
      "Event Delegation and Bubbling",
      "Intersection Observer and Mutation Observer",
      "Error Handling (try...catch and custom Errors)",
      "Web Storage API (localStorage, sessionStorage)"
    ]
  },
  {
    week: 5,
    month: 2,
    theme: "React Hooks I",
    days: [
      day("Mon", slot("Learn", "useState - state updates, batching, functional updater"), slot("Build", "Shopping cart with complex useState interactions")),
      day("Tue", slot("Learn", "useEffect - deps array, cleanup, race conditions"), slot("Build", "useEffect patterns: data fetch, subscriptions, timers")),
      day("Wed", slot("Learn", "useRef - DOM refs, mutable values, forwardRef"), slot("Build", "Build a focus-trap modal using useRef")),
      day("Thu", slot("Learn", "useReducer - complex state, action patterns"), slot("Build", "Rewrite shopping cart using useReducer")),
      day("Fri", slot("Learn", "useContext - create, consume, split contexts"), slot("Build", "Theme + Auth context providers for a mini app")),
    ],
    items: [
      "useState and state updates",
      "useEffect and cleanup",
      "useRef and forwardRef",
      "useReducer for complex state",
      "useContext and Provider patterns"
    ]
  },
  {
    week: 6,
    month: 2,
    theme: "React Hooks II + Patterns",
    days: [
      day("Mon", slot("Learn", "useMemo + useCallback - when to use, pitfalls"), slot("Build", "Optimize a slow list component with useMemo")),
      day("Tue", slot("Learn", "Custom Hooks - useFetch, useDebounce, useLocalStorage"), slot("Build", "Build 3 production-ready custom hooks")),
      day("Wed", slot("Learn", "React.memo, compound components, render props"), slot("Build", "Build Accordion using compound component pattern")),
      day("Thu", slot("Learn", "Error boundaries, Suspense, React.lazy"), slot("Build", "Code-split a dashboard with Suspense + lazy")),
      day("Fri", slot("Learn", "Portals (modals), useTransition, useDeferredValue"), slot("Build", "Build a modal portal + search with deferred value")),
    ],
    items: [
      "useMemo and useCallback optimization",
      "Custom Hooks - best practices and patterns",
      "React.memo and PureComponents",
      "Error Boundaries and Suspense",
      "React Portals and Modals"
    ]
  },
  {
    week: 7,
    month: 2,
    theme: "React State + Router",
    days: [
      day("Mon", slot("Learn", "Zustand - store, slices, devtools"), slot("Build", "Global state with Zustand (cart + auth)")),
      day("Tue", slot("Learn", "TanStack Query - queries, mutations, cache, pagination"), slot("Build", "Replace manual fetch logic with React Query")),
      day("Wed", slot("Learn", "React Router v6 - routes, loaders, actions, outlet"), slot("Build", "Multi-page app with nested routes + protection")),
      day("Thu", slot("Learn", "React Hook Form + Zod - validation, errors, submit"), slot("Build", "Build a multi-field form with full Zod validation")),
      day("Fri", slot("Build", "PROJECT: Full task manager app - React + React Query + Router"), slot("Build", "Continue: auth UI, protected routes, form validation")),
    ],
    items: [
      "Zustand - simple global state",
      "TanStack Query (React Query) - data fetching",
      "React Router v6 - navigation and loaders",
      "React Hook Form and Zod validation"
    ]
  },
  {
    week: 8,
    month: 2,
    theme: "React Native Foundations",
    days: [
      day("Mon", slot("Learn", "RN setup (Expo) - View, Text, Image, StyleSheet"), slot("Build", "Build 5 common mobile UI layouts using Flexbox")),
      day("Tue", slot("Learn", "FlatList - keyExtractor, renderItem, performance"), slot("Build", "News feed with FlatList + pull-to-refresh")),
      day("Wed", slot("Learn", "TextInput, Keyboard, forms on mobile"), slot("Build", "Mobile login/signup form with keyboard handling")),
      day("Thu", slot("Learn", "React Navigation - Stack, Tab, Drawer"), slot("Build", "3-tab app with stack inside tab navigator")),
      day("Fri", slot("Build", "PORT task manager to React Native - shared logic"), slot("Build", "Continue: navigation, screens, AsyncStorage")),
    ],
    items: [
      "React Native Layouts (Flexbox)",
      "FlatList and SectionList performance",
      "React Native Navigation (Stack, Tab, Drawer)",
      "SQLite & AsyncStorage"
    ]
  },
  {
    week: 9,
    month: 3,
    theme: "Node + Express Core",
    days: [
      day("Mon", slot("Learn", "Node event loop, modules (CJS vs ESM), npm scripts"), slot("Build", "Build a CLI file organizer with fs module")),
      day("Tue", slot("Learn", "Express routing, middleware chain, request/response"), slot("Build", "REST API with 5 routes + custom middleware")),
      day("Wed", slot("Learn", "Error handling middleware, async route wrappers"), slot("Build", "Add global error handler to Express API")),
      day("Thu", slot("Learn", "CORS, rate limiting, helmet.js security headers"), slot("Build", "Secure the API with rate limit + CORS + helmet")),
      day("Fri", slot("Learn", "Environment variables - dotenv, config patterns"), slot("Build", "Refactor API with proper env config + review")),
    ],
    items: [
      "Node.js Event Loop and Architecture",
      "Express.js - Routing and Middleware",
      "Error Handling in Express",
      "API Security (CORS, Rate Limiting, Helmet)",
      "Environment Variables and Configuration"
    ]
  },
  {
    week: 10,
    month: 3,
    theme: "Auth + Database",
    days: [
      day("Mon", slot("Learn", "PostgreSQL basics - tables, queries, joins, indexes"), slot("Build", "Design and create DB schema for job board app")),
      day("Tue", slot("Learn", "Prisma ORM - schema, migrate, CRUD, relations"), slot("Build", "Replace raw SQL with Prisma in the API")),
      day("Wed", slot("Learn", "JWT auth - sign, verify, refresh token pattern"), slot("Build", "Build /register, /login, /refresh endpoints")),
      day("Thu", slot("Learn", "bcrypt hashing, protected routes middleware"), slot("Build", "Add auth guard middleware to protected routes")),
      day("Fri", slot("Learn", "Input validation - Zod on backend, sanitization"), slot("Build", "Job Board API - full CRUD with auth + validation")),
    ],
    items: [
      "SQL Foundations (PostgreSQL)",
      "Prisma ORM - schema and migrations",
      "JWT (JSON Web Token) Authentication",
      "Crypto & Security (Hashing, Encryption)",
      "Zod - Schema Validation"
    ]
  },
  {
    week: 11,
    month: 3,
    theme: "Advanced Backend",
    days: [
      day("Mon", slot("Learn", "File uploads - Multer + Cloudinary integration"), slot("Build", "Add profile photo upload to the auth system")),
      day("Tue", slot("Learn", "Pagination (cursor + offset), search, filtering"), slot("Build", "Add paginated job listings with search filters")),
      day("Wed", slot("Learn", "Redis - caching, sessions, rate limiting"), slot("Build", "Cache expensive DB queries with Redis")),
      day("Thu", slot("Learn", "WebSockets - Socket.io rooms, events, namespaces"), slot("Build", "Add real-time job application notifications")),
      day("Fri", slot("Build", "PROJECT: Job Board - frontend (React) + backend integrated"), slot("Build", "Continue: full flow from signup -> post job -> apply")),
    ],
    items: [
      "File Uploads (Multer & Cloudinary)",
      "Database Optimization (Indexing, Pagination)",
      "Redis - Caching and Sessions",
      "WebSockets (Socket.io)",
      "Child Processes (exec, spawn, fork)"
    ]
  },
  {
    week: 12,
    month: 3,
    theme: "Testing + Deploy",
    days: [
      day("Mon", slot("Learn", "Jest unit tests - mocking, spies, coverage"), slot("Build", "Write unit tests for utility functions")),
      day("Tue", slot("Learn", "Supertest - integration testing Express routes"), slot("Build", "Test all API endpoints with Supertest")),
      day("Wed", slot("Learn", "React Testing Library - queries, user-event"), slot("Build", "Test React components: form, auth flow")),
      day("Thu", slot("Learn", "Docker basics - Dockerfile, docker-compose"), slot("Build", "Dockerize the backend + postgres")),
      day("Fri", slot("Build", "Deploy backend (Railway) + frontend (Vercel)"), slot("Build", "GitHub Actions CI: lint + test on every push")),
    ],
    items: [
      "Unit Testing and TDD (Jest/Mocha)",
      "Integration Testing with Supertest",
      "React Testing Library - queries, user events",
      "Docker - containers and compose",
      "CI/CD Pipelines (GitHub Actions)"
    ]
  },
  {
    week: 13,
    month: 4,
    theme: "TypeScript",
    days: [
      day("Mon", slot("Learn", "TS types - primitives, objects, arrays, unions, literals"), slot("Build", "Convert a small JS utility to TypeScript")),
      day("Tue", slot("Learn", "Interfaces vs Types, Generics basics"), slot("Build", "Type the Prisma models + API response types")),
      day("Wed", slot("Learn", "Type narrowing, discriminated unions, utility types"), slot("Build", "Add strict TypeScript to React components")),
      day("Thu", slot("Learn", "TS in React - typing props, hooks, events, context"), slot("Build", "Type the entire React frontend")),
      day("Fri", slot("Build", "PROJECT: Real-time Chat app - TypeScript from scratch"), slot("Build", "Chat rooms, socket events, message history")),
    ],
    items: [
      "TypeScript - types and interfaces",
      "TypeScript Generics and Utility Types",
      "Advanced TypeScript in React",
      "TypeScript in Node.js (Prisma types)"
    ]
  },
  {
    week: 14,
    month: 4,
    theme: "RN Advanced + Chat",
    days: [
      day("Mon", slot("Learn", "Reanimated 3 - useSharedValue, useAnimatedStyle"), slot("Build", "Animate message bubbles entering chat")),
      day("Tue", slot("Learn", "Gesture Handler - pan, swipe, drag interactions"), slot("Build", "Swipe-to-delete for chat messages")),
      day("Wed", slot("Learn", "Expo notifications + deep linking"), slot("Build", "Push notifications for new chat messages")),
      day("Thu", slot("Build", "EAS Build - build Android APK for testing"), slot("Build", "Test on real device, fix platform bugs")),
      day("Fri", slot("Build", "Chat app: mobile client (React Native) + Socket.io"), slot("Build", "Complete chat: typing indicator, online status")),
    ],
  },
  {
    week: 15,
    month: 4,
    theme: "Portfolio + Interview Prep",
    days: [
      day("Mon", slot("Build", "Portfolio site - responsive, fast, 4 projects shown"), slot("Build", "Write READMEs for all 4 projects + GIF demos")),
      day("Tue", slot("Learn", "System design basics - scalability, load balancing"), slot("Build", "Design Twitter / Airbnb at high level (document it)")),
      day("Wed", slot("Learn", "LeetCode - array, string, hashmap problems (Easy)"), slot("Build", "5 LeetCode problems + code review session")),
      day("Thu", slot("Build", "Mock interview - explain projects out loud"), slot("Build", "Update LinkedIn, resume, GitHub profile")),
      day("Fri", slot("Learn", "Common React/JS interview questions deep review"), slot("Build", "Apply to 5 companies - track in Notion/sheet")),
    ],
  },
  {
    week: 16,
    month: 4,
    theme: "Full Job Hunt Mode",
    days: [
      day("Mon", slot("Build", "10 job applications - personalize each cover letter"), slot("Learn", "LeetCode medium: two pointers, sliding window")),
      day("Tue", slot("Learn", "Take-home test practice - build a small feature app"), slot("Build", "Continue take-home + deploy it publicly")),
      day("Wed", slot("Learn", "Behavioral interview - STAR method, story bank"), slot("Build", "Record yourself answering 5 behavioral questions")),
      day("Thu", slot("Build", "Negotiate - know your market rate, practice out loud"), slot("Build", "Keep applying: 10+ apps/week minimum")),
      day("Fri", slot("Build", "Final project polish - fix any bugs, improve performance"), slot("Review", "You're ready. Keep shipping code every week.")),
    ],
  },
];
