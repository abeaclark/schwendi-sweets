import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'
import { themeStyles, colors, presets } from '../utils/theme'
import CookieRoll from '../components/CookieRoll'

import Layout from '../components/Layout'

const styles = {
  outer: {
    backgroundColor: colors.darkPurple,
  },
  main: {
    ...themeStyles.contentWidth,
    ...themeStyles.textPadding,
  },
  hero: {
    backgroundColor: colors.darkPurple,
  },
}

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  description,
  cookieTypes,
  social,
  priceText,
}) => (
  <div css={styles.outer}>
    <div css={styles.hero}>
      <Img
        fluid={image.childImageSharp.fluid}
        style={{
          maxHeight: '500px',
          width: '100%',
          maxWidth: '500px',
          margin: '0 auto',
        }}
        loading='eager'
      />
    </div>
    <div css={styles.main}>

      <h1 css={{ textAlign: 'center' }}>{heading}</h1>
      <p css={{ textAlign: 'center' }}>
        <a css={{ color: colors.lightPurple, textDecoration: 'none' }} href={social.instagramLink} target="_blank">
          {social.instagramHandle}
        </a>
      </p>
      <p css={{ textAlign: 'center', color: 'white' }}>{description}</p>

    </div>
    <CookieRoll
      cookieTypes={cookieTypes}
    />
    <div css={{ textAlign: 'center'}}>
      <h2 css={{ marginTop: '30px', color: 'white', textAlign: 'center' }}>
        Pricing
      </h2>
      <p css={{ color: colors.lightPurple }}>
        3 cookies for 2 dollars
      </p>
      <p css={{ color: colors.lightPurple }}>
        5 cookies for 3 dollars
      </p>
      <p css={{ marginBottom: 0, paddingBottom: '30px', color: colors.lightPurple }}>
        12 for 7 dollars
      </p>
    </div>
    <div css={{ textAlign: 'center'}}>
      <h2 css={{ marginTop: '30px', color: 'white', textAlign: 'center' }}>
        To order, please email:
      </h2>
      <p css={{ marginBottom: 0, textAlign: 'center', paddingBottom: '50px' }}>
        <a css={{ color: colors.lightPurple, textDecoration: 'none' }} href={`mailto:${social.email}`} target="_blank">
          {social.email}
        </a>
      </p>
    </div>
  </div>
)

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  description: PropTypes.string,
  cookieTypes: PropTypes.array,
  social: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        cookieTypes={frontmatter.cookieTypes}
        social={frontmatter.social}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
        heading
        subheading
        description
        cookieTypes {
          image {
            childImageSharp {
              fluid(maxWidth: 500, quality: 100) {
                ...GatsbyImageSharpFluid_noBase64
              }
            }
          }
          title
        }
        social {
          instagramLink
          instagramHandle
          email
        }
      }
    }
  }
`
