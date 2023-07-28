import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css';

const Rating = ({ value, text, color }) => {
  return (
    <div className='rating'>
      <span>
        <i
          style={{ color }}
          className={
            value >= 1
              ? 'bi bi-star-fill'
              : value >= 0.5
                ? 'bi bi-star-half'
                : 'bi bi-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 2
              ? 'fbi bi-star-fill'
              : value >= 1.5
                ? 'bi bi-star-half'
                : 'bi bi-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 3
              ? 'bi bi-star-fill'
              : value >= 2.5
                ? 'bi bi-star-half'
                : 'bi bi-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 4
              ? 'bi bi-star-fill'
              : value >= 3.5
                ? 'bi bi-star-half'
                : 'bi bi-star'
          }
        ></i>
      </span>
      <span>
        <i
          style={{ color }}
          className={
            value >= 5
              ? 'fbi bi-star-fill'
              : value >= 4.5
                ? 'bi bi-star-half'
                : 'bi bi-star'
          }
        ></i>
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
