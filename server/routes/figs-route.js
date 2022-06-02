// Import express
const express = require('express')

// Import figs-controller
const figsRoutes = require('./../controllers/figs-controller.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all fig
// In server.js, figs route is specified as '/figs'
// this means that '/all' translates to '/figs/all'
router.get('/all', figsRoutes.figsAll)

router.get('/total', figsRoutes.figsTotal)

router.get('/set', figsRoutes.orderBySet)
router.get('/price', figsRoutes.orderByPrice)

// Add route for POST request to create new fig
// In server.js, figs route is specified as '/figs'
// this means that '/create' translates to '/figs/create'
router.post('/create', figsRoutes.figsCreate)

// Add route for PUT request to delete specific fig
// In server.js, figs route is specified as '/figs'
// this means that '/delete' translates to '/figs/delete'
router.put('/delete', figsRoutes.figsDelete)

// Add route for PUT request to reset fig list
// In server.js, figs route is specified as '/figs'
// this means that '/reset' translates to '/figs/reset'
router.put('/reset', figsRoutes.figsReset)

// Export router
module.exports = router