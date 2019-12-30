const express = require('express');

const statisticsController = require('../controllers/statistics_controller');

const router = new express.Router();

// health_check
router.get('/health_check', (req, res) => {
    res.send({"message": "Welcome to dashboard"});
});

// TODO refactor the routes into separate modules
router.get('/statistics', (req, res) => {
   statisticsController.getAllStatistics(req, res)
});


module.exports = router;
