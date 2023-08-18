import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

// Components
import Makeitem from './components/Makeitem'
import Navigation from './components/Navigation'
import Section from './components/Section'
import Product from './components/Product'
import { contract_address_NFT,Contract_ABI_NFT,contract_address_Market,Contract_ABI_Market,contract_address_Coin,Contract_Coin_ABI } from './constant/constant'
import { ContractType } from 'hardhat/internal/hardhat-network/stack-traces/model'


function App() {
  const [account,setaccount] = useState(null)
  const [provider,setprovider] = useState(null)
  const [contract_of_coin,setcontract_of_coin] =useState(null)
  const [contract,setcontract] = useState(null)
  const [electronic,setelectronic] = useState(null)
  const [clothing,setclothing] = useState(null)
  const [toys,settoys] = useState(null)
  const [items,setitems] = useState(null)
  const [item,setitem] = useState(null)
  const [items_of_sold,setitem_of_sold] =useState(null)
  const [toggle,settoggle] = useState(false)
  const [provider_of_coin,setprovider_of_coin] = useState(null)
  const [toggleofMakeitem,settoggleofMakeitem] = useState(false)
  const [contract_from_market,setcontract_from_market] = useState(null)
  const [items_of_sold_id,setitem_of_sold_id] = useState(0)
  const [provider_of_nft,setprovider_of_nft] = useState(null)
  const [contract_of_nft,setcontract_of_nft] = useState(null)
  const [item_from_nft,setitem_from_nft] = useState(null)
  const togglePop = (id) => {
    
      const item_ = items_of_sold[id]
      if(item_ ==undefined) {
        console.log("da vao day")
      }
      else {
        const item = items[item_.itemId-1]
        console.log(item)
        setitem_from_nft(item)
      }
      setitem(item_)
    
      toggle ? settoggle(false) : settoggle(true)
    }
  const togglePopItem = () => {
    toggleofMakeitem ? settoggleofMakeitem(false) : settoggleofMakeitem(true)
  } 
    const LoadDataContract = async ()=> {
   
     const items_of_sold = []
      const items = []
    if(window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contract_address_Market,Contract_ABI_Market,signer)
      const provider_of_nft = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net")
      const contract_of_nft = new ethers.Contract(contract_address_NFT,Contract_ABI_NFT,provider_of_nft)
      const provider_of_coin = new ethers.providers.JsonRpcProvider("https://public-en-baobab.klaytn.net")
      const contract_of_coin = new ethers.Contract(contract_address_Coin,Contract_Coin_ABI,provider_of_coin)
      setprovider_of_coin(provider_of_coin)
      setprovider(provider)
      setprovider_of_nft(provider_of_nft)
    //  for (let i = 0 ; i<10;i++) {
    //   const tmp = i+1
    //   const transaction = await contract.makeItem(tmp,20,20)
    //   await transaction.wait()
    //  }
      console.log(contract)
      console.log(contract_of_nft)
      console.log(contract_of_coin)
      setcontract_of_coin(contract_of_coin)
      setcontract_from_market(contract)
      setcontract_of_nft(contract_of_nft)
      const amount_of_item = await contract.itemCount()
     const number_items = parseInt(amount_of_item._hex)
      console.log(number_items)
     for (let i=1; i<=number_items;i++) {
      const item = await contract.items(i)
      items_of_sold.push(item)
      const itemID= item.itemId
      
      const item_ = await contract_of_nft.items(itemID.toString()-1)
       items.push(item_)
      
     }
     setitems(items)
       setitem_of_sold(items_of_sold)
    }
    else {
      console.log("ch cai ")
    }
  } 
  function handleAccountsChanged(accounts) {
    if(accounts.length >0 && account != accounts[0])
    {
      setaccount(accounts[0])

    }
    else {
      setaccount(null)
    }
    
  }
  const Withdraw = async() => {
    
    let adres  = await contract.owner()
    if (adres == account) {
      const signer  = await provider.getSigner()
      let transaction = await contract.connect(signer).withdraw();
      await transaction.wait()
    }
    else {
      alert("You can't withdraw, man")
    }
    // console.log(adres)
    // console.log(account)
  }
  
  useEffect(() => {
    LoadDataContract();

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return() => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    }
  }, [])
  return (
    <div>
      <Navigation account = {account}
      contract_of_coin ={contract_of_coin}
      provider = {provider_of_coin}
      setaccount = {setaccount}
      contract_of_nft={contract_of_nft}
      provider_of_nft = {provider_of_nft}
      toggle = {toggleofMakeitem}
      settoggle = {settoggleofMakeitem}
      />
      <h2>Welcome to Dappazon</h2>
      {items &&(
        <>
        <Section title={"Clothing and Jewelry"} items_of_sold={items_of_sold} items={items} togglePop={togglePop} setitem_of_sold_id={setitem_of_sold_id}/>
        {/* <Section title={"Electronics and Gadgets"} items={electronic} togglePop={togglePop}/>
        <Section title={"Toys and Gaming"} items={toys} togglePop={togglePop}/> */}
        </>
      )}
      {toggle &&
      (
         <Product item_nft= {item_from_nft} item={item} items_of_sold ={items_of_sold} provider={provider} account={account} dappazon={contract_from_market} togglePop={togglePop} id_of_sold = {items_of_sold_id}/>
      )
      } 
      {
        toggleofMakeitem && (
          <Makeitem toggle={toggleofMakeitem} 
          settoggle = {togglePopItem}
          contract = {contract_from_market}
          provider={provider}
          />
        )
      }

    </div>
  );
}

export default App;