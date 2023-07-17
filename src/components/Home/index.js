import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="home-container">
      <Header />
      <div className="responsive-container">
        <h1 className="jobs-heading">Find The Job That Fits Your Life</h1>
        <p className="jobs-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential
        </p>
        <Link to="/jobs">
          <button
            type="button"
            className="find-jobs-button"
            onClick={onFindJobs}
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
