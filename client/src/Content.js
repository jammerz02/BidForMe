import React, { Component } from '../node_modules/react'
import Table from './Table'
import Form from './Form'

export default class Content extends Component {
  render() {
    return (
      <div>
        <Table items={this.props.items} />
        <hr/>
        { !this.props.hasBid ?
          <Form items={this.props.items} bid={this.props.bid} />
          : null
        }
        <p>Your account: {this.props.account}</p>
      </div>
    )
  }
}