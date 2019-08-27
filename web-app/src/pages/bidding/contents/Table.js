import React, { memo } from 'react'

 const Table = (props) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Bids</th>
        </tr>
      </thead>
      <tbody >
        {props.items.map((item) => {
          return( !item.ended &&
              <tr key={item.id}>
                <th>{item.id.toNumber()}</th>
                <td>{item.name}</td>
                <td>{item.bidValueDollar.toNumber() === 0 
                ? item.bidValueStarting.toNumber() : item.bidValueDollar.toNumber() }
                </td>
              </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default memo(Table);