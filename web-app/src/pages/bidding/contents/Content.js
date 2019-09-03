import React, { memo } from 'react'
import Table from './Table'
import Form from './Form'
import AddItem from '../../myItems/add-item/AddItem'

const Content = (props) => {

  return (
    <div>
        <div className="pull-right">
          {
            props.owner ? 
            <div>
              <AddItem
                handleAddItem={props.handleAddItem}
              />
            </div> 
            : <div></div>
          }
        </div>
      <Table 
        key={props.items.id} 
        items={props.items} 
        handleUpdateItem={props.handleUpdateItem}
        handleDeleteItem={props.handleDeleteItem}
        owner={props.owner}
        itemOwner={props.itemOwner}
      />
      <hr/>
      { 
        <Form 
          items={props.items}
          handleEndAuction={props.handleEndAuction}
          owner={props.owner}
          itemOwner={props.itemOwner}
          handleBid={props.handleBid}
          handleWithdrawBid={props.handleWithdrawBid}
          handleAddItem={props.handleAddItem}
        />
        
      }
      <p>Your account: {props.account}</p>
    </div>
  )
}
export default memo(Content);