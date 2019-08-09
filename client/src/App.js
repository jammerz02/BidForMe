import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Web3 from 'web3'
import TruffleContract from 'truffle-contract'
import Auction from '../../client/src/contracts/Auction.json'
import Content from './Content'
import 'bootstrap/dist/css/bootstrap.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      items: [],
      hasBid: false,
      loading: true,
      bidding: false,
    }

    var web3;

    if (typeof web3 != 'undefined') {
      this.web3Provider = new Web3(web3.currentProvider);
    } else {
      this.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545')
    }

    this.web3 = new Web3(this.web3Provider)

    this.auction = TruffleContract(Auction);
    this.auction.setProvider(this.web3Provider);

    this.bid = this.bid.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
  }

  componentDidMount() {
    // TODO: Refactor with promise chain
    this.web3.eth.getAccounts(console.log);
    this.web3.eth.getCoinbase((err, account) => {
      console.log(account);
      if (err == null) {
        this.setState({ account });
      }
      this.auction.deployed().then((auctionInstance) => {
        this.auctionInstance = auctionInstance;
        this.watchEvents();
        this.auctionInstance.itemsCount().then((itemsCount) => {
          for (var i = 1; i <= itemsCount; i++) {
            this.auctionInstance.items(i).then((item) => {
              const items = [...this.state.items]
              items.push({
                id: item[0],
                name: item[1],
                bidValue: item[2],
                bidValueStarting: item[3]
              });
              this.setState({ items: items })
            });
          }
        })
        this.auctionInstance.bidders(this.state.account).then((hasBid) => {
          this.setState({ hasBid, loading: false })
        })
      })
    })
  }

  watchEvents() {
    // TODO: trigger event when vote is counted, not when component renders
    this.auctionInstance.bidEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ bidding: false })
    })
  }

  bid(itemId) {
    this.setState({ bidding: true })
    this.auctionInstance.bid(itemId, { from: this.state.account }).then((result) =>
      this.setState({ hasBid: true })
    )
  }

  render() {
    return (
      <div class='row'>
      <div class='col-lg-12 text-center' >
        <h1> Bid For Me</h1>
        <br/>
        { this.state.loading || this.state.bidding
          ? <p class='text-center'>Loading...</p>
          : <Content
              key={this.state.items.id}
              account={this.state.account}
              items={this.state.items}
              hasVoted={this.state.hasBid}
              bid={this.bid} />
        }
      </div>
    </div>
    )
  }

}