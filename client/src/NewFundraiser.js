import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import FundraiserFactoryContract from './contracts/FundraiserFactory.json'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'

const Container = styled('root')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const NewFundraiser = () => {
  const [name, setFundraiserName] = useState(null)
  const [url, setFundraiserWebsite] = useState(null)
  const [description, setFundraiserDescription] = useState(null)
  const [imageURL, setImage] = useState(null)
  const [beneficiary, setAddress] = useState(null)
  const [custodian, setCustodian] = useState(null)
  const [contract, setContract] = useState(null)
  const [accounts, setAccounts] = useState(null)

  const init = async () => {
    try {
      const provider = await detectEthereumProvider()
      const web3 = new Web3(provider)
      const networkId = await web3.eth.net.getId()
      const deployedNetwork = FundraiserFactoryContract.networks[networkId]
      const accounts = await web3.eth.getAccounts()
      const instance = new web3.eth.Contract(
        FundraiserFactoryContract.abi,
        deployedNetwork && deployedNetwork.address
      )
      setContract(instance)
      setAccounts(accounts)
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      )
      console.error(error)
    }
  }

  const handleSubmit = async () => {
    await contract.methods
      .createFundraiser(name, url, imageURL, description, beneficiary)
      .send({ from: accounts[0] })
    alert('Successfully created fundraiser')
  }

  return (
    <Container>
      <h2>Create a New Fundraiser</h2>
      <label>Name</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Name"
        margin="normal"
        onChange={e => setFundraiserName(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Website</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Website"
        margin="normal"
        onChange={e => setFundraiserWebsite(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Description</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Description"
        margin="normal"
        onChange={e => setFundraiserDescription(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Image</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Image"
        margin="normal"
        onChange={e => setImage(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Address</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Ethereum Address"
        margin="normal"
        onChange={e => setAddress(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <label>Custodian</label>
      <TextField
        id="outlined-bare"
        placeholder="Fundraiser Custodian"
        margin="normal"
        onChange={e => setCustodian(e.target.value)}
        variant="outlined"
        inputProps={{ 'aria-label': 'bare' }}
      />

      <Button onClick={handleSubmit} variant="contained">
        Submit
      </Button>
    </Container>
  )
}

export default NewFundraiser
