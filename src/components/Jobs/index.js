import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import './index.css'
import Header from '../Header'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiJobsStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    profileData: [],
    apiStatus: apiStatusConstants.initial,
    checkBoxInput: [],
    jobsData: [],
    radioInput: '',
    searchInput: '',
    apiJobStatus: apiJobsStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const profileApi = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(profileApi, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const convertedData = {
        profileDetails: fetchedData.profile_details,
      }
      const {profileDetails} = convertedData
      const formattedData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }

      this.setState({
        profileData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    return (
      <div className="profile-container">
        <img src={profileImageUrl} alt="" className="profile-image" />
        <p className="profile-name">{name}</p>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccess()
      case apiStatusConstants.failure:
        return this.renderProfileFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  onSelectCheckBox = event => {
    this.setState(
      prevState => ({
        checkBoxInput: [...prevState.checkBoxInput, event.target.id],
      }),
      this.getJobsData,
    )
  }

  onSelectRadio = event => {
    this.setState({radioInput: event.target.id}, this.getJobsData)
  }

  renderCheckboxes = () => (
    <ul className="check-box-container">
      {employmentTypesList.map(eachType => (
        <li className="list-item" key={eachType.employmentTypeId}>
          <input
            type="checkbox"
            id={eachType.employmentTypeId}
            onChange={this.onSelectCheckBox}
            className="checkbox-input"
          />
          <label htmlFor={eachType.employmentTypeId} className="checkbox-label">
            {eachType.label}
          </label>
        </li>
      ))}
    </ul>
  )

  renderRadioButtons = () => (
    <ul className="check-box-container">
      {salaryRangesList.map(eachRange => (
        <li className="list-item">
          <input
            type="radio"
            className="checkbox-input"
            id={eachRange.salaryRangeId}
            onChange={this.onSelectRadio}
            name="option"
          />
          <label htmlFor={eachRange.salaryRangeId} className="checkbox-label">
            {eachRange.label}
          </label>
        </li>
      ))}
    </ul>
  )

  getJobsData = async () => {
    this.setState({apiJobsStatus: apiJobsStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {checkBoxInput, radioInput, searchInput} = this.state
    const jobsApiUrl = `https://apis.ccbp.in/jobs?employment_type=${checkBoxInput}&minimum_package=${radioInput}&search=${searchInput}`
    const optionsJobs = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobs = await fetch(jobsApiUrl, optionsJobs)
    if (responseJobs.ok === true) {
      const fetchedDataJobs = await responseJobs.json()
      const updatedDataJobs = fetchedDataJobs.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobsData: updatedDataJobs,
        apiJobStatus: apiJobsStatusConstants.success,
      })
    } else {
      this.setState({apiJobStatus: apiJobsStatusConstants.failure})
    }
  }

  renderJobSuccessView = () => {
    const {jobsData} = this.state

    const jobsStatus = jobsData.length === 0

    return jobsStatus ? (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="nojobs-image"
        />
        <h1>No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters.</p>
      </div>
    ) : (
      <ul className="jobs-list-container">
        {jobsData.map(eachData => (
          <JobItem key={eachData.id} jobDetails={eachData} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiJobsStatusConstants.inProgress:
        return this.renderLoader()
      case apiJobsStatusConstants.success:
        return this.renderJobSuccessView()
      case apiJobsStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-input-container">
            <input
              type="input"
              className="jobs-input"
              placeholder="Search"
              onChange={this.onChangeSearchInput}
              onKeyDown={this.onEnterSearchInput}
            />
            <AiOutlineSearch className="icon" />
          </div>
          <div className="jobs-profile-container">
            <div className="render-profile-filters-container">
              {this.renderProfileDetails()}
              <hr className="line" />
              <p className="employment-heading">Type of Employment</p>
              {this.renderCheckboxes()}
              <hr className="line" />
              {this.renderRadioButtons()}
            </div>
            <div>
              <div className="jobs-input-container-browser">
                <input
                  type="input"
                  className="jobs-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <AiOutlineSearch className="icon" />
              </div>
              <div className="jobs-container">{this.renderJobs()}</div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
