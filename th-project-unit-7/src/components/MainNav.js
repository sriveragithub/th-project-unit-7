import React from 'react';
import { NavLink } from 'react-router-dom'

const MainNav = (props) => {

  const handleNavSelection = (e) => {
    const searchQuery = e.target.text.toLowerCase()
    console.log(searchQuery)
    props.initSearch(searchQuery)
  }

  return(
    <nav className="main-nav">
      <ul>
        <li><NavLink to="/search/cats" onClick={handleNavSelection}>Cats</NavLink></li>
        <li><NavLink to="/search/dogs" onClick={handleNavSelection}>Dogs</NavLink></li>
        <li><NavLink to="/search/computers" onClick={handleNavSelection}>Computers</NavLink></li>
      </ul>
    </nav>
  )
}

export default MainNav