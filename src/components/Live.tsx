import { useContext } from "react";
import UseContext from '../UserContext'

export default function Live() {

    const {
        filterByInput, 
        filteredNftData, 
        nftData, 
        activity,
      } = useContext<any>(UseContext);

  return (
    <>
        {!activity && (
          <div className="live_container">
          <div className="live_icon"></div>
          <div className="live_icon2"></div>
          <h3>Live</h3>
          <h4>{(filterByInput? filteredNftData:nftData).length} results</h4>
        </div>
        )}
    </>
  )
}
