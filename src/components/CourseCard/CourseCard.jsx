import React from 'react'
import { ReactComponent as TrashIcon } from '../../assets/trash_icon.svg'
import './styles.css'

const CourseCard = ({ name }) => {
  return (
    <section className='course-card'>
      <p className='course-card__text bold'>{name}</p>
      <p className='course-card__text' >IN775</p>
      <div className='course-card__labels'>
        <div className='semester'>
          <span className='course-card__text bold'>I</span>
        </div>
        <div className='category'>
          <span className='course-card__text bold'>OESS</span>
        </div>
      </div>
      <TrashIcon className='course-card__icon' onClick={() => alert('Borrado')} />
    </section>
  )
}

export default CourseCard