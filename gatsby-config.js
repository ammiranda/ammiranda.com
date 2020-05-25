require('dotenv').config()
const targetAddress = new URL(process.env.TARGET_ADDRESS || `https://blog.com`)

module.exports = {
  siteMetadata: {
    title: 'Alex Miranda',
    description: 'Alex Miranda is a software engineer based in Seattle, WA.',
    url: targetAddress.toString(),
    author: 'Alex Miranda',
    intro: 'Alex Miranda is a software engineer based in Seattle, WA.',
    menuLinks: [
      {
        name: 'Alex Miranda',
        slug: '/',
      },
      {
        name: 'About',
        slug: '/about/',
      },
      {
        name: 'Contact',
        slug: '/contact/',
      },
    ],
    footerLinks: [
      {
        name: 'Email',
        url: 'mailto:alexandermichaelmiranda@gmail.com',
      },
      {
        name: 'Linkedin',
        url: 'https://linkedin.com/in/alexmmiranda',
      },
      {
        name: 'Github',
        url: 'https://github.com/ammiranda',
      },
      {
        name: 'Instagram',
        url: 'https://instagram.com/alexandermmir',
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162357221-1',
      },
    },
    {
      resolve: 'gatsby-theme-amsterdam',
      options: {
        colorToggle: false,
        grid: 'grid',
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Theme Amsterdam`,
        short_name: `Amsterdam`,
        background_color: `#f5f0eb`,
        theme_color: `#f5f0eb`,
        start_url: `/`,
        display: `standalone`,
        icon: require.resolve('./src/images/favicon.png'),
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.AWS_S3_BUCKET || 'fake_bucket',
        region: process.env.AWS_REGION,
        protocol: targetAddress.protocol.slice(0, -1),
        hostname: targetAddress.hostname,
        acl: null,
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: targetAddress.href.slice(0, -1),
      },
    },
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
        reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
        mergeScriptHashes: false, // you can disable scripts sha256 hashes
        mergeStyleHashes: true, // you can disable styles sha256 hashes
        mergeDefaultDirectives: true,
        directives: {
          'script-src':
            "'self' 'unsafe-inline' 'unsafe-eval' www.google-analytics.com",
          'style-src': "'self' 'unsafe-inline'",
          'img-src': "'self' data: www.google-analytics.com",
          // you can add your directives or override defaults
        },
      },
    },
  ],
}
