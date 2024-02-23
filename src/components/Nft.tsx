import React from 'react';
import { useContext } from "react";
import UseContext from '../UserContext'
import { motion } from "framer-motion"
import ETH from '../assets/Ethereum-Icon-Purple-Logo.wine.svg'

export default function Nft() {

    const {
        ethStates, setEthStates, 
        buy, setBuy,
        activity, 
        filterByInput, 
        filteredNftData, 
        nftData, 
        cartItem, setCartItem
      } = useContext<any>(UseContext);


    // function add buy to cart 
    const addToCart = (nft: any) => {
      
      if (
        cartItem &&
        cartItem.some((item: any) => item.nft.name === nft.nft.name)
      ) {
        alert(`Item is already in your cart.`);
        return;
      }
  
      const updatedCart = [...cartItem, nft];
      setCartItem(updatedCart);
      alert(`Item has been added in your cart.`)
  
  };

      
    // Function to toggle buy button
    const toggleBuy = (index: number) => {
        const newBuyBtn = buy.map(() => false);
        newBuyBtn[index] = !newBuyBtn[index];
        setBuy(newBuyBtn);
    };
  
      // Function make all Buy btn disappear
      const toggleAllBuyFalse = () => {
        const closeAllBuy = buy.map(() => false);
        setBuy(closeAllBuy);
      }
  
      // Function to toggle eth state for a specific index
      const toggleEthState = (index: number) => {
          const newEthStates = ethStates.map(() => false);
          newEthStates[index] = !newEthStates[index];
          setEthStates(newEthStates);
      };
      
  
      // Function make all ETH disappear
      const toggleEthStateAllFalse = () => {
        const closeAllETH = ethStates.map(() => false);
        setEthStates(closeAllETH);
      }

  return (
    <>
        {activity?
        (
          null
        )
        :
        (
          <motion.div className="nft_img">
          { nftData.length > 0 && (filterByInput ? filteredNftData : nftData).map((nft: any, index: number) => (
            <React.Fragment key={nft.id}>
              <motion.div className='img_container' key={nft.id} 
                onHoverStart={() => {toggleEthState(index); toggleBuy(index)}}
                onClick={() => {toggleEthState(index); toggleBuy(index)}}
                onMouseLeave={() => {toggleEthStateAllFalse(); toggleAllBuyFalse()}}
              >
                {ethStates[index] && (
                  <motion.div className="eth_circle" key={nft.id}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.15, ease: 'easeInOut' }}
                  >
                  <img src={ETH} alt="logo" className='ETH_logo' />
                </motion.div>
                )}
                <img src={nft.nft.image_url} alt={`NFT Image ${index}`} className='img_pudgy' />
                <div className='img_des_container' key={index}  >
                  <h4>{nft.nft.name}</h4>
                  <h4>Rank: {nft.nft.rarity.rank}</h4>
                  <motion.h3 key={index} 
                    onClick={() => addToCart(nft)}
                    animate={{y: buy[index]?0:50, opacity: 1}}
                    whileTap={{background: '#ffffff00'}}
                    transition={{ 
                      type: 'spring',
                      duration: 0.35,
                    }}
                    >
                    Buy now
                  </motion.h3>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </motion.div>
        )
        }
    </>
  )
}
