import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import Content from './contents/Content'

// Demonstration of a basic dapp with the withWeb3 higher-order component
class Bidding extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      account: '0x0',
      items: [],
      loading: true,
      bidding: false,
      ended: false,
      owner: false,
      endedCounter: 0
    }
    this.bid = this.bid.bind(this)
    this.watchEvents = this.watchEvents.bind(this)
    this.withdraw = this.withdraw.bind(this)
  }

  async componentDidMount () {
     await this.getItems()
  }

  getItems = async () => {
    const { accounts, contract } = this.props
    this.setState({account: accounts[0], loading: true})
    this.watchEvents();
    const response = await contract.itemsCount()
    const items = []
    var endCount = 0
      for (var i = 1; i <= response; i++) {
        await contract.items(i).then((item) => {
          const account = this.state.account.toLowerCase()
          const itemOwner = item[1]
          if(itemOwner !== account) {
            items.push({
              id: item[0],
              itemOwner: item[1],
              name: item[2],
              bidValueDollar: item[3],
              bidValueStarting: item[4],
              bidValueWei: item[7],
              ended: item[6]
            });
          }
          this.setState({ items: items })
        });
      }
    this.setState({ loading: false })
  }

  watchEvents() {
    const { contract } = this.props
    // TODO: trigger event when bid is counted, not when component renders
    contract.bidEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ bidding: false })
    })
  }

  convertDollarsToWei(dollar) {
    return dollar * 0.0032;
  }

  bid = async (itemId, newbidValue) => {
    const { 
      web3,
      accounts,
      contract,
      //secondaccounts
    } = this.props
    this.setState({ account: accounts[0] })
    var totalPriceInEther = this.convertDollarsToWei(newbidValue);
    if(itemId) {
      if(this.state.items[itemId-1].bidValueDollar.toNumber() < newbidValue && this.state.items[itemId-1].bidValueStarting.toNumber() < newbidValue) {
          contract.bid(itemId, newbidValue,
            { 
              from: this.state.account,
              // to: secondaccounts[2],
              value: web3.utils.toWei(""+totalPriceInEther, 'ether')
              // ,
              // gas: 300000,
              // data: contract.address
           })
          this.getItems()
       } else {
        alert(`It seems that your bid does not exceed the highest bid.`)
       }
    } else {
      alert(`Please select an item.`)
    }
  }

  withdraw = async () => {
    const { accounts,contract } = this.props
    this.setState({ account: accounts[0] })
    var data = await contract.withdrawAmount({from: this.state.account})
      if(data) {
        var result = await contract.withdraw({ from: this.state.account })
          const data = result
          if(data) {
            alert('successfully withdrawn')
          } else {
            alert('withdraw failed')
          }
      } else {
        alert("you don't have any balance")
      }
  }

  render () {
    return (
      <Wrapper>
        <h1> Bid For Me</h1>
        <br/>
        { this.state.loading
          ? <p className='text-center'>Loading...</p>
          : <Content
              account={this.state.account}
              items={this.state.items}
              owner={this.state.owner}
              bid={this.bid}
              withdrawBId={this.withdraw}
            />
        }
        <AppNavigation location={this.props.location} />
      </Wrapper>
    )
  }
}

export { Bidding }
