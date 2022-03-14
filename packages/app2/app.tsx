// this is only a type
import { APIStore } from "@mfexample/store";
import { observer } from "mobx-react";
import React from "react";

const APIStoreRuntime = import("store/Store");

export default observer(function App() {
  const [APIStore, setAPIStore] = React.useState<APIStore | null>(null);
  React.useEffect(() => {
    APIStoreRuntime.then((module) => setAPIStore(module.APIStoreInstance));
  }, []);

  return APIStore ? (
    <>
      <div className="users__container">
        <h1>App2 (Modify Something): </h1>
        <pre>This component is a Federated Module</pre>
        <table>
          <tr>
            <td>Username</td>
            <td>ID</td>
            <td>Flags</td>
            <td>Action</td>
          </tr>
          {APIStore.users.map(({ username, flags, id }) => {
            return (
              <tr>
                <td>{username}</td>
                <td style={{ textAlign: "right" }}>{id}</td>
                <td style={{ textAlign: "right" }}>{flags}</td>
                <td>
                  <button onClick={() => APIStore.addFlagToUser(id)}>
                    Add User Flag
                  </button>{" "}
                  <button onClick={() => APIStore.deleteUser(id)}>
                    Delete User
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  ) : (
    <div className="loading">Loading...</div>
  );
});
