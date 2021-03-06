const axios = require('axios');
const base_URL = 'https://api.iextrading.com/1.0/';

function getMarketData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/price"),
    axios.get(base_URL + "stock/" + req.params.id + "/quote?displayPercent=true"),
    axios.get(base_URL + "stock/" + req.params.id + "/logo"),
  ])
  .then(axios.spread((priceRes, quoteRes, logoRes) => {
    res.send({ 
      price: priceRes.data, 
      quote: quoteRes.data, 
      logo: logoRes.data, 
    })
  }))
  .catch(err => console.log(err));
}

function getChartData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1d"),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1m"),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/3m"),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/6m"),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/1y"),
    axios.get(base_URL + "stock/" + req.params.id + "/chart/5y"),
  ])
  .then(axios.spread((chart1dRes, chart1mRes, chart3mRes, chart6mRes, chart1yRes, chart5yRes) => {
    res.send({
      chart1d: chart1dRes.data,
      chart1m: chart1mRes.data,
      chart3m: chart3mRes.data,
      chart6m: chart6mRes.data,
      chart1y: chart1yRes.data,
      chart5y: chart5yRes.data,
    })
  }))
  .catch(err => console.log(err));
}

function getCompanyData(req, res) {
  axios.all([
    axios.get(base_URL + "stock/" + req.params.id + "/financials"),
    axios.get(base_URL + "stock/" + req.params.id + "/company"),
  ])
  .then(axios.spread((financialsRes, companyRes ) => {
    res.send({
      financials: financialsRes.data,
      company: companyRes.data,
    })
  }))
}

function getTops(req, res) {
  axios.all([
    axios.get(base_URL + "stock/market/list/mostactive?displayPercent=true"),
    axios.get(base_URL + "stock/market/list/gainers?displayPercent=true"),
    axios.get(base_URL + "stock/market/list/losers?displayPercent=true"),
  ])
  .then(axios.spread((activeRes, gainerRes, loserRes) => {
    res.send({
      topActives: activeRes.data,
      topGainers: gainerRes.data,
      topLosers: loserRes.data,
    })
  }))
}

module.exports = {
  getMarketData,
  getChartData,
  getCompanyData,
  getTops,
}