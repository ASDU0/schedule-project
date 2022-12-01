import { useEffect, useRef, useState } from 'react'
import { ReactComponent as DeleteIcon } from '../../assets/delete_icon.svg'
import { ReactComponent as SearchIcon } from '../../assets/search_icon.svg'

import './Input.css'



const Input = (({ title, img, value, onClickIcon, filterValue, filters, resetValues = () => null, data, renderItem, children, ...props }) => {
  const inputRef = useRef(null)
  const listRef = useRef(null)

  const [focused, setFocused] = useState(false)
  const onFocus = () => { setFocused(true) }
  const onBlur = () => { setFocused(false); resetValues() }
  filters.map(({ filter, filterValue }) => {
    data = filter(data, filterValue)
  })

  const handleClick = () => {
    onClickIcon()
    inputRef.current.focus()
  }

  const hideList = () => {
    if (focused) {
      onBlur()
    }
  }
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

      <div className='card__list' style={{ visibility: focused ? 'visible' : 'hidden' }}>
        {focused && children}
        <div className='list-overflow'>
          {focused &&
            data.map((item) => {
              return renderItem(item, hideList)
            })
          }
        </div>
      </div>
    </div>
  )
})

export default Input