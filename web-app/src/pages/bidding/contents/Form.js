import React, { Component } from 'react'

export default class form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      item: 0,
      bid: 0,
    }
  }

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.props.owner) {
      this.props.func(this.state.item)
    } else {
      this.props.func(this.state.item, this.state.bid)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <label>Select Item</label>
          <select value={this.state.selectedItem} name="item" onChange={this.handleOnChange} className='form-control'>
          <option value="">Select an option</option>
            {this.props.items.map((item) => {
              return( !item.ended && 
                  <option key={item.id} value={item.id}>{item.name}</option>
                
              )
            })}
          </select>
        </div>
        {this.props.owner ? 
          <div>
            <button type='submit' className='btn btn-primary'>End Auction</button>
            <hr />
          </div>  
        : <div>
            <input type="number" name="bid" value={this.state.bidValueDollar} onChange={this.handleOnChange} />
            <button type='submit' className='btn btn-primary'>Bid</button>
            <hr />
          </div>
        }
      </form>
    )
  }
}