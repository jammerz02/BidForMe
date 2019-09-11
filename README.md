# BidForMe
Anything about bidding, items for sale..

This project is a sample project for ethereum. It uses Solidity as its backend and React JS in its frontend.

# Getting Started

1. Go to project folder and install dependencies:

    ```cmd
    npm install
    ```

2. Run Ganache. If you dont have it installed in your system, download from: https://www.trufflesuite.com/ganache

3. Migrate contract to server.

    ```cmd
    truffle migrate --reset --compile-all
    ```

4. Download Metamask extension on your browser. 
    
    For Chrome: https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn

    For Mozilla Firefox: 
    https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/ 

5. Open Metamask and create local network using Custom RPC.

6. Launch development server

    ```cmd
    npm start
    ```

7. Open http://localhost:3000 on your browser.

8. Open metamask and allow access to http://localhost:3000

9. Import ganache accounts to metamask using private keys.


# Project Structure
    ├──contracts
    │   ├── Auction.sol 
    │   └── Migrations.sol
    ├── migrations
    │   ├── 1_initial_migration.js
    │   └── 2_deploy_contracts.js
    ├── test
    │   └── auction.js
    └── web-app
        ├── public
        │   ├── favicon.ico
        │   ├── index.html
        │   └── manifest.json
        ├── src
        │   ├── build
        │   │   └── contracts
        │   │       ├── Auction.json
        │   │       └── Migrations.json
        │   ├── components
        │   │   ├── confirmation
        │   │   │   └── Confirmation.js
        │   │   ├── navigation
        │   │   │   ├── AppNavigation.js
        │   │   │   ├── index.js
        │   │   │   └── Navigation.js
        │   │   ├── web3
        │   │   │   ├── index.js
        │   │   │   └── Web3Loader.js
        │   │   └── wrapper
        │   │       ├── index.js
        │   │       └── Wrapper.js
        │   ├── pages
        │   │   ├── accounts
        │   │   │   ├── Accounts.js
        │   │   │   └── index.js
        │   │   ├── bidding
        │   │   │   ├── contents
        │   │   │   │   ├── Content.js
        │   │   │   │   ├── Form.js
        │   │   │   │   └── Table.js
        │   │   │   ├── Bidding.js
        │   │   │   └── index.js
        │   │   ├── home
        │   │   │   ├── Home.js
        │   │   │   └── index.js
        │   │   ├── myItems
        │   │   │   ├── add-item
        │   │   │   │   └── AddItem.js
        │   │   │   ├── remove-item
        │   │   │   │   └── DeleteItem.js
        │   │   │   ├── update-item
        │   │   │   │   └── UpdateItem.js
        │   │   │   ├── index.js
        │   │   │   └── ItemOwner.js
        │   │   └── notFound
        │   │       └── NoMatch.js
        │   ├── services
        │   │   └── web3
        │   │       ├── getWeb3.js
        │   │       ├── index.js
        │   │       └── utils.js
        │   ├── test-helpers
        │   │   └── router.js
        │   ├── App.js
        │   ├── index.css
        │   ├── index.js
        │   └── registerServiceWorker.js
        ├── .env
        ├── .gitignore
        ├── package.json
        ├── README.md
        └── yarn.lock

## contracts

This is the back-end client for our Bidding app. It uses solidity programming language in writing contracts. 

### contracts/Auction.sol

This is the contract for out Bidding app. It has a functionality that can `add`, `remove`, `update`, and `delete` an item that is registered by the user.

### contracts/Migrations.sol

This contract stores a number that corresponds to the last applied `migration` script, found in the migrations folder.

### migrations/1_initial_migration.js

Push `Migration.sol` file to the desired blockchain.

### migrations/2_deploy_contracts.js

Push `Auction.sol` file to the desired blockchain.

## test

Contains the test file for the contract created.

### test/auction.js

This is the test file for the `Auction.sol`.


## web-app (front-end)

This is the front-end client for our Bidding app. It is built with `create-react-app` and uses a higher-order component (HOC) so we can easily let each page connect to the blockchain and the contract instance.

### public/src/App.js

`App` is where the actual navigation happens and where we load Web3.
In the `render` prop provided to `Web3` component, we check if `web3`, `accounts`, and `contract` are already loaded and if so, we perform the appropriate navigation depending on the current path.

