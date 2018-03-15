import React from 'react'

const HelloPage = () => (
  <div>
    { console.log(process.env.REACT_APP_API_PATH) }
    <input type="text" />
    <button onClick={() => console.log('hi')}>Submit</button>
  </div>
)

export default HelloPage
