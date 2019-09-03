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
  const [itemOwner, setItemOwner] = useState();

  useEffect (() => {
    const getItems = async () => {
      const { accounts, contract } = props
      setAccount(accounts[0])
      setLoading(true);
      const response = await contract.itemsCount()
      const items = []
      if(account) {
        setItemOwner(account.toLowerCase())
      } else {
        alert('Failed to load account. Please make sure you shared the address to metamask to proceed, if error still occurs please check console for details.')
      }
        for (var i = 1; i <= response.toNumber(); i++) {
          await contract.items(i).then((item) => {
            items.push({
              id: item[0],
              itemOwner: item[1],
              itemId: item[2],
              name: item[3],
              bidValueDollar: item[4],
              bidValueStarting: item[5],
              ended: item[7],
              bidValueWei: item[8],
            });
            setItems(items);
          });
        }
      setLoading(false);
    }
    getItems();
  }, [updating])


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
          setUpdating(false)
        }
    } else {
      alert(`Please add an Item name and its starting bid.`)
      setUpdating(false)
    }
  }

  const handleUpdateItem = async (itemId, itemName, itemStartingBid) => {
    setUpdating(true)
    const { 
      accounts,
      contract
    } = props
    setAccount(accounts[0])
    if(itemName && itemStartingBid) {
      var result = await contract.updateItem(itemId, itemName, itemStartingBid, { from: account })
      const data = result
        if(data) {
          alert('Item Updated')
          setUpdating(false)
        } else {
          alert('Item failed to update.')
          setUpdating(false)
        }
    } else {
      alert(`Please add an Item name and its starting bid.`)
      setUpdating(false)
    }
  }

  const handleDeleteItem = async(id) => {
    setUpdating(true)
    const { 
      accounts,
      contract
    } = props
    setAccount(accounts[0])
    var result = await contract.removeItem(id, { from: account })
    const data = result
    if (data) {
      alert('Item Deleted')
      setUpdating(false)
    } else {
      alert('Failed to delete Item.')
      setUpdating(false)
    }
  }

  const handleEndAuction = async (id) =>  {
    setLoading(true)
    setUpdating(true)
    const { 
      accounts,
      contract,
     // secondaccounts
    } = props
    setAccount(accounts[0]);
    if(id) {
      if (items[id-1].bidValueDollar.toNumber()) {
        var result = await contract.auctionEnd(id, {  from: account })
        const data = result
        if (data) {
          alert('Auction Ended for item ' + items[id-1].name)
          setUpdating(false)
        } else {
          alert('Auction Failed to end.')
          setUpdating(false)
        }
      } else {
        alert("This auction doesn't have any bid")
        setUpdating(false)
        setLoading(false);
      }
    } else {
      alert("Please select an item.")
      setUpdating(false)
      setLoading(false);
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
              itemOwner={itemOwner}
              handleEndAuction={handleEndAuction}
              handleUpdateItem={handleUpdateItem}
              handleDeleteItem={handleDeleteItem}
              handleAddItem={handleAddItem}
            />
        }
        <AppNavigation location={props.location} />
      </Wrapper>
    )
}