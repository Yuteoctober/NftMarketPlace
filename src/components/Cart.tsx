import { useContext } from "react";
import UseContext from "../UserContext";
import { BsXLg } from "react-icons/bs";
import dance from '../assets/dance.gif';

// Define the type for an individual cart item
interface CartItem {
  nft: {
    identifier: number; // Assuming this is the unique identifier for the item
    image_url: string;
    name: string;
    rarity: {
      rank: number;
    };
  };
  value: string;
}


type SetCartItem = React.Dispatch<React.SetStateAction<CartItem[]>>;

function Cart() {
  const { cartItem, setCartItem } = useContext<{ cartItem: CartItem[]; setCartItem: SetCartItem }>(UseContext);

  function deleteItem(id: number, index: number) {
    if (cartItem[index].nft.identifier === id) {
      const updatedCart = cartItem.filter((item, idx) => idx !== index);
      setCartItem(updatedCart);
    }
  }

  return (
    <section className='cart_page'>
      {cartItem.length <= 0 ? (
        <>
          <div className="conversation-bubble">
            <p>Your cart is empty</p>
          </div>
          <div className="dance_gif">
            <img src={dance} alt="dance" />
          </div>
        </>
      ) : (
        <div className="cart_container">
          <h3>Shopping Cart</h3>
          {cartItem.map((nft, index) => (
            <div className="cart_item" key={index}>
              <div className="cart_img">
                <img src={nft.nft.image_url} alt="NFT" />
              </div>
              <div className="cart_des">
                <h4>{nft.nft.name}</h4>
                <p>Rank: {nft.nft.rarity.rank}</p>
              </div>
              <div className="cart_item_number">
                <h4>1</h4>
              </div>
              <div
                className="cart_x"
                onClick={() => deleteItem(nft.nft.identifier, index)}
              >
                <span><BsXLg/></span>
              </div>
            </div>
          ))}
          <div className="cart_line"></div>
          <button className='btn_checkout'>Checkout</button>
        </div>
      )}
    </section>
  );
}

export default Cart;
