import React, { memo } from 'react'
import UpdateItem from '../../myItems/update-item/UpdateItem';
import { DeleteItem } from '../../myItems/remove-item/DeleteItem';
 const Table = (props) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Bids</th>
          {
            props.owner ? 
            <th>Action</th>
            : <th></th>
          }
          
        </tr>
      </thead>
      <tbody >
        {props.items.map((item) => {
          return( props.owner ?
            !item.ended && props.itemOwner === item.itemOwner &&
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.bidValueDollar.toNumber() === 0 
              ? item.bidValueStarting.toNumber() : item.bidValueDollar.toNumber() }
              </td>
                <td>
                  <div className="row">
                    <UpdateItem 
                      handleUpdateItem={props.handleUpdateItem} 
                      item={item}
                    />{' '}
                    <DeleteItem 
                      handleDeleteItem={props.handleDeleteItem} 
                      item={item}
                    />
                  </div>
                </td>
            </tr>
             : 
             !item.ended && props.itemOwner !== item.itemOwner &&
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.bidValueDollar.toNumber() === 0 
              ? item.bidValueStarting.toNumber() : item.bidValueDollar.toNumber() }
              </td>
                <td>
                </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default memo(Table);