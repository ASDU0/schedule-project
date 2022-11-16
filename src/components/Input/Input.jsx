import { useEffect, useRef, useState } from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg'

import './Input.css'

const compareString = (value, filter) => {
  filter = filter.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  value = value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()
  return value.includes(filter)
}

const Input = (({ title, img, value, onClickIcon, filterValue, functionFilter, data, renderItem, children, ...props }) => {
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

  const hideList = () => {
    if (focused) {
      onBlur()
    }
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

      <div className='card__list'>
        {focused && children}
        <div className='list-overflow'>
          {focused &&
            data.filter((item) => compareString(item.name, filterValue))
              .map((item) => {
                return renderItem(item, hideList)
              })
          }
        </div>
      </div>
    </div>
  )
})

export default Input