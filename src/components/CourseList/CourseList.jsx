import React from 'react'
import CourseCard from '../CourseCard'

import './styles.css'

const CourseList = ({ data, filterValue = '', onClick, height = 530, shadow = true }) => {
  return (
    <section style={{ height }} className={shadow ? 'shadow' : ''} >
      <div className='menu'>
        {
          data
            .filter((school) => {
              filterValue = filterValue.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
              let name = school.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
              return name.includes(filterValue)
            })
            .map((course, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => onClick(course)}
                >
                  <CourseCard name={course.name} />
                </div>
              )
            })
        }
      </div>
    </section>
  )
}

export default CourseList