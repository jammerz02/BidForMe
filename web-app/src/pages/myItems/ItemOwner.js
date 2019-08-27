import React, { useState, useEffect } from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import Content from '../bidding/contents/Content'

export const ItemOwner = (props) => {
  const [account, setAccount] = useState(props.accounts[0]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ended, setEnded] = useState(false);
  const [owner] = useState(true);

  useEffect (() => {
    const getItems = async () => {
      const { accounts, contract } = props
      setAccount(accounts[0])
      setLoading(true);
      watchEvents();
      const response = await contract.itemsCount()
      const items = []
        for (var i = 1; i <= response; i++) {
          await contract.items(i).then((item) => {
            const userAccount = account.toLowerCase()
            const itemOwner = item[1]
            if(itemOwner === userAccount && !item[6]) {
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
            setItems(items);
          });
        }
        setLoading(false);
    }
    getItems();
  }, [ended])

  const watchEvents= () => {
    const { contract } = props
    contract.bidEvent({}, {
      fromBlock: 0,
      toBlock: 'latest'
    }).watch((error, event) => {
      setEnded(false);
    })
  }

  const endAuction = async (itemId) =>  {
    const { 
      accounts,
      contract,
     // secondaccounts
    } = props
    setAccount(accounts[0]);
    setEnded(true);
    setLoading(true);
    contract.auctionEnd(itemId,
      { 
        from: account
      })
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
              end={endAuction} />
        }
        <AppNavigation location={props.location} />
      </Wrapper>
    )
}