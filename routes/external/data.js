const express = require('express');
const router = express.Router();
const marketHelper = require('../../services/market/market-helper');

router.get('/marketdata/:id', marketHelper.getMarketData);
router.get('/chart/:id', marketHelper.getChartData);
router.get('/company/:id', marketHelper.getCompanyData);
router.get('/tops', marketHelper.getTops);

module.exports = router;