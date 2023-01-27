import './index.css'

const FilterGroup = props => {
  const {salaryRangesList, employmentTypesList} = props

  const getEmployment = () =>
    employmentTypesList.map(eachEmp => (
      <li className="Filter-List">
        <input
          className="filter-input"
          id={eachEmp.employmentTypeId}
          value={eachEmp.employmentTypeId}
          name={eachEmp.employmentTypeId}
          type="checkbox"
        />
        <label className="label-emp" htmlFor={eachEmp.employmentTypeId}>
          {eachEmp.label}
        </label>
      </li>
    ))

  const getSalaryRange = () =>
    salaryRangesList.map(eachSal => (
      <li className="Filter-List">
        <input
          className="filter-input"
          id={eachSal.employmentTypeId}
          value={eachSal.employmentTypeId}
          name={eachSal.employmentTypeId}
          type="radio"
        />
        <label className="label-emp" htmlFor={eachSal.employmentTypeId}>
          {eachSal.label}
        </label>
      </li>
    ))

  return (
    <div className="filter-container">
      <h1 className="filter-heading">Type Of Employment</h1>
      <ul className="filter-list-item">{getEmployment()}</ul>
      <hr className="hr-line" />
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list-item">{getSalaryRange()}</ul>
    </div>
  )
}
export default FilterGroup
