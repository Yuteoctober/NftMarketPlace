import { useState, useEffect, useContext} from 'react';
import UseContext from './UserContext'
import axios from 'axios';
import {Routes, Route} from 'react-router-dom'
import Cart from './components/Cart';
import UserContext  from './UserContext';
import Nav from './components/Nav';
import ProjectPic from './components/ProjectPic';
import Search from './components/Search';
import Live from './components/Live';
import Nft from './components/Nft';
import Charts from './components/Chart';



function App() {
    const [mobileSandwich, setMobileSandwich] = useState<boolean>(false);
    const [dropHidden, setDropHidden] = useState<boolean>(false);
    const [statHidden, setStatHidden] = useState<boolean>(false);
    const [sortWin, setSortWin] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [expand, setExpand] = useState<boolean>(false);
    const [filterByInput, setFilterByInput] = useState<boolean>(false);
    const [item, setItem] = useState<boolean>(true);
    const [activity, setActivity] = useState<boolean>(false);
    const [nftData, setNftData] = useState<NftData[]>([]);
    const [drops, setDrops] = useState<boolean>(false);
    const [stats, setStats] = useState<boolean>(false);
    const [webHover, setWebHover] = useState<boolean>(false);
    const [xHover, setXHover] = useState<boolean>(false);
    const [filteredNftData, setFilteredNftData] = useState<NftData[]>([]);
    const [ethStates, setEthStates] = useState<boolean[]>(Array(nftData.length).fill(false));
    const [buy, setBuy] = useState<boolean[]>(Array(nftData.length).fill(false));
    const [cartItem, setCartItem] = useState<[]>([]);
    const [defaultNft, setDefaultNft] = useState<NftData[]>([]);
    const [scrollPosition, setScrollPosition] = useState<number>(0);


    interface NftData {
      nft: {
          image_url: string;
          name: string;
          rarity: {
            rank: number;
          };
      };
      value: string;
      setValue: React.Dispatch<React.SetStateAction<string>>;
    }


    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };
    
    useEffect(() => {
      window.addEventListener('scroll', handleScroll, true);
    
      return () => {
          window.removeEventListener('scroll', handleScroll, true);
      };
  }, []);


    const apiKey: string = '8cefdeec8c404d5ca4c2b27360b19dc2';
    const contract: string = '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8';
    const numIds: number = 24;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async (): Promise<void> => {
        try {
          const promises: Promise<any>[] = [];
          for (let index = 0; index < numIds; index++) {
              const id: number = index * Math.floor(Math.random()*87);
              const apiUrl: string = `https://api.opensea.io/api/v2/chain/ethereum/contract/${contract}/nfts/${id}`;
              promises.push(axios.get(apiUrl, {
                  headers: {
                      'X-API-KEY': apiKey,
                      'Content-Type': 'application/json',
                  },
              }));
          }

            const responses: any[] = await Promise.all(promises);

            const imageData: NftData[] = responses.map(response => response.data);

            setNftData(imageData.filter(data => data.nft && data.nft.image_url));

            // copy nft array
            setDefaultNft(imageData.filter(data => data.nft && data.nft.image_url))

            console.log(nftData, 'original')
     
        } catch (error) {
            console.log('Error fetching images: ' + error.message);
        }
    };

    const contextValue = {
      mobileSandwich, setMobileSandwich,
      dropHidden, setDropHidden,
      statHidden, setStatHidden,
      drops, setDrops,
      stats, setStats,
      expand, setExpand,
      item, setItem,
      activity, setActivity,
      webHover, setWebHover,
      xHover, setXHover,
      sortWin, setSortWin,
      inputVal, setInputVal,
      filterByInput, setFilterByInput,
      filteredNftData, setFilteredNftData,
      fetchData,
      nftData, setNftData,
      ethStates, setEthStates, 
      buy, setBuy,
      cartItem, setCartItem,
      defaultNft, setDefaultNft,
      scrollPosition, setScrollPosition,
    }

  return (
    <UserContext.Provider value={contextValue}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
      </Routes>
    </UserContext.Provider>
  )
}


function Home() {

  const {mobileSandwich} = useContext<any>(UseContext);

  return (
      <section style={{height: mobileSandwich? '100%':''}} >
        <Nav />
        <ProjectPic />
        <Search />
        <Live />
        <Nft />
        <Charts />
      </section>
  )
}

export default App