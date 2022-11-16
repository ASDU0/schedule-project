import React from 'react'
import { useState } from 'react'

import './Tag.css'

const Tag = ({ value, active, onClick }) => {
    const [isActive, setIsActive] = useState(active)
    if (typeof active === 'undefined') {
        return <div className='semester'>
            <span className=''>{value}</span>
        </div>
    }

    const handleClick = () => {
        setIsActive(!isActive)
        onClick(value)
    }

    return (
        <div
            onClick={handleClick}
            className={`semester ${isActive ? 'active' : 'disable'} `}
        >
            <span className=''>{value}</span>
        </div>
    )
}

export default Tag