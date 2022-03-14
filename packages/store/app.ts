import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import {
  action,
  computed,
  configure,
  makeObservable,
  onBecomeObserved,
} from "mobx";

// without configuring enforceActions it would be possible to modify any observable from anywhere
configure({ enforceActions: "observed" });

// base class
export class APIStore {
  api: AxiosInstance;
  constructor(
    axiosConf: AxiosRequestConfig = {
      baseURL: "https://jsonplaceholder.typicode.com",
      auth: undefined,
    }
  ) {
    makeObservable(this, {
      users: true,
    });
    // setup api that should be in it's own class
    this.api = axios.create(axiosConf);

    // setup lazy observables
    onBecomeObserved(this, "users", this.handleBecomeObserved);
  }

  handleBecomeObserved = () => {
    if (!this.users.length) {
      this.getUsers();
    }
  };

  users: DemoUser[] = [];
  // async / await
  getUsers = action(async () => {
    const { data } = await this.api.get<User[]>("/users");
    this.users = (data as DemoUser[]).map((user) => {
      user.flags = 0;
      return user;
    });
  });
  deleteUser = action((userId: User["id"]) => {
    this.users = this.users.filter((user) => user.id !== userId);
  });
  addFlagToUser = action((userId: User["id"]) => {
    const user = this.users.find((user) => user.id === userId);
    if (user) {
      user.flags++;
    }
  });

  // not using async/await is a little weirder
  // getUsers = () => this.api.get<User[]>('/users').then(
  //   action(({ data }) => {
  //     this.users = data;
  //     // return data;
  //   })
  // )
}

// all references should point to this singleton (unless you want multiple stores).
export const APIStoreInstance = new APIStore();
