// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "figs"
knex.schema
  // Make sure no "figs" table exists
  // before trying to create new
  .hasTable('figs')
    .then((exists) => {
      if (!exists) {
        // If no "figs" table exists
        // create new, with "id", "author", "title",
        // "pubDate" and "rating" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (fig)
        return knex.schema.createTable('figs', (table)  => {
          table.increments('id').primary()
          table.string('imageUrl')
          table.string('name')
          table.string('setNumber')
          table.real('price')
          table.string('listUrl')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Figs\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "figs" table
knex.select('*').from('figs')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = knex