### pages

This folder contains the pages having their own url. The name of each sub-directory corresponds to a separate route.

We use [react-router](https://reacttraining.com/react-router/web/) for routing.

### pages/home/Home.js

Initial home page corresponding to the `/` url.

### pages/accounts/Accounts.js

This is a page listing the accounts returned from Web3. The `Accounts` component is stateless and expects `location` object from the `Router` and `accounts` from Web3. Both are injected in `App.js` component.

### pages/bidding/Bidding.js
  

The `Bidding` component makes calls to the `contract` given in one of the props provided by `Web3` component. This component is used to bid for an item or withdraw its balance.

these components are used to display some of the calls from the `contract` :
- pages/bidding/contents/Content.js
- pages/bidding/contents/Table.js
- pages/bidding/contents/Form.js

### pages/myItems/ItemOwner.js

The `ItemOwner` component also makes calls to the `contract` given in one of the props provided by `Web3` component. 

This component is used to:
- `end auction` for an item,
- `add` an item pages/myItems/add-item/AddItem.js ,
- `update` an item - pages/myItems/update-item/UpdateItem.js , and 
- `delete` an item - pages/myItems/remove-item/DeleteItem.js .

these components are also used to display some of the calls from the `contract` :
- pages/bidding/contents/Content.js
- pages/bidding/contents/Table.js
- pages/bidding/contents/Form.js


## components

Components hold some shared presentational components that support navigation and a bit of styling. We wanted to avoid imposing any specific framework so at least we could remove some noise coming from styling issues by giving it their own abstractions.

We encourage you to try [glamorous](https://github.com/paypal/glamorous) for handling styling in React.

### components/web3

Here, in the `Web3.js` file, we define our `Web3` component that follows *render props* pattern. As we can see, the `render` prop function receives an object with three attributes: `web3`, `accounts`, and `contract`.

### components/navigation

Components used to render a small navigation menu on every page.

### components/wrapper

A `Wrapper` components to provide uniform top-level positioning for each page.

## services/web3

`web3` provides utilities and a HOC to inject `web3` instance, `accounts`, and a `contract` as props.

### getWeb3.js

This is a function for actually getting the Web3 object. [ToDo: explain web3 injection and the relevant .env file contents]

### withWeb3.js

This is a higher-order component (HOC) that allows us to wrap a component and "magically" have `web3`, `accounts`, and the `contract` instance injected as props. For an example of how to use it, look at the `accounts` and `dapp` pages.

You may want to modify this for your own purposes. For example, you can change what is shown to the user while the app is loading Web3.

### utils.js

The functions `getAccounts` and `getContractInstance` are placed in this file, and their purpose is simply explained by their respective names. Both of these functions require `web3` to be passed in and will resolve asynchronously.

If you want to get multiple contract instances, you may want to add an additional function based off of `getContractInstance`.

## contracts

A symlink to the top-level `build/contracts` located in the Truffle project is placed here so that the React app can refer to the build artifacts from the parent Truffle project.

## .env

This file contains environment variables.

| ENV  | default value  | description |
|------|----------------|-------------|
| BROWSER | `Chrome` | the browser to be used by CRA |
| NODE_PATH | `src/`  | Default import path. It will let us to use import paths |
| REACT_APP_USE_INJECTED_WEB3 | `NO` | If set to `NO` the `web3` instance potentially injected in the browser (like _MetaMask_)will be ignored. Set it to `YES` to use `web3` object that was injected. |
| REACT_APP_WEB3_PROVIDER_URL | `http://localhost:7545` | The local provider URL. Relevant only when `REACT_APP_USE_INJECTED_WEB3` is set to `NO`. This is the default provider URL used by truffle development console. |

## conventions

We promote using named exports rather than default export. For a reasoning you may check out [Why we have banned default exports in Javascript and you should do the same](https://blog.neufund.org/why-we-have-banned-default-exports-and-you-should-do-the-same-d51fdc2cf2ad).

Then to make module imports more communicative, and to improve encapsulation, we use `index.js` file in every folder. This file might be considered a public API for your component.

You may also consider using a `package.json` file instead `index.js`. We found `index.js` to be slightly more flexible for that purpose.

Such a `package.json` would contain only one attribute pointing out to the main file in your component, e.g.:

```json
{
  "main": "Accounts.js"
}
```




