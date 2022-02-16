import { APIStore } from "@mfexample/store";
import { observer } from "mobx-react";
import React, { lazy, Suspense } from "react";
import "./styles.less";

const App2Users = lazy(() => import("app2/Users"));
const APIStoreContext = import("store/Store");

const Numbers = observer(() => {
  // this module is lazy loaded
  const [APIStore, setAPIStore] = React.useState<APIStore | null>(null);
  React.useEffect(() => {
    APIStoreContext.then(context => setAPIStore(context.APIStoreInstance)), [];
  });

  return APIStore ? (
    <>
      <div className="mfe-container">
        <div className="users__container">
          <h1>Users App 1 (simple lazy fetch): </h1>
          <pre>This component is rendered in the main application</pre>
          <table>
            {APIStore.users.map(({ name, id, username }) => {
              return (
                <tr>
                  <td>{name}</td>
                  <td>{id}</td>
                  <td>{username}</td>
                </tr>
              );
            })}
          </table>
          <button className="users__delete" onClick={APIStore.deleteLastUser}>
            Delete Last User from App 1
          </button>
        </div>
        <Suspense fallback={() => "loading remote module..."}>
          <App2Users />
        </Suspense>
      </div>
    </>
  ) : (
    <div className="loading">Loading...</div>
  );
});

export default Numbers;
