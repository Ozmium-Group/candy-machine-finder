import React, {useState} from 'react'
import './App.css';

import {TextField, Button, FormControl, FormControlLabel} from '@mui/material';

const axios = require('axios').default;

const api = "https://api.blockchainapi.com/v1";
const apiKey = "";
const apiSecret = "";

function App() {
  const [address, setAddress] = useState("")
  const [candymachineid, setCandyMachineID] = useState("");
  const [contractAddress, setContractAddress] = useState("");

  
  //const apiInstance = SolanaNFTApi();

  const request = axios.create({
    baseURL: api,
    timeout: 10000,
    headers: {
      'APIKeyID': apiKey,
      'APISecretKey': apiSecret
    }
  })

  const findCandyMachineId = async () => {
  //  request.get("/solana/nft/mainnet-beta/" + address)
  setCandyMachineID("");
  request.post("/solana/nft/candy_machine_id", 
  { 
    "network": "mainnet-beta",
    "mint_address": address
  })
  .then( (response) => { 
      console.log(response);
      
      setCandyMachineID(response.data.candy_machine_id);

    }).catch( (err) =>{
      console.error("Request Error");
      console.error(err);
      setCandyMachineID("This NFT appears to be not minted using Candy Machine");
    });
    
  }

  return (
    <div className="App">
      <h1>Candy Machine ID Finder</h1>
      <FormControl>
          <TextField id="address" name="address" label="Mint Address" variant="outlined" placeholder="Paste Mint Address here" value={address} onChange = { (e) => setAddress(e.target.value) } />
      </FormControl>
      <br />
      <br />
      <Button variant="contained" onClick={ findCandyMachineId }>Find Candy Machine ID</Button>
      {candymachineid !== "" &&<div id="result">
         
            <h3>Candy Machine ID</h3>
            <h4>{candymachineid}</h4>
      </div>}
    </div>
     
  );
}

export default App;
