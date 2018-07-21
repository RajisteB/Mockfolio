import React, { Component } from 'react';
import '../../styles/components/trades.css';

class Trade extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {
    let { price, quote, logo } = this.props;
    let stockPrice = parseFloat(price).toLocaleString();
    let chgPct = parseFloat(quote.changePercent).toFixed(2);

    let chg = chgPct > 0 ? '+' : '';

    return (
      <div className="trade-container">
        <div className="ticker">
          <div className="symbol">
            {/* <div className="logo-container">
              <img src={logo} alt="" />
            </div> */}
            {quote.symbol}
          </div>
          <div className="company-name">{quote.companyName}</div>
        </div>
        <div className="trading">
          <div className="price-container">
            <div>
              <div id="price">${stockPrice}</div>
              <div id="change">{chg}{quote.change} <span>({chg}{chgPct}%)</span></div>
            </div>
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