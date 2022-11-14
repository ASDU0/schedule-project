import { useEffect, useRef, useState } from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg'

import './Input.css'

const Input = (({ title, children, img, value, onClickIcon, ...props }) => {
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const [focused, setFocused] = useState(false)
  const onFocus = () => { setFocused(true) }
  const onBlur = () => { setFocused(false) }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (listRef.current && !listRef.current.contains(e.target)) {
        onBlur()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const handleClick = () => {
    onClickIcon()
    inputRef.current.focus()
  }
  return (
    <div
      className='card-search'
      ref={listRef}
    >
      <div>
        <label className='card__title' >{title}</label>
        <div className='card__input'>
          <div className='card__icon-left'>
            {img || <SearchIcon />}
          </div>
          <input
            {...props}
            value={value}
            ref={inputRef}
            onFocus={onFocus}
          />
          {
            value ? <DeleteIcon className='card__icon-right' onClick={handleClick} /> : null
          }
        </div>
      </div>

      <div className='card__list' onClick={onBlur}>
        {focused && children}
      </div>
    </div>
  )
})

export default Input