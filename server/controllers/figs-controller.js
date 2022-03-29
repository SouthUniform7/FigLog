// Import database
const knex = require('./../db')
const axios = require('axios');
const cheerio = require('cheerio');

// Retrieve all figs
exports.figsAll = async (req, res) => {
  // Get all figs from database
  knex
    .select('*') // select all records
    .from('figs') // from 'figs' table
    .then(userData => {
      // Send figs extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving figs: ${err}` })
    })
}

// Create new fig
exports.figsCreate = async (req, res) => {
  // Add new fig to database

  var max = 0
  let minifig = 0

  function get_minifig_html () {
    return axios.get(req.body.listUrl).then(response => response.data).catch(err => console.log(err))
  }

  get_minifig_html()
  .then(data => {

    const html = data

    const $ = cheerio.load(html)

    $('.s-item__info', html).each(function() {
            

        const title1 = $(this).find('.s-item__title').text()

        const title = title1.toUpperCase()

        const namecaps = req.body.name.toUpperCase()

        if ((title.includes(req.body.setNumber) && title.includes(namecaps) && title.includes('FIG')) && !title.includes('LOT')) { 

            const amount = $(this).find('.s-item__price').text()
            if (amount !== ''){
                
                const dollars = parseFloat(amount.replace(/[^\d.-]/g, ''))

                if (dollars > max){
                    max = dollars
                }
            }
        }
    })

    knex('figs')
      .insert({ // insert new record, a fig
        'imageUrl': req.body.imageUrl,
        'name': req.body.name,
        'setNumber': req.body.setNumber,
        'price': max,
        'listUrl': req.body.listUrl
      })
      .then(() => {
        // Send a success message in response
        res.json({ message: `Minifig \'${req.body.name}\' from ${req.body.setNumber} created.` })
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error creating ${req.body.name} Minifig: ${err}` })
      })
   }).catch(err => console.log(err))
}








// Remove specific fig
exports.figsDelete = async (req, res) => {
  // Find specific fig in the database and remove it
  knex('figs')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `Minifig ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} minifig: ${err}` })
    })
}

// Remove all figs on the list
exports.figsReset = async (req, res) => {
  // Remove all figs from database
  knex
    .select('*') // select all records
    .from('figs') // from 'figs' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'Minifig list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting Minifig list: ${err}.` })
    })
}