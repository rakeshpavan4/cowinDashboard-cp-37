// Write your code here
import {Component} from 'react'
import './index.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from 'recharts'

const DataFormatter = number => {
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}

class VaccinationCoverage extends Component {
  state = {vaccinationList: []}

  componentDidMount() {
    this.getDidMount()
  }

  getDidMount = async () => {
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()
    const updatedData = data.last_7_days_vaccination.map(each => ({
      vaccineDate: each.vaccine_date,
      dose1: each.dose_1,
      dose2: each.dose_2,
    }))
    this.setState({vaccinationList: updatedData})
  }

  render() {
    const {vaccinationList} = this.state
    return (
      <div>
        <h1 className="coverage">vaccination coverage</h1>
        <BarChart width={730} height={250} data={vaccinationList}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="vaccineDate"
            tick={{stroke: 'gray', strokeWidth: 0}}
          />
          <YAxis
            tickFormatter={DataFormatter}
            tick={{
              stroke: 'gray',
              strokeWidth: 0,
            }}
          />
          <Tooltip />
          <Legend />
          <Bar dataKey="Dose1" fill="#5a8dee" />
          <Bar dataKey="Dose2" fill=" #f54394" />
        </BarChart>
      </div>
    )
  }
}

export default VaccinationCoverage
