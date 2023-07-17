import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`jobs/${id}`} className="link-item">
      <li className="fetched-job-container">
        <div>
          <div className="job-title-image-container">
            <img src={companyLogoUrl} alt="" className="company-name-logo" />
            <div>
              <p className="text job-title">{title}</p>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="text rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-container">
            <div className="employment-type">
              <div className="location-icon-container">
                <MdLocationOn className="location-icon" />
                <p className="text location">{location}</p>
              </div>
              <div className="type">
                <FaSuitcase className="location-icon" />
                <p className="text emp-type">{employmentType}</p>
              </div>
            </div>
            <p className="text ">{packagePerAnnum}</p>
          </div>
          <hr />
          <p className="text desc-heading">Description</p>
          <p className="text  job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
