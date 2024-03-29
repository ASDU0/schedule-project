import { useState } from 'react';
import CourseCard from '../CourseCard';

import './CourseList.css';

const CourseList = ({ data, filterValue = '', onClickIcon, shadow = true }) => {

  return (
    <section className='card__course-list'>
      <div className={'menu ' + (shadow ? 'shadow' : '')}>
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
                  key={course._id}
                >
                  <CourseCard
                    id={course._id}
                    name={course.name}
                    code={course.course}
                    semester={course.semester}
                    category={course.cat}
                    flag={shadow}
                    onClickIcon={()=>onClickIcon(course._id)} />
                </div>
              )
            })
        }
      </div>
    </section>
  )
}

export default CourseList