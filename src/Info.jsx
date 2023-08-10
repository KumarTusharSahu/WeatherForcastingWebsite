import React from 'react'

const Info = ({ property, value }) => {
  return (
    <div className='info'>
      <div className='property'><p>{property}</p></div>
      <div className='value'><p>{value}</p></div>
    </div>
  )
}

export default Info
