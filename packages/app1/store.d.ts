declare module 'store/Store' {
    const APIStoreContext: typeof import("@mfexample/store").default;
    export const APIStore: typeof import("@mfexample/store").APIStore;
  
    export default APIStoreContext;
  }