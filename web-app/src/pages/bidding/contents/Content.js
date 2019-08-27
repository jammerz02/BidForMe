import React, { memo } from 'react'
import Table from './Table'
import Form from './Form'

const Content = (props) => {
  return (
    <div>
      <Table key={props.items.id} items={props.items} />
      <hr/>
      { 
        <Form 
          items={props.items}
          handleEnd={props.end}
          owner={props.owner}
          handleBid={props.handleBid}
          handleWithdrawBid={props.handleWithdrawBid} 
        />
        
      }
      <p>Your account: {props.account}</p>
    </div>
  )
}
export default memo(Content);