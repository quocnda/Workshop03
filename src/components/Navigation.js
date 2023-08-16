import { ethers } from 'ethers';
import { useState, useSyncExternalStore } from 'react';
import { Contract_Coin_ABI,contract_address_Coin } from '../constant/constant';
const Navigation = ({ account,contract_of_coin,provider_of_coin,setaccount,withdraw }) => {
    const [number,setnumber] = useState(0)

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
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contract_address_Coin,Contract_Coin_ABI,signer)
        const coin = await  contract.deposit()
        console.log(coin)
    }
    return (
        
        <nav>
            <div className='nav__brand'>
                <h1>Decentralized Market</h1>
            </div>
            <input type='text'
             className='nav__search'
            />
            <input type='number' value={number} onChange={handleOnchange}/>           
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
            <ul className='nav__links'>
                <li> <a href='#Clothing and Jewelry'> Clothing and Jewelry</a> </li>
                <li> <a href='#Electrionic and Gadgets'> Electronic and Gadgets</a></li>
                <li> <a href='#Toys and Gaming'> Toys and Gaming</a></li>
            </ul>
        </nav>
    );
}

export default Navigation;