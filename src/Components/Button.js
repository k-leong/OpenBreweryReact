import 'bulma/css/bulma.css';

const Button = props => {
  return (
    <button className='button' type={props.type || 'button'} onClick={props.onClick}> Click me
    </button>
  )
}

export default Button