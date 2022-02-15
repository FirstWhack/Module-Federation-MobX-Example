import React, { useState, useEffect } from "react";
import APIStoreContext from "@mfexample/store";
import { observer } from "mobx-react";

export default observer(function App() {
  const APIStore = React.useContext(APIStoreContext);

  const { users, deleteLastUser } = APIStore;

  return (
    <div className='users__container'>
      <h1>Users App 2 (simple lazy fetch): </h1>
      <table>
        {users.map(({ name, id, username }) => {
          return (
            <tr>
              <td>{name}</td>
              <td>{id}</td>
              <td>{username}</td>
            </tr>
          );
        })}
      </table>
      <button className='users__delete' onClick={deleteLastUser}>Delete Last User from App 2</button>
    </div>
  );
});
