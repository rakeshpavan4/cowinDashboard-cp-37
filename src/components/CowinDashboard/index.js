// Write your code here
import './index.css'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'

import VaccinationByGender from '../VaccinationByGender'

const CowinDashboard = () => (
  <div className="bg-container">
    <div className="header">
      <img
        src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png "
        alt="website logo"
        className="logo"
      />
      <h1 className="title">Co-WIN</h1>
    </div>
    <h1 className="sub-title">CoWIN Vaccination In India</h1>
    <VaccinationCoverage />
    <VaccinationByAge />
    <VaccinationByGender />
  </div>
)

export default CowinDashboard
