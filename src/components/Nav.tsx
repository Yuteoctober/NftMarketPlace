import { useState, useEffect, useContext } from "react";
import UseContext from '../UserContext'
import { Link } from 'react-router-dom';
import { BsXLg, 
    BsCalendar2DateFill, BsBarChartLineFill,
    BsChevronRight, BsChevronDown, BsCartFill, BsList  } from "react-icons/bs";
import { MdOutlineShoppingCart } from "react-icons/md";
import { motion } from "framer-motion"
import OpenLogo from '../assets/opensea.svg'
import bg from '../assets/63d2aff450d54fa7c21bde38_ff12374123ac5e8571b01d03874e8a76-_1_.jpg';



export default function Nav() {

    const {
        mobileSandwich, setMobileSandwich,
        dropHidden, setDropHidden,
        statHidden, setStatHidden,
        drops, setDrops,
        stats, setStats,
        scrollPosition, setScrollPosition,
      } = useContext<any>(UseContext);


      


  return (
    <>
        <div className="bg">
          <img src={bg} />
        </div>

        <div className="blur"></div>
        <motion.div className="nav_container" 
          style={{
            background: mobileSandwich ? '#121313' : (!mobileSandwich && scrollPosition < 50 ? 'transparent' : '#151515')
          }}>
          <div className='logo'>
            <img src={OpenLogo} alt="OpenLogo" />
            <h2>OpenNFT</h2>
          </div>
          <div className='slash'></div>
          <div className='nav_btn'>
            <motion.button className='btn1'
              onHoverStart={() => {setDrops(true); setStats(false)}}
              onClick={() => {setDrops(!drops); setStats(false)}}
            >Drops</motion.button>
            <motion.button className='btn2'
              onHoverStart={() => {setStats(true); setDrops(false)}}
              onClick={() => {setStats(!stats); setDrops(false)}}
            >Stats</motion.button>
            
              <motion.div 
                className='drops_drop'
                onMouseLeave={() => setDrops(false)}
                initial={{ y: -20, opacity: 0}}
                animate={{ y: drops ? 0 : -20, opacity: drops ? 1 : 0 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}  
              >
              <h4>Featured</h4>
              <h4>Learn more</h4>
            </motion.div>
              <motion.div className='stats_drop'
                onMouseLeave={() => setStats(false)}
                initial={{ y: -20, opacity: 0}}
                animate={{ y: stats ? 0 : -20, opacity: stats ? 1 : 0 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}    
              >
              <h4>Rankings</h4>
              <h4>Activity</h4>
            </motion.div>
          </div>
          <div className='sandwitch'
            onClick={() => {setMobileSandwich(!mobileSandwich);
                            setStatHidden(false);
                            setDropHidden(false)}}
          >
            {mobileSandwich?<BsXLg/>:<BsList />}
          </div>
            <div className='cart'>
            <Link to="/cart" style={{color: 'inherit'}}>
              <button>
                <span>
                  <MdOutlineShoppingCart/>
                </span>
              </button>
            </Link>
            </div>
        </motion.div>

        {/* ---------------- MOBILE SANDWITCH ------------- */}
        {mobileSandwich && (
          <motion.div className="mobile_bg_container"
            initial={{x: 500, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: .3, ease: 'easeInOut'}}
          >
          <Link to="/cart" style={{color: 'transparent'}}
            onClick={() => setMobileSandwich(false)}
          >
            <h2>
              <BsCartFill className='mobile_icon'/>
            Cart
          </h2>
          </Link>
          <br />
          <h2 onClick={() => setDropHidden(!dropHidden)}>
            <BsCalendar2DateFill className='mobile_icon'/>
            Drops
            <span>
              {dropHidden?<BsChevronDown/>:<BsChevronRight/>}
            </span>
          </h2>
          {dropHidden && (
            <>
              <h3>· Featured</h3>
              <h3>· Learn more</h3>
            </>
          )}
          <br />
            <h2 onClick={() => setStatHidden(!statHidden)}>
              <BsBarChartLineFill className='mobile_icon'/>
              Stats
              <span>
              {statHidden?<BsChevronDown/>:<BsChevronRight/>}
              </span>
            </h2>
          {statHidden && (
            <>
              <h3>· Ranking</h3>
              <h3>· Activity</h3>
            </>
          )}
        </motion.div>
        )}
        
    </>
  )
}
