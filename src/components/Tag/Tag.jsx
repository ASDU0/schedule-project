import React from 'react'
import { useState } from 'react'

import './Tag.css'

const Tag = ({ value, active, onClick }) => {
    if (typeof active === 'undefined') {
        return <div className='semester'>
            <span className=''>{value}</span>
        </div>
    }

    const handleClick = () => {
        // setIsActive(!isActive)
        onClick(!active)
    }

    return (
        <div
            onClick={handleClick}
            className={`semester ${active ? 'active' : 'disable'} cursor-pointer-app`}
        >
            <span className=''>{value}</span>
        </div>
    )
}

export default Tag