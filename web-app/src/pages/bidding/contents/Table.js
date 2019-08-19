import React, { Component } from 'react'

export default class Table extends Component {
  render() {
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
          {this.props.items.map((item) => {
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
}