import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from 'pages/home'
import { Accounts } from 'pages/accounts'
import { Bidding } from 'pages/bidding'
import { ItemOwner } from 'pages/myItems'
import { Web3Loader } from 'components/web3'

const renderComponent = (Component, routeProps, web3Props) => (
  <Component {...web3Props}
    {...routeProps} />
)

const web3IsReady = ({web3, accounts, contract}) => {
  return (web3 && accounts && contract)
}

export default () =>
  <Router>
    <Web3Loader render={web3Props => {
      if (web3IsReady(web3Props)) {
        return (
          <div>
            <Route exact path='/' component={Home} />
            <Route path='/bidding' render={routeProps => renderComponent(Bidding, routeProps, web3Props)} />
            <Route path='/itemOwner' render={routeProps => renderComponent(ItemOwner, routeProps, web3Props)} />
            <Route path='/accounts' render={routeProps => renderComponent(Accounts, routeProps, web3Props)} />
          </div>
        )
      } else {
        return <p>Loading web3, accounts, and contract.</p>
      }
    }} />
  </Router>
