import { Link } from 'react-router-dom'
import './NoPage.scss'

const NoPage = () => {
  
  return (
    <div className="no__page">
      <h1>404</h1>
      <p>No Page Found</p>
      <Link to='/'>Back to Home</Link>
    </div>
  )
}

export default NoPage