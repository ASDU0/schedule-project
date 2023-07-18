import React from 'react'
import './CardSchool.css'

const CardSchool = ({ id, name, logo, onClick, hideList }) => {
    const handleClick = () => {
        onClick({ id, name, img: logo })
        hideList()
    }
    return (
        <div
            className='card__school'
            onClick={handleClick}
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
}

export default CardSchool