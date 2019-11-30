import React from 'react'
import { themeStyles, colors, presets } from '../utils/theme'
import Carousel from 'nuka-carousel'
import Img from 'gatsby-image'

const styles = {

}


class CookieRoll extends React.Component {
  render() {
    console.log(this.props.cookieTypes)
    return (
      <Carousel
        heightMode='current'
        renderCenterLeftControls={({ previousSlide }) => (
          <button css={{background: 'transparent', color: 'white', border: 0, fontSize: '50px', cursor: 'pointer'}} onClick={previousSlide}>{"<"}</button>
        )}
        renderCenterRightControls={({ nextSlide }) => (
          <button css={{background: 'transparent', color: 'white', border: 0, fontSize: '50px', cursor: 'pointer'}} onClick={nextSlide}>{">"}</button>
        )}
      >
        {this.props.cookieTypes.map(c => (
          <div>
          <Img fluid={c.image.childImageSharp.fluid} />
          </div>
        ))}

      </Carousel>
    )
  }
}

export default CookieRoll
