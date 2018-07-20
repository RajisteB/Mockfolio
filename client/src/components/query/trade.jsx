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
    let chg = quote.changePercent > 0 ? '+' : quote.changePercent < 0 ? '-' : '';

    return (
      <div className="trade-container">
        <div className="logo-container">
          <img src={logo} alt="" />
        </div>
        <div className="symbol">{quote.symbol}</div>
        <div className="company-name">{quote.companyName}</div>
        <div className="price-container">
          <div>
            <div id="price">${price}</div>
            <div id="change">{chg}{quote.change} <span>({chg}{quote.changePercent}%)</span></div>
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