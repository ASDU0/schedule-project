import { forwardRef } from 'react'
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg'
import './styles.css'

const Input = forwardRef(({ title, ...props }, ref) => {
    return (
        <div className='card'>
            <label className='card__title' >{title}</label>
            <div className='card__input'>
                <SearchIcon className='card__icon' />
                <input
                    {...props}
                    ref={ref}
                />
            </div>
        </div>
    )
})

export default Input