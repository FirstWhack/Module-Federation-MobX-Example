declare module 'app2/Users' {
  const App2: typeof import("@mfexample/app2/app").default;

  export default App2;
}

declare module 'store/Store' {
  const context: typeof import("@mfexample/store").default;
  export const APIStore: typeof import("@mfexample/store").APIStore;
  export const APIStoreInstance: typeof import("@mfexample/store").APIStoreInstance;

  export default context;
}