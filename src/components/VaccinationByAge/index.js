// Write your code here
// Write your code here
import {Component} from 'react'
import './index.css'
import {PieChart, Pie} from 'recharts'

class VaccinationByAge extends Component {
  state = {vaccinationList: []}

  componentDidMount() {
    this.getDidMount()
  }

  getDidMount = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    const updatedData = data.vaccination_by_age.map(each => ({
      age: each.age,
      count: each.count,
    }))
    this.setState({vaccinationList: updatedData})
  }

  render() {
    const {vaccinationList} = this.state
    return (
      <div>
        <h1 className="coverage">Vaccination By age</h1>
        <PieChart width={730} height={250}>
          <Pie
            data={vaccinationList}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={50}
            fill="#8884d8"
          />
          <Pie
            data={vaccinationList}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#82ca9d"
            label
          />
        </PieChart>
      </div>
    )
  }
}

export default VaccinationByAge
