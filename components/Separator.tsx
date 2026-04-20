import React from 'react'

const Separator = ({height}: Readonly<{height: string}>) => {
  return (
    <div className={`${height}`}></div>
  )
}

export default Separator