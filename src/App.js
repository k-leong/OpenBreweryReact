import 'bulma/css/bulma.min.css'
import beerMe from './beer-62-preview.webp'
import beerOnFire from './brc.gif'

import { useState } from 'react'
import BreweryList from './Components/BreweryList';
import Button from './Components/Button';

const initialQuery = {
  state: "",
  city: "",
  postalCode: "",
}

function App() {
  const [query, setQuery] = useState(initialQuery) // query parameters
  const [error, setError] = useState(null) // for any errors that may occur
  const [isLoading, setIsLoading] = useState(false) // checks if the data is loading
  const [brewery, setBrewery] = useState([]) // data will be stored in breweries array

  // refractored code to handle single input but with multiple input boxes
  const inputChangeHandler = event => {
    const { name, value } = event.target
    setQuery({
      ...query,
      [name]: value
    })
  }

  // query by filter depending on input (country, state, city, postal code)
  const fetchBreweryHandler = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // const response = await fetch('https://api.openbrewerydb.org/breweries/meta?by_country=united_states')
      const response = await fetch(`https://api.openbrewerydb.org/breweries?by_country=United_States&by_state=${query.state}&by_city=${query.city}&by_postal=${query.postalCode}`)
      // https://api.openbrewerydb.org/breweries?by_country=United_States&by_state=&by_city=&by_postal= -> will grab 20 random breweries in US
      if (!response.ok) {
        throw new Error('something went wrong. possibly no more breweries around :(')
      }
      const data = await response.json()
      setBrewery(data)
    }
    catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }

  let content = <p>Search for breweries or none Found</p>
  if (brewery.length > 0) {
    content = <BreweryList brewery={brewery} />
  }
  if (isLoading) {
    content = <>
      <img src={beerMe} alt='logo' />
      <p>Pouring beer...</p>
    </>
  }
  if (error) {
    content = <>
      <img src={beerOnFire} alt='logo' />
      <p>{error}</p>
    </>
  }

  return (
    <>
      <section>
        <div className="columns">
          <div className="column is-one-third">
            <input className='input' type='text' value={query.state} name='state' placeholder='Search breweries by state...' onChange={inputChangeHandler} />
            <input className='input' type='text' value={query.city} name='city' placeholder='Search breweries by city...' onChange={inputChangeHandler} />
            <input className='input' type='text' value={query.postalCode} name='postalCode' placeholder='Search breweries by postal...' onChange={inputChangeHandler} />
          </div>
        </div>
        {/* <button onClick={fetchBreweryHandler}>click me</button> */}
        <Button onClick={fetchBreweryHandler} />
      </section>
      <section>
        <div className="column is-one-third">
          {content}
        </div>
      </section>
    </>
  );
}

export default App;
