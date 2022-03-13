# Sharing Observable State Across Micro-FrontEnds

## Online IDE
This example runs in [Code Sandbox](https://githubbox.com/FirstWhack/Module-Federation-MobX-Example)!


## Contents
### App1
Runs at: http://localhost:1337

This app is acting as a host. It renders a table of Users within itself, below this rendering the contents of App2.
The singleton Store is consumed as a Federated Module.

### App2
Runs at: http://localhost:1338

This app functions stand-alone but is also consumed by App1 as a Federated Module.
The singleton Store is consumed as a Federated Module.

### Store
This is more of a library than an application. [Using Module Federation Plugin](./packages/app2/webpack.config.js#L51) we can share a singleton that both apps interact with.

In this example the store is based on [TFRP using MobX](https://mobx.js.org/README.html#introduction) - subscriptions are implicit, the store Class and singleton are exported (the store could be instantiated local to an app to avoid sharing)