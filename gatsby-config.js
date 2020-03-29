module.exports = {
  siteMetadata: {
    title: 'Alex Miranda',
    description: 'Alex Miranda is a software engineer based in Seattle, WA.',
    url: 'https://gatsby-starter-amsterdam.netlify.com',
    author: 'Alex Miranda',
    image: 'https://gatsby-starter-amsterdam.netlify.com/og-image.jpg',
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
      resolve: 'gatsby-theme-amsterdam',
      options: {
        colorToggle: false,
        grid: 'list',
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
  ],
}
