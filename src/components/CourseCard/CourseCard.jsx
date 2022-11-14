import React from 'react'
import { ReactComponent as InfoFillIcon } from '../../assets/info_icon_fill.svg'
import { ReactComponent as TrashIcon } from '../../assets/trash_icon.svg'

import { useRef, useState } from 'react'
import './styles.css'
import Portal from '../Portal'

const CourseCard = ({ name, flag }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 })
  const infoRef = useRef(null)

  const onMouseOver = () => {
    const { top, left } = infoRef.current.getBoundingClientRect()
    setShowDetails(true)
    setCoordinates({ top, left })
  }

  return (
    <section className='course-card'>
      <div className='course-card__header'>
        <p className='course-card__text bold'>{name}</p>
        {
          flag
            ?
            <InfoFillIcon
              ref={infoRef}
              className='info'
              onMouseOver={onMouseOver}
              onMouseOut={() => setShowDetails(false)}
              width={24}
            />
            :
            <TrashIcon width={24} height={24} />
        }
      </div>
      <p className='course-card__text' >IN775</p>
      <div className='course-card__labels'>
        <div className='semester'>
          <span className='course-card__text bold'>XIII</span>
        </div>
        <div className='category'>
          <span className='course-card__text bold'>OESS</span>
        </div>
      </div>
      <Portal>
        {
          showDetails &&
          <DetailsSchedule name={name} top={coordinates.top} left={coordinates.left} />
        }
      </Portal>
    </section>
  )
}

export default CourseCard

const DetailsSchedule = ({ top, left }) => {
  return (
    <div
      style={{
        top: top,
        left: left * 1.13,
      }}
      className='details-schedule'
    >
      <p className='bold'>Horario</p>
      <p>
        <span className='bold'>DIA: </span>
        <span>07:00 - 09:00</span>
      </p><p>
        <span className='bold'>DIA: </span>
        <span>07:00 - 09:00</span>
      </p><p>
        <span className='bold'>DIA: </span>
        <span>07:00 - 09:00</span>
      </p>
    </div>
  )
}