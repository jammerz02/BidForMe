import React from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import 'bootstrap/dist/css/bootstrap.css'
import Auction from '../../client/src/contracts/Auction.json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      items: [],
      hasVoted: false,
      loading: true,
      voting: false,
    }

    if (typeof web3 != 'undefined') {
      this.web3Provider = web3.currentProvider
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.auction = TruffleContract(Auction)
    this.auction.setProvider(this.web3Provider)

    this.castVote = this.castVote.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }


}

export default App;