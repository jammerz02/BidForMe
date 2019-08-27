import React, { useState, useEffect } from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import Content from './contents/Content'

export const Bidding = (props) => {
    const [account, setAccount] = useState(props.accounts[0]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bidding, setBidding] = useState(false);
    const [owner] = useState(false);

  useEffect (() => {
    const getItems = async () => {
      const { accounts, contract } = props
      setAccount(accounts[0]);
      setLoading(true);
      watchEvents();
      const response = await contract.itemsCount();
      const items = [];
        for (var i = 1; i <= response; i++) {
          await contract.items(i).then((item) => {
            const userAccount = account.toLowerCase();
            const itemOwner = item[1];
            if(itemOwner !== userAccount) {
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
            setItems(items);
          });
        }
      setLoading(false);
    }
    getItems();
  }, [bidding]);

  

  const watchEvents = () => {
    const { contract } = props
    // TODO: trigger event when bid is counted, not when component renders
    contract.bidEvent({
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      setBidding(false)
    })
  }

  const convertDollarsToWei = (dollar) => {
    return dollar * 0.0032;
  }

  const handleBid = async (itemId, newbidValue) => {
    setBidding(true);
    const { 
      web3,
      accounts,
      contract,
      //secondaccounts
    } = props
    setAccount(accounts[0])
    var totalPriceInEther = convertDollarsToWei(newbidValue);
    if(itemId) {
      if(items[itemId-1].bidValueDollar.toNumber() < newbidValue && items[itemId-1].bidValueStarting.toNumber() < newbidValue) {
        setLoading(true);  
        contract.bid(itemId, newbidValue,
          { 
            from: account,
            // to: secondaccounts[2],
            value: web3.utils.toWei(""+totalPriceInEther, 'ether')
            // ,
            // gas: 300000,
            // data: contract.address
          })
       } else {
        alert(`It seems that your bid does not exceed the highest bid.`)
        setBidding(false);
       }
    } else {
      alert(`Please select an item.`)
      setBidding(false);
    }
  }

  const handleWithdraw = async () => {
    const { accounts,contract } = props
    setAccount(accounts[0] )
    var data = await contract.withdrawAmount({from: account})
      if(data) {
        var result = await contract.withdraw({ from: account })
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

    return (
      <Wrapper>
        <h1> Bid For Me</h1>
        <br/>
        { loading
          ? <p className='text-center'>Loading...</p>
          : <Content
              account={account}
              items={items}
              owner={owner}
              handleBid={handleBid}
              handleWithdrawBid={handleWithdraw}
            />
        }
        <AppNavigation location={props.location} />
      </Wrapper>
    )
  }

