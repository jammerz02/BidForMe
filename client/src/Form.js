import React, { Component } from 'react'

export default class form extends Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.bid(this.itemId.value)
      }}>
        <div class='form-group'>
          <label>Select Item</label>
          <select ref={(input) => this.itemId = input} class='form-control'>
            {this.props.items.map((item) => {
              return <option value={item.id}>{item.name}</option>
            })}
          </select>
        </div>
        <input type="number" />
        <button type='submit' class='btn btn-primary'>Bid</button>
        <hr />
      </form>
    )
  }
}