import { useContext } from "react";
import UseContext from '../UserContext'
import { BsXLg } from "react-icons/bs";
import dance from '../assets/dance.gif'


function Cart() {

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

    const { cartItem, setCartItem} = useContext<any>(UseContext);

    // Function delete item in the cart
    function deleteItem(id:number, index:number) {
      if (cartItem[index].nft.identifier === id) {
          const updatedCart = cartItem.filter((item, idx:number) => idx !== index);
          setCartItem(updatedCart);
      }
  }

    return (
      
      <section className='cart_page'>

        {cartItem.length <= 0? (
          <>
            <div className="conversation-bubble">
              <p>Your cart is empty</p>
            </div>
            <div className="dance_gif">
              <img src={dance} alt="dance" />
            </div>
          </>
        ):(
          <div className="cart_container">
          <h3>
            Shopping Cart
          </h3>

          {cartItem.length > 0 && cartItem.map((nft:object, index:number) => (
          <>
            <div className="cart_item" key={index}>
            <div className="cart_img" key={index}>
              <img src={nft.nft.image_url} alt="NFT" key={index}/>
            </div>
            <div className="cart_des" key={index}>
              <h4>{nft.nft.name}</h4>
              <p>Rank: {nft.nft.rarity.rank}</p>
            </div>
            <div className="cart_item_number" key={index}>
              <h4>1</h4>
            </div>
            <div className="cart_x" key={index}
              onClick={() => deleteItem(nft.nft.identifier, index)}
            >
              <span><BsXLg/></span>
            </div>
          </div>
          <div className="cart_line"></div>
          </> 
          ))}
          <button className='btn_checkout'>Checkout</button>
        </div>
        )}
        
      </section>

    
    
  )
}

export default Cart
