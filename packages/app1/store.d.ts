declare module 'store/Store' {
    const APIStoreContext: typeof import("../store/app").default;
    export const APIStore: typeof import("../store/app");
  
    export default APIStoreContext;
  }