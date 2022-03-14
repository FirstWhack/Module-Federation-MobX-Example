// this is only a type
import { APIStore } from "@mfexample/store";
import { observer } from "mobx-react";
import React, { lazy, Suspense } from "react";
import "./styles.less";

const App2Users = lazy(() => import("app2/Users"));
const APIStoreRuntime = import("store/Store");

const Numbers = observer(() => {
  // this module is lazy loaded
  const [APIStore, setAPIStore] = React.useState<APIStore | null>(null);
  React.useEffect(() => {
    APIStoreRuntime.then((module) => setAPIStore(module.APIStoreInstance));
  }, []);

  return APIStore ? (
    <>
      <div className="mfe-container">
        <div className="users__container">
          <h1>App1 (just display): </h1>
          <pre>This component is rendered in the main application</pre>
          <table>
            <tr>
              <td>Username</td>
              <td>Full Name</td>
              <td>ID</td>
              <td>Flag Count</td>
            </tr>
            {APIStore.users.map(({ name, id, username, flags }) => {
              return (
                <tr>
                  <td>{username}</td>
                  <td>{name}</td>
                  <td style={{ textAlign: "right" }}>{id}</td>
                  <td style={{ textAlign: "right" }}>{flags}</td>
                </tr>
              );
            })}
          </table>
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
