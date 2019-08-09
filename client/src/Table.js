import React, { Component } from 'react'

export default class Table extends Component {
  render() {
    return (
      <table class='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Bids</th>
          </tr>
        </thead>
        <tbody >
          {this.props.items.map((item) => {
            return(
              <tr>
                <th>{item.id.toNumber()}</th>
                <td>{item.name}</td>
                <td>{item.bidValue.toNumber() == 0 
                ? item.bidValueStarting.toNumber() : item.bidValue.toNumber() }
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}