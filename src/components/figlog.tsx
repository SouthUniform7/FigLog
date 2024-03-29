// Import deps
import React, { useEffect, useState } from 'react'
import axios from 'axios'


// Import components
import { FigList } from './fig-list'

// Import styles
import './../styles/figlog.css'

const link = '143.198.122.156'
//const link = 'localhost:4001' //LOCAL


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

  const [total, setTotal] = useState(0)

  // Fetch all figs and total price on initial render
  useEffect(() => {
    fetchFigs()
    fetchTotal()
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

  const fetchTotal = async () => {
    // Send GET request to 'figs/total' endpoint
    axios
      .get(`http://${link}/figs/total`)
      .then(response => {
        setTotal(response.data)
      })
      .catch(error => console.error(`There was an error retrieving the cumulative price: ${error}`))
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

      // Fetch all figs and total to refresh
      // the figs on the fig log
      fetchFigs()
      fetchTotal()
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

  // Remove fig
  const handleFigRemove = (id: number, name: string) => {
    // Send PUT request to 'figs/delete' endpoint
    axios
      .put(`http://${link}/figs/delete`, { id: id })
      .then(() => {
        console.log(`Minifig ${name} removed.`)

        // Fetch all figs to refresh
        // the figs on the figlog
        fetchFigs()
        fetchTotal()
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
      fetchTotal()
    })
    .catch(error => console.error(`There was an error resetting the FigLog: ${error}`))
  }

  const orderBySet = async () => {
    // Send GET request to 'figs/all' endpoint
    axios
      .get(`http://${link}/figs/set`)
      .then(response => {
        // Update the figs state
        setFigs(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error ordering the FigLog by set: ${error}`))
  }

  const orderByPrice = async () => {
    // Send GET request to 'figs/all' endpoint
    axios
      .get(`http://${link}/figs/price`)
      .then(response => {
        // Update the figs state
        setFigs(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error ordering the FigLog by price: ${error}`))
  }

  const orderByID = async () => {
    // Send GET request to 'figs/all' endpoint
    axios
      .get(`http://${link}/figs/all`)
      .then(response => {
        // Update the figs state
        setFigs(response.data)

        // Update loading state
        setLoading(false)
      })
      .catch(error => console.error(`There was an error ordering the FigLog chronologically: ${error}`))
  }

  console.log(total)



  return (
    <div className="fig-list-wrapper">
      <div className="title">
          <div className="title-head">Fig Log</div>
          <div className="title-desc">A Site for Collecting LEGO Minifigures</div>

        <div className="podcast">
          <div className="title-desc">I was quoted in The Vergecast! Listen Here!</div>
          <iframe frameBorder="0" height="200" scrolling="no" src="https://playlist.megaphone.fm/?e=VMP5580072595" width="100%"></iframe>
          <div className="title-desc-small">Listen around 17 minutes</div>
        </div>
      </div>
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
              <label className="form-label" htmlFor="imageUrl">(Optional) Enter Custom Image Url:</label>
              <input className="form-input" type="text" id="imageUrl" name="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.currentTarget.value)} />
            </fieldset>

            <fieldset>
              <label className="form-label" htmlFor="not">Enter terms to exclude from search separated by spaces:</label>
              <input className="form-input" type="text" id="not" name="not" value={not} onChange={(e) => setNot(e.currentTarget.value)} />
            </fieldset>
          </div>
        </div>

        <button onClick={handleFigSubmit} className="btn btn-add">Add the Minifig</button>
        
        <div className="button-row">
          <button onClick={orderBySet} className="btn btn-setNum">Order By Set</button>
          <button onClick={orderByPrice} className="btn btn-price">Order By Price</button>
          <button onClick={orderByID} className="btn btn-chron"><span>Order </span><span>Chronologically</span></button>
        </div>
      </div>

      {/* Render FigList Cumulative Sum */}
      <div className="total">
        Total Price: ${total}
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