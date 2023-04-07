import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  in_progress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: '', vaccinationData: ''}

  componentDidMount = () => {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.in_progress,
    })

    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const options = {Method: 'GET'}
    const response = await fetch(covidVaccinationDataApiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = {
        last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
          eachDayData => ({
            vaccineDate: eachDayData.vaccine_date,
            dose1: eachDayData.dose_1,
            dose2: eachDayData.dose_2,
          }),
        ),
        vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
          age: range.age,
          count: range.count,
        })),
        vaccinationByGender: fetchedData.vaccination_by_gender.map(
          genderType => ({
            gender: genderType.gender,
            count: genderType.count,
          }),
        ),
      }
      this.setState({
        vaccinationData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderCharts = () => {
    const {vaccinationData} = this.state
    return (
      <>
        <div className="vaccination-coverage">
          <h1 className="div-heading">Vaccination Coverage</h1>
          <VaccinationCoverage data={vaccinationData.last7DaysVaccination} />
        </div>
        <div className="vaccination-by-gender">
          <h1 className="div-heading">Vaccination by gender</h1>
          <VaccinationByGender data={vaccinationData.vaccinationByGender} />
        </div>
        <div className="vaccination-by-age">
          <h1 className="div-heading">Vaccination by Age</h1>
          <VaccinationByAge data={vaccinationData.vaccinationByAge} />
        </div>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="
https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
        alt="failure-view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went Wrong</h1>
    </div>
  )

  renderApiBasedView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCharts()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.in_progress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="total-container">
        <div className="header-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              className="website-logo"
              alt="website logo"
            />
            <h1 className="website-name">CoWin</h1>
          </div>
          <h1 className="header-heading">CoWIN Vaccination in India</h1>
        </div>
        {this.renderApiBasedView()}
      </div>
    )
  }
}

export default CowinDashboard
