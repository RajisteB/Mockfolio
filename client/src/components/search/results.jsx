import React, { Component } from 'react';
import { Theme } from '../../themes.jsx';

const Results = (props) => {
  let { symbolQuote, input, dataLoaded, error } = props;

  if (input && dataLoaded ) {
    return (
      <div>
        <h1>{symbolQuote.symbol}</h1>
        <h4>{symbolQuote.companyName}</h4>
        <h6>{symbolQuote.sector}</h6>
        <h3>${symbolQuote.close.toFixed(2)}</h3>  
        <p>{symbolQuote.change.toFixed(2)}</p>
        <p>{symbolQuote.changePercent.toFixed(2)}%</p>
        <h5>52 wk high: ${symbolQuote.week52High.toFixed(2)}</h5>
        <h5>52 wk low: ${symbolQuote.week52Low.toFixed(2)}</h5> 
        <h5>
          Vol: {symbolQuote.latestVolume.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h5>
      </div>
    )
  } else if ( error ) {
    return (
      <div style={{ 'color': '#e74c3c' }}>
        Symbol not found...please try again.
      </div>
    )
  } else {
    return null;
  };
}

export default Results;