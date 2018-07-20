import React, { Component } from 'react';
import '../../styles/components/searchbar.css';

class SearchBar extends Component {
  state = {

  }

  render() {
    return (
      <div className="search-container">
        <div className="portfolio-value">
          <h4>Portfolio Value</h4>
          <h1>$1,245,678.<span>21</span></h1>
          <p>+3.45 (+1.5%)</p>
        </div>
        <form action="" className="query-form">
          <input 
            className="query-input"
            type="text"
            placeholder="Search by Ticker..."
          >
          </input>
        </form>
      </div>
    )
  }
}

export default SearchBar;