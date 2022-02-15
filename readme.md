# Sharing Observable State Across Micro-FrontEnds

## App1
Runs at: http://localhost:1337

This app is acting as a host. It renders a table of Users within itself, below this rendering the contents of App2.
The store's singleton React Context imported like a typical NPM module.

## App2
Runs at: http://localhost:1338

This app functions stand-alone but is also consumed by App1 as a Federated Module.
The store's singleton React Context is imported like a typical NPM module.

## Store
This is more of a library than an application. [Using Module Federation Plugin](./packages/app2/webpack.config.js#L51) we can share a singleton that both apps interact with.

In this example the store is based on [TFRP using MobX](https://mobx.js.org/README.html#introduction) - subscriptions are implicit and a React Context (registered through the singleton React instance) is made available as the default export.

The store Class and raw instance are exported (A consumer using non-react MobX bindings (e.g. Vue or Angular) would be able to interact with the same store)