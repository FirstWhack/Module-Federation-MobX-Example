import { APIStore } from "@mfexample/store";
import { observer } from "mobx-react";
import React from "react";


const APIStoreContext = import("store/Store");

export default observer(function App() {
  const [APIStore, setAPIStore] = React.useState<APIStore | null>(null);
  React.useEffect(() => {
    APIStoreContext.then((context) => setAPIStore(context.APIStoreInstance)),
      [];
  });

  return APIStore ? (
    <>
      <div className="users__container">
        <h1>Users App 2 (simple lazy fetch): </h1>
        <pre>This component is a Federated Module</pre>
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
          Delete Last User from App 2
        </button>
      </div>
    </>
  ) : (
    <div className="loading">Loading...</div>
  );
});
