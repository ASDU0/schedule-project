import React from 'react'
import { ReactComponent as InfoFillIcon } from '../../assets/info_icon_fill.svg'
import { ReactComponent as TrashFillIcon } from '../../assets/trash_icon_fill.svg'

import { useRef, useState } from 'react'
import './styles.css'
import Portal from '../Portal'
const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  // '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
]

const randomColorCategory = (string) => {
  let sum = 0
  for (let i = 0; i < string.length; i++) {
    sum += string.charCodeAt(i)
  }
  return colors[sum % colors.length]
}

const CourseCard = ({ id, name, code, semester, category, days, flag, hideList = () => null, onClick, onClickIcon }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 })
  const infoRef = useRef(null)

  const onMouseOver = () => {
    const { top, left } = infoRef.current.getBoundingClientRect()
    setShowDetails(true)
    setCoordinates({ top, left })
  }
  const handleClick = () => {
    if (flag) {
      onClick()
      hideList()
    }
  }
  return (
    <section className='course-card'
      onClick={handleClick}
    >
      <div className='course-card__header'>
        <p className='course-card__text bold'>{name}</p>
        <div className='course-card__icons'>
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
              <TrashFillIcon
                onClick={() => onClickIcon(id)}
                width={24}
                className='trash'
              // height={24}
              />
          }
        </div>
      </div>
      <p className='course-card__text' >{code}</p>
      <div className='course-card__labels'>
        <div className='semester'>
          <span className='course-card__text bold'>{semester}</span>
        </div>
        <div className='category' style={{ backgroundColor: randomColorCategory(category) }}>
          <span className='course-card__text bold'>{category}</span>
        </div>
      </div>
      <Portal>
        {
          showDetails &&
          <DetailsSchedule days={days} name={name} top={coordinates.top} left={coordinates.left} />
        }
      </Portal>
    </section>
  )
}

export default CourseCard

const DetailsSchedule = ({ days, top, left }) => {
  return (
    <div
      style={{
        top: top,
        left: left * 1.12,
      }}
      className='details-schedule'
    >
      <p className='bold'>Horario</p>
      {Object.keys(days).filter((day, index) => days[day].length > 0)
        .map((day, index) => {
          return (
            <div key={index} className='details-schedule__day'>
              <span className='bold'>{convertNameDays(day).slice(0, 2)}: </span>
              {
                days[day].map((hour, index) => {
                  return (
                    <span key={index}>{hour}</span>
                  )
                })
              }
            </div>
          )
        }
        )
      }
      {/* <p>
        <span className='bold'>DIA: </span>
        <span>07:00 - 09:00</span>
      </p> */}
    </div>
  )
}

const convertNameDays = (name) => {
  switch (name) {
    case 'monday':
      return 'Lunes'
    case 'tuesday':
      return 'Martes'
    case 'wednesday':
      return 'Miercoles'
    case 'thursday':
      return 'Jueves'
    case 'friday':
      return 'Viernes'
    case 'saturday':
      return 'Sabado'
    case 'sunday':
      return 'Domingo'
    default:
      return name
  }
}
