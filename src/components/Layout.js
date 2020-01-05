import React from 'react'
import { Helmet } from 'react-helmet'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import useSiteMetadata from './SiteMetadata'
import { withPrefix } from 'gatsby'
import { colors } from '../utils/theme'

const TemplateWrapper = ({ children }) => {
  const { title, description } = useSiteMetadata()
  return (
    <div
      css={{backgroundColor: colors.darkPurple}}
    >
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <script type="text/javascript" src="https://js.squareupsandbox.com/v2/paymentform"></script>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix('/')}favicon/apple-icon-180x180.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}favicon/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix('/')}favicon/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix('/')}favicon/apple-icon.png`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />

        <meta property="og:type" content="business.business" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta
          property="og:image"
          content={`${withPrefix('/')}img/schwendi-logo.png`}
        />
      </Helmet>
      <div>
        {children}
      </div>
    </div>
  )
}

export default TemplateWrapper
