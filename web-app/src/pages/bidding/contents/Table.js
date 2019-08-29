import React, { memo } from 'react'

 const Table = (props) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Bids</th>
        </tr>
      </thead>
      <tbody >
        {props.items.map((item) => {
          if(item) {
            return( 
              !item.ended &&
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.bidValueDollar.toNumber() === 0 
                ? item.bidValueStarting.toNumber() : item.bidValueDollar.toNumber() }
                </td>
              </tr>
          )
          } else {
            return (
              <tr>
                <td>There are no items registered for bidding.</td>
              </tr>
            )
          }
        })}
      </tbody>
    </table>
  )
}
export default memo(Table);