import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom'
import FundraiserFactoryContract from './contracts/FundraiserFactory.json'
import getWeb3 from './getWeb3'
import './App.css'
import NewFundraiser from './NewFundraiser'
import Home from './Home'
import { styled } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Root = styled('root')(({ theme }) => ({
  flexGrow: 1,
}))

const App = () => {
  const [state, setState] = useState({
    web3: null,
    accounts: null,
    contract: null,
  })

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3()
        const accounts = await web3.eth.getAccounts()
        const networkId = await web3.eth.net.getId()
        const deployedNetwork = FundraiserFactoryContract.networks[networkId]
        const instance = new web3.eth.Contract(
          FundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address
        )
        setState({ web3, accounts, contract: instance })
      } catch (error) {
        alert(
          `App.js: Failed to load web3, accounts, or contract.
           Check console for details.`
        )
        console.error(error)
      }
    }
    init()
  }, [])

  const runExample = async () => {
    const { accounts, contract } = state
  }

  return (
    <Router>
      <Root>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </Typography>
            <NavLink className="nav-link" to="/new/">
              New
            </NavLink>
          </Toolbar>
        </AppBar>

        <Route path="/" exact component={Home} />
        <Route path="/new/" component={NewFundraiser} />
      </Root>
    </Router>
  )
}

export default App
