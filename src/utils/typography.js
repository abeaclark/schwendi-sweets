import Typography from 'typography'
const lightPurple = '#F8BFFF'
const darkPurple = '#8F5AAE'
const lightestGrey = '#F2F6F6'

const theme = {
  title: 'Schwendi Sweets',
  baseFontSize: '18px',
  baseLineHeight: 1.25,
  googleFonts: [
    {
      name: 'Josefin Sans',
      styles: ['700', '400'],
    },
  ],
  headerFontFamily: ['Josefin Sans', 'sans-serif'],
  bodyFontFamily: ['Josefin Sans', 'sans-serif'],
  headerWeight: '600',
  bodyWeight: 'normal',
  boldWeight: 'bold',
  overrideStyles: ({ adjustFontSizeTo, scale, rhythm }, options) => ({
    body: {
      backgroundColor: darkPurple,
    },
    h1: {
      color: 'white',
      marginBottom: '30px',
      fontSize: '35px',
      fontWeight: 'normal',
      lineHeight: '1em',
      marginTop: '18 px',
    },
    h3: {
      color: 'lightestGrey',
      marginBottom: '10px',
      fontSize: '1.17em',
    },
    // [TABLET_MEDIA_QUERY]: {
    //   h1: {
    //     ...scale(5 / 5),
    //   },
    // },
    a: {
      color: 'white',
      textDecoration: 'underline',
    },
    p: {
      paddingBottom: rhythm(1/2),
      fontWeight: 300,
    },
    // 'a:hover': {
    //   color: '#ea9629',
    //   textDecoration: 'underline',
    // },
    'ol,ul': {
      marginLeft: 0,
      paddingLeft: rhythm(1.5),
      fontWeight: 300,
    },
    'li>ul,li>ol': {
      marginLeft: 0,
      paddingLeft: rhythm(1.5),
      fontWeight: 300,
    },
    blockquote: {
      ...scale(1 / 5),
      fontWeight: 300,
      fontStyle: 'italic',
      marginLeft: rhythm(1.5),
      marginRight: rhythm(1.5),
    },
    'blockquote cite': {
      ...adjustFontSizeTo(options.baseFontSize),
      fontWeight: options.bodyWeight,
      textTransform: 'uppercase',
    },
    h6: {
      marginTop: rhythm(1.25),
      marginBottom: rhythm(1.25),
    },
    table: {
      ...scale(-1 / 5),
    },
    th: {
      fontWeight: options.boldWeight,
      textTransform: 'uppercase',
    },
    dl: {
      marginLeft: rhythm(3 / 4),
    },
  }),
}

const typography = new Typography(theme)
// console.log(typography.toJSON().h1)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
