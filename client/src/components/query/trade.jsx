import React, { Component } from 'react';
import '../../styles/components/trades.css';

class Trade extends Component {

  render() {
    return (
      <div className="trade-container">
        <div className="logo-container"></div>
        <div className="symbol">AAPL</div>
        <div className="company-name">Apple Inc.</div>
        <div className="price-container">
          <div>
            <div id="price">$134.93</div>
            <div id="change">+2.45 <span>(+1.8%)</span></div>
          </div>
        </div>
        <div className="trade-action-container">
          <a href="#" id="buy">BUY</a>
          <a href="#" id="sell">SELL</a>
        </div>
      </div>
    );
  }
}

export default Trade;