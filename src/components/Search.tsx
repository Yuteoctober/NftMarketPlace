import { useContext } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { MdOutlineSearch } from "react-icons/md";
import { BsXLg } from "react-icons/bs";
import UseContext from '../UserContext'
import { motion } from "framer-motion"

function Search() {


    const {
        sortWin, setSortWin,
        inputVal, setInputVal,
        setFilterByInput,
        filteredNftData, setFilteredNftData,
        activity,
        nftData, setNftData,
        defaultNft,
      } = useContext<any>(UseContext);

    //Filter to default
    function handleFilterDefault() {
      
      setNftData(defaultNft);
      }
  
      //Filter Rank low to high
      function handleSortRankLowtoHigh() {
        const sortedData = filteredNftData.length > 0 ? [...filteredNftData] : [...nftData];
        sortedData.sort((a, b) => {
          const rankA = a.nft.rarity.rank;
          const rankB = b.nft.rarity.rank;
          return rankA - rankB
        })
        setFilteredNftData(sortedData);
        setNftData(sortedData);
      }
  
      //Filter Rank hIGH to LOW
      function handleSortRankHighToLow() {
        const sortedData = filteredNftData.length > 0 ? [...filteredNftData] : [...nftData];
        sortedData.sort((a, b) => {
          const rankA = a.nft.rarity.rank;
          const rankB = b.nft.rarity.rank;
          return rankB - rankA
        })
        setFilteredNftData(sortedData);
        setNftData(sortedData);
      }
  
      // Filter Nymber low to high
      function handleSortLowToHigh() {
        const sortedData = filteredNftData.length > 0 ? [...filteredNftData] : [...nftData];
    
        sortedData.sort((a, b) => {
           
            const numA = extractNumberFromName(a.nft.name);
            const numB = extractNumberFromName(b.nft.name);
            return numA - numB;
        });
        setFilteredNftData(sortedData);
        setNftData(sortedData);
    }
  
      // Filter Nymber hight to low
      function handleSortHighToLow() {
        const sortedData = filteredNftData.length > 0 ? [...filteredNftData] : [...nftData];
    
        sortedData.sort((a, b) => {
            const numA = extractNumberFromName(a.nft.name);
            const numB = extractNumberFromName(b.nft.name);
            return numB - numA; 
        });
        setFilteredNftData(sortedData)
        setNftData(sortedData);
    }

        // Function to extract the number after '#' from the name
  function extractNumberFromName(name:string) {
    const match = name.match(/#(\d{1,4})\b/); 
    if (match && match[1]) {
        return parseInt(match[1]); 
    }
    return 0;
    }


    // Filter the NFT data based on the input value
     function handleSearch() {
      if (inputVal.trim() === '') {
          setFilterByInput(false);
          setFilteredNftData([]);
          setNftData(defaultNft)
          return;
      }
       setFilterByInput(true)
       const filteredData = nftData.filter((item:any) => {
          return (
              item.nft.rarity.rank.toString().includes(inputVal.toString()) || 
               item.nft.name.toString().includes(inputVal.toString()) 
           );
      });
  
      setFilteredNftData(filteredData);
    }
    

  return (
    <>
        {!activity && (
            <>
              <div className="search_container">
          <div className='search_bar'>
            <MdOutlineSearch className='search_icon' />
            <input
              className='search_box'
              type="text"
              placeholder='Search by number or rank'
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)} 
              onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                      handleSearch();  
                  }
              }}
            /> 
          </div>
          <span className='filter'
            onClick={() => setSortWin(!sortWin)}
          >
            <HiArrowsUpDown className='filter_icon' />
          </span>
        </div>
        
        <motion.div className="arrange_container"
          style={{zIndex: sortWin? 9999:0}}
          initial={{ opacity: 0}}
          animate={{ y: sortWin ? 0 : 300, opacity: sortWin ? 1 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          <div className="arrange_exit"
            onClick={() => setSortWin(false)}
          ><BsXLg/></div>
          <h3>Sort</h3>
          <h4
            onClick={() => {handleFilterDefault(); setSortWin(false)}}
          >
            Default</h4>
          <h4 
            onClick={() => {handleSortLowToHigh(); setSortWin(false)}}
          >
            Number low to high
          </h4>

          <h4
            onClick={() => {handleSortHighToLow(); setSortWin(false)}}
          >
            Number high to low
          </h4>

          <h4 
            onClick={() => {handleSortRankLowtoHigh(); setSortWin(false)}}
          >
            Rank low to high
          </h4>

          <h4
            onClick={() => {handleSortRankHighToLow(); setSortWin(false)}}
          >
            Rank high to low
          </h4>
        </motion.div>
            </>
          )}
    </>
  )
}

export default Search
