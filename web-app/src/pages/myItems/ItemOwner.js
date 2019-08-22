import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import Content from '../bidding/contents/Content'

// Demonstration of a basic dapp with the withWeb3 higher-order component
class ItemOwner extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      account: '0x0',
      items: [],
      loading: true,
      bidding: false,
      ended: false,
      owner: true
    }
    this.watchEvents = this.watchEvents.bind(this)
    this.endAuction = this.endAuction.bind(this)
  }

  async componentDidMount () {
    const { accounts, contract } = this.props
    this.setState({account: accounts[0], loading: true})
    this.watchEvents();
    const response = await contract.itemsCount()
    const items = []
      for (var i = 1; i <= response; i++) {
        await contract.items(i).then((item) => {
          const account = this.state.account.toLowerCase()
          const itemOwner = item[1]
          if(itemOwner === account && !item[6]) {
            items.push({
              id: item[0],
              itemOwner: item[1],
              name: item[2],
              bidValueDollar: item[3],
              bidValueStarting: item[4],
              ended: item[6],
              bidValueWei: item[7],
            });
          }
          this.setState({ items: items })
        });
      }
      this.setState({ loading: false })
  }

  getValues = async () => {
    const { accounts, contract } = this.props
    this.setState({account: accounts[0], loading: true})
    this.watchEvents();
    const response = await contract.itemsCount()
    this.state.items = [];
    var endCount = 0
      for (var i = 1; i <= response; i++) {
        await contract.items(i).then((item) => {
          const account = this.state.account.toLowerCase()
          const itemOwner = item[1]
          const items = [...this.state.items]
          if(itemOwner === account) {
            items.push({
              id: item[0],
              itemOwner: item[1],
              name: item[2],
              bidValueDollar: item[3],
              bidValueStarting: item[4],
              ended: item[6],
              bidValueWei: item[7],
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
    // TODO: trigger event when vote is counted, not when component renders
    contract.bidEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      this.setState({ bidding: false })
    })
  }

  endAuction = async (itemId) =>  {
    const { 
      accounts,
      contract,
     // secondaccounts
    } = this.props

    this.setState({ 
      account: accounts[0], 
      ended: true
     })
    contract.auctionEnd(itemId,
      { 
        from: this.state.account
     })
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
              end={this.endAuction} />
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

export { ItemOwner }
