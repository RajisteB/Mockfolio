import React from 'react';
import '../../styles/components/lists.css';

const TopList = (props) => {
  let { actives, gainers, losers } = props;
  console.log(actives);
  return (

    <div className="lists-container">
      <div className="single-list-container">
        { gainers ? gainers.map(a => {
          return (
            <div className="card" id={a.symbol} key={a.symbol}>
              <div className="main-listing">
                {a.symbol}
              </div>
              <div className="sub-listing" style={{color: "limegreen"}}>
                +{parseFloat(a.changePercent).toFixed(2)}%
              </div>
            </div>
            )
          }) : <h3>Loading...</h3>
        }
      </div>
      <div className="single-list-container">
        { losers ? losers.map(a => {
          return (
            <div className="card" id={a.symbol} key={a.symbol}>
              <div className="main-listing">
                {a.symbol}
              </div>
              <div className="sub-listing" style={{color: "tomato"}}>
                {parseFloat(a.changePercent).toFixed(2)}%
              </div>
            </div>
            )
          }) : <h3>Loading...</h3>
        }
      </div>
      <div className="single-list-container">
        { actives ? actives.map(a => {
          return (
            <div className="card" id={a.symbol} key={a.symbol}>
              <div className="main-listing">
                {a.symbol}
              </div>
              <div className="sub-listing" style={{color: "limegreen"}}>
                {parseFloat(a.latestVolume / a.avgTotalVolume).toFixed(2)}
              </div>
            </div>
            )
          }) : <h3>Loading...</h3>
        }
      </div>
    </div>
  );
}

export default TopList;