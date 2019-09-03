import React from 'react'

export const NoMatch = ({ location }) => {
    return (
        <div className="container">
            <div className="text-center" style={{ padding: '20px' }}>
                <h3>No match for <code>{location.pathname}</code></h3>
            </div>
        </div>
    )
  }