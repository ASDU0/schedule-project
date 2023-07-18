import React from 'react'
import './styles.css'

const Schools = ({ data, filter, onClick }) => {
  return (
    <section className='card__schools'>
      {
        data
          .filter((school) => {
            filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            let name = school.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
            return name.includes(filter)
          })
          .map(({ name, logo }, index) => {
            return (
              <div
                className='card__school'
                key={index}
                onClick={() => onClick({ id: index, name: name, img: logo })}
              >
                <div className='card__img'>
                  <img src={`${logo}`}
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "http://at.unsaac.edu.pe/images/logo-placeholder.png"
                    }}
                  />
                </div>
                <span>{name}</span>
              </div>
            )
          })
      }
    </section>
  )
}

export default Schools