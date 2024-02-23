import UseContext from '../UserContext'
import { useContext } from "react";
import profilePic from '../assets/5NrqFUSJ_400x400.jpg';
import { FcApproval } from 'react-icons/fc';
import { BsGlobe, BsTwitterX, } from "react-icons/bs";
import { motion } from "framer-motion"

export default function ProjectPic() {

    const {
        expand, setExpand,
        item, setItem,
        activity, setActivity,
        webHover, setWebHover,
        xHover, setXHover,
      } = useContext<any>(UseContext);

  return (
    <>
        <div className="project_pic">
          <img src={profilePic}/>
        </div>
        <div className="project_name">
          <h3>Pudgy Penguins <span><FcApproval /></span></h3>
          <h4>ThelglooCompany&nbsp;
            <span>
               <FcApproval />
            </span>
          </h4>
          <p></p>
          <div className='social'>
            <motion.span className='web'
              onHoverStart={() => setWebHover(true)}
              onHoverEnd={() => setWebHover(false)}
            >
              <BsGlobe/>
            </motion.span>
            <div className='web_pop' 
              style={{opacity: webHover? 1:0}}
            >Website</div>
            <div className='twitter_pop'
              style={{opacity: xHover?1:0}}
            >Twitter</div>
              <a href="https://twitter.com/pudgypenguins" target="_blank">
                <motion.span className='x'
                  onHoverStart={() => setXHover(true)}
                  onHoverEnd={() => setXHover(false)}
                >
                  <BsTwitterX/>
                </motion.span>
              </a>
          </div>
        </div>
        
        <div className="line"></div>

        <div className="price_top">
          <div className="price1">
            <p style={{paddingBottom: '2px', color: 'white'}}>300,806 ETH</p>
            <p style={{color: '#f0eeeedc'}}>Total volume</p>
          </div>
          <div className="price2">
            <p style={{paddingBottom: '2px', color: 'white'}}>21 WETH</p>
            <p style={{color: '#f0eeeedc'}}>Floor price</p>
          </div>
          <div className="price3">
            <p style={{paddingBottom: '2px', color: 'white'}}>20.01 WETH</p>
            <p style={{color: '#f0eeeedc'}}>Best offer</p>
          </div>
          <div className="price4">
            <p style={{paddingBottom: '2px', color: 'white'}}>2%</p>
            <p style={{color: '#f0eeeedc'}}>Listed</p>
          </div>
          <div className="price5">
            <p style={{paddingBottom: '2px', color: 'white'}}>4,441 (50%)</p>
            <p style={{color: '#f0eeeedc'}}>Owners (Unique)</p>
          </div>
        </div>

        <div className="description" 
          style={{height: !expand?'20px':''}}
        >
          <p
            style={{whiteSpace: !expand?'nowrap':'', width: !expand?'70%':'85%'}}
          >
          Pudgy Penguins is a collection of 8,888 NFT’s, accelerating Web3 innovation through IP utilization and community empowerment. Embodying love, empathy, & compassion, the Pudgy Penguins are a beacon of good vibes & positivity for everyone. Each holder receives exclusive access to experiences, 
          events, IP licensing opportunities and more.
          <br />
          <br />
          Let’s break through the boundaries of Web3 together.
          </p>
          {!expand && (
        <button className='desseemore' onClick={() => setExpand(true)}>
            See more
        </button> 
            )}
        </div>
        {expand && (
            <button className='desseeless' onClick={() => setExpand(false)}>
                See less
            </button>
        )}

        <div className="below_des"
          style={{marginTop: '1rem'}}
        >
          <h4>Items 8,888</h4>
          <p>·</p>
          <h4>Created Jul 2021</h4>
          <p>·</p>
          <h4>Creator earnings 5%</h4>
          <p>·</p>
          <h4>Chain <span>Ethereum</span></h4>
        </div>
        
        <div className='item_btn'>
          <button style={{background: item?'#262525f3':'none'}}
            onClick={() => {setItem(true); setActivity(false)}}
          >Items
          </button>
          <button style={{background: activity?'#262525f3':'none'}}
            onClick={() => {setItem(false); setActivity(true)}}
          >Activity</button>
        </div>

        <div className="line_break">
          <p></p>
        </div>
    </>
  )
}
