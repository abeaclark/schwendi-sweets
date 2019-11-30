import React from 'react'
import { Link } from 'gatsby'

const Navbar = class extends React.Component {
  render() {
    return (
      <nav
        aria-label="main-navigation"
        css={{ textAlign: 'center' }}
      >
        <a href={this.props.instagram}>
          @schwendi.sweets
        </a>
      </nav>
    )
  }
}

export default Navbar
