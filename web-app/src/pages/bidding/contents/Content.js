import React, { Component } from 'react'
import Table from './Table'
import Form from './Form'

export default class Content extends Component {
  render() {
    return (
      <div>
        <Table key={this.props.items.id} items={this.props.items} />
        <hr/>
        { 
          <Form 
            items={this.props.items} 
            bid={this.props.bid} 
            end={this.props.end}
            owner={this.props.owner}
          />
          
        }
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}