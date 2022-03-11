import React, {useState} from 'react'
import './App.css';

import {TextField, Button, FormControl, Table, TableBody, TableCell, TableRow} from '@mui/material';

const axios = require('axios').default;

const api = "https://api.blockchainapi.com/v1";
const apiKey = "x0Iheqnk0vtUGLO";
const apiSecret = "E0gQ6QPWJihidXC";

function App() {
  const [address, setAddress] = useState("")
  const [candymachineid, setCandyMachineID] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [metadata, setMetadata] = useState([]);
  const [responseContent, setResponseContent] = useState("");

  
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
  setMetadata("");
  request.post("/solana/nft/candy_machine_id", 
  { 
    "network": "mainnet-beta",
    "mint_address": address
  })
  .then( (response) => { 
       
      setCandyMachineID(response.data.candy_machine_id);

    }).catch( (err) =>{
      console.error("Request Error");
      console.error(err);
      setCandyMachineID("This NFT appears to be not minted using Candy Machine");
    });

    request.get("/solana/nft/mainnet-beta/" + address).then( (response) => {

      const data = response.data;
      const keys = Object.keys(data);
    
      var output = []
      for(var i=0; i<keys.length; i++){
          const obj = {};
          if(keys[i] !== "data"){
          obj[keys[i]] = data[keys[i]];
          output.push(obj);
          }
      }
      
      setMetadata(output);
    }).catch (( err) => {
      console.error("Request Error");
      console.error(err);
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
         
            <h3>Candy Machine ID for token a</h3>
            <p>{candymachineid}</p>
      </div>}
      {metadata && <div id="meta">
        <h3>NFT Meta Data</h3>
        <Table  align="center" size="small" sx={{alignSelf:"center", align:"center"}}>
          <TableBody>
         {metadata.map((item, index) => {
            console.log(item);
            return <TableRow key={index}>
                      <TableCell sx={{textAlign:"left"}}>{Object.keys(item)[0]}</TableCell>
                      <TableCell sx={{textAlign:"left"}}>{item[Object.keys(item)[0]].toString()} </TableCell> 
                    </TableRow>
          })}  
          </TableBody>
        </Table>   
        </div>}
    </div>
     
  );
}

export default App;
