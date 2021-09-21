import React,{useState,useEffect} from 'react';
import { getAPI } from '../services/api';
import Loader from './Loader';
import styles from "./Landing.module.css"
import Coin from './Coin';
const Landing = () => {

    const [coins,setCoins] = useState([])
    const [search,setSearch]=useState("")
    useEffect(()=>{
        const fetchAPI = async ()=>{
            
            setCoins(await getAPI())
        }

        fetchAPI()


    },[])

    const searchhandler = event =>{
        setSearch(event.target.value)
    }

    const serachCoins = coins.filter(coin=> coin.name.toLowerCase().includes(search.toLowerCase()) )
    return (
      <>
        <input className={styles.input} type="text" placeholder="Search" value={search} onChange={searchhandler}/>

        {
            coins.length ?
            <div className={styles.coinContainer}>
            {
                serachCoins.map(coin=> <Coin key={coin.id} name={coin.name} image={coin.image} symbol={coin.symbol} price={coin.current_price} marketCap={coin.market_cap} priceChange={coin.market_cap_change_percentage_24h}/>)
            }
        </div>
        : <Loader/>
        }
        
      </>
    );
};

export default Landing;