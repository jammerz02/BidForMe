import React from 'react'
import Web3 from 'web3'
import { getWeb3, getAccounts, getContractInstance } from 'services/web3'

export class Web3Loader extends React.Component {
  state = { 
    web3: null, 
    accounts: null, 
    secondweb3: null, 
    secondaccounts: null, 
    contract: null 
  }

  async componentDidMount () {
    try {
      const web3 = await getWeb3()
      const accounts = await getAccounts(web3)
      const contract = await getContractInstance(web3)
      const localProvider = process.env.REACT_APP_WEB3_PROVIDER_URL || 'http://localhost:7545'
      const provider = new Web3.providers.HttpProvider(localProvider)
      const secondweb3 = new Web3(provider)
      const secondaccounts = await getAccounts(secondweb3)
      this.setState({ 
        web3, //setting web3 to metamask
        accounts, //selected account on metamask
        secondweb3, //setting second web3 to local ganache
        secondaccounts, //ganache local accounts
        contract // abi calls
      })
    } catch (error) {
      alert(`Failed to load web3, accounts, and contract. Check console for details.`)
      console.log(error)
    }
  }

  render () {
    return this.props.render(this.state)
  }
}
