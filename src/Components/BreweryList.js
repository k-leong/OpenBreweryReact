import Brewery from "./Brewery";

const BreweryList = props => {
  return (
    <ul>
      {props.brewery.map(brewery => (
        <Brewery key={brewery.id} name={brewery.name} country={brewery.country} state={brewery.state} city={brewery.city} street={brewery.street} website_url={brewery.website_url} />
      ))}
    </ul>
  )
}

export default BreweryList