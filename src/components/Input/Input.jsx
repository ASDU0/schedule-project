import { forwardRef, useRef } from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg'

import './styles.css'

const Input = (({ title, children, value, onClickIcon, ...props }) => {
  const inputRef = useRef(null)
  // console.log(inputRef.current === document.activeElement)

  const handleClick = () => {
    onClickIcon()
    inputRef.current.focus()
  }
  return (
    <div className='card'>
      <label className='card__title' >{title}</label>
      <div className='card__input'>
        <div className='card__icon-left'>
          {children || <SearchIcon />}
        </div>
        <input
          {...props}
          value={value}
          ref={inputRef}
        />
        {
          inputRef.current === document.activeElement &&
          <DeleteIcon className='card__icon-right' onClick={handleClick} />
        }
      </div>
    </div>
  )
})

export default Input