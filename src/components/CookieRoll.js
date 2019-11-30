import React from 'react'
import { themeStyles, colors, presets } from '../utils/theme'
import Carousel from 'nuka-carousel'
import Img from 'gatsby-image'

const styles = {

}


class CookieRoll extends React.Component {
  render() {
    return (
      <div
        css={{ ...themeStyles.contentWidth }}
      >
        <Carousel
          heightMode='current'
          renderCenterLeftControls={({ previousSlide }) => (
            <button css={{background: 'transparent', color: 'white', border: 0, fontSize: '50px', cursor: 'pointer'}} onClick={previousSlide}>{"<"}</button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button css={{background: 'transparent', color: 'white', border: 0, fontSize: '50px', cursor: 'pointer'}} onClick={nextSlide}>{">"}</button>
          )}
        >
          {this.props.cookieTypes.map((c, i) => (
            <div key={i}>
              <Img
                fluid={c.image.childImageSharp.fluid}
                loading='eager'
              />
            </div>
          ))}

        </Carousel>
      </div>
    )
  }
}

export default CookieRoll
