// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'


// Import components
import { FigList } from './fig-list'

// Import styles
import './../styles/figlog.css'

const link = '143.198.122.156'
const local = 'localhost:4001'

// Create figlog component
export const FigLog = () => {
  // Prepare states
  const [imageUrl, setImageUrl] = useState('')
  const [name, setName] = useState('')
  const [setNumber, setSetNumber] = useState('')
  //const [price, setPrice] = useState(0) //call webscraper here
  const [not, setNot] = useState('None')
  const [figs, setFigs] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch all figs on initial render
  useEffect(() => {
    fetchFigs()
  }, [])

  // Fetch all figs

  ////////////////////////////////////////////////////////////
  //rework into promise/request
  const fetchFigs = async () => {
    // Send GET request to 'figs/all' endpoint
    axios
      .get(`http://${link}/figs/all`)
      .then(response => {
        // Update the figs state
        setFigs(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error retrieving the FigLog: ${error}`))
  }

  // Reset all input fields
  const handleInputsReset = () => {
    setImageUrl('')
    setName('')
    setSetNumber('')
    setNot('None')
    //no need to reset price since price is not an input
  }

  // Create new book
  const handleFigCreate = () => {
    // Send POST request to 'figs/create' endpoint
    axios.post(`http://${link}/figs/create`, {
      imageUrl: imageUrl,
      name: name,
      setNumber: setNumber,
      not: not
    })
    .then(res => {
      console.log(res.data)

      // Fetch all figs to refresh
      // the figs on the fig log
      fetchFigs()
    })
    .catch(error => console.error(`There was an error creating the ${name} Minifig: ${error}`))
  }

  // Submit new fig
  const handleFigSubmit = () => {
    // Check if all fields are filled
    if (name.length > 0 && setNumber.length > 0) {
      // Create new minifig
      handleFigCreate()

      console.info(`Minifig ${name} from ${setNumber} added.`)

      // Reset all input fields
      handleInputsReset()
    }
  }

  // Remove book
  const handleFigRemove = (id: number, name: string) => {
    // Send PUT request to 'figs/delete' endpoint
    axios
      .put(`http://${link}/figs/delete`, { id: id })
      .then(() => {
        console.log(`Minifig ${name} removed.`)

        // Fetch all figs to refresh
        // the figs on the figlog
        fetchFigs()
      })
      .catch(error => console.error(`There was an error removing the ${name} Minifig: ${error}`))
  }

  // Reset fig list (remove all figs)
  const handleListReset = () => {
    // Send PUT request to 'figs/reset' endpoint
    axios.put(`http://${link}/figs/reset`)
    .then(() => {
      // Fetch all figs to refresh
      // the figs on the figLog
      fetchFigs()
    })
    .catch(error => console.error(`There was an error resetting the FigLog: ${error}`))
  }

  return (
    <div className="fig-list-wrapper">
      {/* Form for creating new fig */}
      <div className="fig-list-form">
        <div className="form-wrapper" onSubmit={handleFigSubmit}>
          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="name">Enter Name:</label>
              <input className="form-input" type="text" id="name" name="name" value={name} onChange={(e) => setName(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="setNumber">Enter Set Number:</label>
              <input className="form-input" type="text" id="setNumber" name="setNumber" value={setNumber} onChange={(e) => setSetNumber(e.currentTarget.value)} />
            </fieldset>
          </div>

          <div className="form-row">
            <fieldset>
              <label className="form-label" htmlFor="imageUrl">Enter Custom Image Url:</label>
              <input className="form-input" type="text" id="imageUrl" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="not">Enter terms to exclude from search separated by spaces:</label>
              <input className="form-input" type="text" id="not" name="not" value={not} onChange={(e) => setNot(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleFigSubmit} className="btn btn-add">Add the Minifig</button>
      </div>

      {/* Render FigList component */}
      <FigList figs={figs} loading={loading} handleFigRemove={handleFigRemove} />

      {/* Show reset button if list contains at least one Fig */}
      {figs.length > 0 && (
        <button className="btn btn-reset" onClick={handleListReset}>Reset minifigs list.</button>
      )}
    </div>
  )
}