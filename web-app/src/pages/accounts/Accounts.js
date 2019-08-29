import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'

const Accounts = ({ accounts, location }) =>
  <Wrapper>
    <div className="text-center">
      <h1>My Accounts</h1>
    </div>
    <div className="text-center"x>
      <pre>{JSON.stringify(accounts, null, 4)}</pre>
    </div>
    
    <AppNavigation location={location} />
  </Wrapper>

export { Accounts }
