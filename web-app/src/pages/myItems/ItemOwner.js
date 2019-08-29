import React, { useState, useEffect } from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'
import Content from '../bidding/contents/Content'

export const ItemOwner = (props) => {
  const [account, setAccount] = useState(props.accounts[0]);
  const [items, setItems] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);
  const [owner] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  useEffect (() => {
    const getItems = async () => {
      const { accounts, contract } = props
      setAccount(accounts[0])
      setLoading(true);
      const response = await contract.itemsCount()
      const items = []
      const userAccount = account.toLowerCase()
        for (var i = 1; i <= response.toNumber(); i++) {
          await contract.items(i).then((item) => {
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
  }, [updating])

  const handleModalShow = (modal) => {
    setModalShow(!modal)
  }

  const handleAddItem = async (itemName, itemStartingBid, modal) => {
    setUpdating(true)
    const { 
      accounts,
      contract
    } = props
    setAccount(accounts[0])
    if(itemName && itemStartingBid) {
      var result = await contract.addItem(itemName, itemStartingBid, { from: account })
      const data = result
        if(data) {
          alert('Item Added')
          setUpdating(false)
        } else {
          alert('Item is not Added.')
        }
      handleModalShow(modal)
    } else {
      alert(`Please add an Item name and its starting bid.`)
      setUpdating(false)
    }
  }

  const handleEndAuction = async (itemId) =>  {
    setLoading(true);
    const { 
      accounts,
      contract,
     // secondaccounts
    } = props
    setAccount(accounts[0]);
    if(itemId) {
      if (items[itemId-1].bidValueDollar.toNumber()) {
        
        contract.auctionEnd(itemId,
          { 
            from: account
          })
      } else {
        alert("This auction doesn't have any bid")
      }
    } else {
      alert("Please select an item.")
    }
  }

    return (
      <Wrapper>
        <div className="text-center">
          <h1> Items For Bidding</h1>
        </div>
        
        <br/>
        { loading
          ? <p className='text-center'>Loading...</p>
          : <Content
              account={account}
              items={items}
              owner={owner}
              modalShow={modalShow}
              handleModalShow={handleModalShow}
              handleEndAuction={handleEndAuction}
              handleAddItem={handleAddItem}
            />
        }
        <AppNavigation location={props.location} />
      </Wrapper>
    )
}