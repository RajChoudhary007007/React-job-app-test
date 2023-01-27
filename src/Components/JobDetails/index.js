import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Profile from '../Profile'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'

import './index.css'

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
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    employmentType: '',
    minPackage: '',
  }

  componentDidMount() {
    this.getJobLists()
  }

  getJobLists = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJob = data.jobs
      const updateJobList = updatedJob.map(eachList => ({
        id: eachList.id,
        companyLogoUrl: eachList.company_logo_url,
        employmentType: eachList.employment_type,
        jobDescription: eachList.job_description,
        location: eachList.location,
        packagePerAnnum: eachList.package_per_annum,
        rating: eachList.rating,
        title: eachList.title,
      }))
      console.log(updateJobList)
      this.setState({
        jobsList: updateJobList,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    return (
      <ul>
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} eachJob={eachJob} />
        ))}
      </ul>
    )
  }

  getRenderJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Job-details-container">
        <div className="left-container">
          <Profile />
          <hr className="hr-line" />
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
          />
        </div>

        <div className="right-container">
          <div className="search-input-container">
            <input
              className="search-input"
              placeholder="Search"
              type="search"
            />
            <button type="button" className="btn-search">
              <BsSearch className="search-icon" />
            </button>
          </div>
          {this.getRenderJob()}
        </div>
      </div>
    )
  }
}
export default JobDetails
