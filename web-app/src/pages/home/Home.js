import React from 'react'
import { Wrapper } from 'components/wrapper'
import { AppNavigation } from 'components/navigation'

const Home = ({ location }) =>
  <Wrapper>
    <div className="text-center">
      <h1>Home</h1>
    </div>
    <p className="text-center">Note that Web3 is already loaded.</p>
    <AppNavigation location={location} />
  </Wrapper>

export { Home }
