import { MagnifyingGlass } from 'react-loader-spinner'
import React from 'react'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full grow'>
      <MagnifyingGlass
        visible={true}
        height="150"
        width="150"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="gray"
      /></div>
  )
}

export default Loading