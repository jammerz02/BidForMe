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
    this.endAuction = this.endAuction.bind(this)
  }

  async componentDidMount () {
     await this.getItems()
  }

  getItems = async () => {
    const { accounts, contract } = this.props
    this.setState({account: accounts[0], loading: true})
    this.watchEvents();
    const response = await contract.itemsCount()
    this.state.items = []
    var endCount = 0
      for (var i = 1; i <= response; i++) {
        await contract.items(i).then((item) => {
          const account = this.state.account.toLowerCase()
          const itemOwner = item[1]
          const items = [...this.state.items]
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
          if(item[6]) {
            endCount++
          }
          this.setState({ 
            items: items,
            endedCounter: endCount
          })
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

  endAuction = async (itemId) => {
    const { 
      // web3,
      accounts,
      contract,
     // secondaccounts
    } = this.props

    this.setState({ account: accounts[0] })
    contract.auctionEnd(itemId,
      { 
        from: this.state.account
     })
    //  .then(err,result) {
    //    console.log(err)
    //    console.log(result)
    //  }
  }

  render () {
    // Uncomment to use web3, accounts or the contract:
    // const { web3, accounts, contract } = this.props
   // const { items } = this.state
    return (
      <Wrapper>
        {/* <h1>My DApp</h1>
        <div>
          <P>Current Balance: {balance}</P>
          <Button leftMargin onClick={this.getValue}>Refresh...</Button>
        </div>
        <Button onClick={this.storeValue}>Add 5 to the account balance</Button>
        <AppNavigation location={this.props.location} /> */}
        <h1> Bid For Me</h1>
        <br/>
        { this.state.loading
          ? <p className='text-center'>Loading...</p>
          : <Content
              account={this.state.account}
              items={this.state.items}
              owner={this.state.owner}
              bid={this.bid}
              end={this.endAuction}
            />
        }
        <AppNavigation location={this.props.location} />
      </Wrapper>
    )
  }
}

// const P = ({ children }) =>
//   <p style={{ display: 'inline-block', marginBottom: '20px' }}>{ children }</p>

// const Button = ({ children, leftMargin, ...rest }) => (
//   leftMargin
//     ? <button style={{ marginLeft: '20px' }} {...rest}>{ children }</button>
//     : <button {...rest}>{ children }</button>
// )

export { Bidding }
