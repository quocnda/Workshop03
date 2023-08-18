import { ethers } from 'ethers';
// import Web3 from "web3"
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Contract_Coin_ABI,contract_address_Coin } from '../constant/constant';
const Navigation = ({ account,contract_of_coin,provider_of_coin,setaccount,contract_of_nft,provider_of_nft,toggle,settoggle }) => {
    const [number,setnumber] = useState(0)
    const [number_of_balance,setnumber_of_balance] = useState(0)
    const connectHandle = async () => {
        if(window.ethereum) {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const account = ethers.utils.getAddress(accounts[0])
       
        setaccount(account)
        }
        else {
            aler()
        }
    }
    const aler = () => {
        alert("Please install metamask")
    }
    const handleOnchange = async(e) => {
        setnumber(e.target.value)
    } 
    const handleOfDeposit = async() => {
        console.log(number)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contract_address_Coin,Contract_Coin_ABI,signer)
        await contract.deposit({value: ethers.utils.parseUnits(number,"ether")})
       
    }
    const changeBlance = async() => {
        const balance_ = await contract_of_coin.balanceOf(account)
        console.log(account)
        
        const balance_of_coi = parseInt(balance_._hex)
        setnumber_of_balance(balance_of_coi)
    }
    const HandleBUtttonMakeItem = async() => {
        toggle ? settoggle(false) : settoggle(true)
    }
    const HanldeMyBalance = async() => {
        console.log(contract_of_nft)
        const items_user_count = []
        for(let i = 1;i<=10;i++) {
            const item = await contract_of_nft.balanceOf(account,i)
            const item_ = await contract_of_nft.items(i-1)
            if(item>0) {
                console.log(item_.name)
                console.log(item.toString())
            } 
        }
    }
    useEffect(() => {
       changeBlance();  
    },[account])
    return (
        
        <nav>
            <div className='nav__brand'>
                    <h1>Decentralized Market</h1>
            </div>
            <div className='nav__main'>
            
                <input type='text'
                className='nav__search'
                />
                <input type='number' className='nav__value' value={number} onChange={handleOnchange}/>           
                <button type='button'
                className='nav__connect' 
                onClick={handleOfDeposit}
                >
                    Deposit
                </button>
                {
                    
                    account ? 
                (
                <button
                type='button'
                className='nav__connect'
                >
                    {account.slice(0,6)+ '...' + account.slice(38,42)}
                </button>
                ) : (
                    <button type='button'
                    className='nav__connect'
                    onClick={connectHandle}
                    >
                        Connect

                    </button>
                )
                    
                }
            </div>
            <div className='nav__sub'>

                <div className='nav__links'>
                <li> <a href='#Clothing and Jewelry'> {number_of_balance} </a> </li>
                <li> <button className='nav__connect' type='button'
                    onClick={HandleBUtttonMakeItem}
                    >Make Item</button> </li>
                </div>
                <ul className='nav__links'>
                    <li>  <button onClick={HanldeMyBalance}><a> My Blance Of Items</a></button> </li>
                    <li> <a href='#Electrionic and Gadgets'> Electronic and Gadgets</a></li>
                    <li> <a href='#Toys and Gaming'> Toys and Gaming</a></li>
                </ul>

            </div>
        </nav>
    );
}

export default Navigation;