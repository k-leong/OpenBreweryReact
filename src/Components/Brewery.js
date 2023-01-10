import 'bulma/css/bulma.min.css'

const Brewery = props => {
  // const newTabHandler = url => {
  //   window.open(url, '_blank', 'noopener,noreferrer')
  // }
  return (
    <section className='box'>
      <h2>{props.name}</h2>
      <h2>{props.street}</h2>
      <h2>{props.state}</h2>
      <h2>{props.city}</h2>
      {/* below shows two ways to open link in new tab */}
      {(props.website_url !== null) && <a href={props.website_url} target="_blank" rel="noreferrer noopener">{props.website_url}</a>}
      {/* <button onClick={() => newTabHandler(props.website_url)}>{props.website_url}</button> */}
    </section>
  )
}

export default Brewery