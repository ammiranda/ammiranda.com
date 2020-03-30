import React from 'react'
import Container from 'gatsby-theme-amsterdam/src/components/Container'
import SEO from 'gatsby-theme-amsterdam/src/components/SEO'
import styled from '@emotion/styled'

const Title = styled.h1`
  font-weight: ${props => props.theme.fonts.boldWeight};
  line-height: 1.25;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  margin: 0 auto 1rem;
  font-size: 2rem;
  @media screen and (min-width: ${props => props.theme.responsive.small}) {
    font-size: 2.5rem;
  }
`

const Content = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.sizes.maxWidthCentered};
  p {
    line-height: 1.5;
    margin: 0 0 1.75rem;
  }
  a {
    transition: 0.3s color;
    color: ${props => props.theme.colors.secondary};
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.colors.highlight};
    }
    @media (hover: none) {
      color: ${props => props.theme.colors.secondary} !important;
    }
  }
  code {
    font-family: ${props => props.theme.fonts.monospace};
    font-size: 0.9rem;
    padding: 0.25rem;
    background: ${props => props.theme.colors.code};
    color: ${props => props.theme.colors.text};
    border-radius: 0.3em;
  }
  li {
    margin: 0 0 0.75rem;
  }
`

const ExamplePage = ({ data }) => {
  return (
    <Container>
      <SEO title="Contact" description="Contact Alex Miranda" />
      <Title>Contact</Title>
      <Content>
        <p>Let's chat!</p>
        <ul>
          <li>
            <a href="mailto:alexandermichaelmiranda@gmail.com">Email</a>
          </li>
          <li>
            <a href="https://linkedin.com/in/alexmmiranda">Linkedin</a>
          </li>
          <li>
            <a href="https://github.com/ammiranda">Github</a>
          </li>
          <li>
            <a href="https://instagram.com/alexandermmir">Instagram</a>
          </li>
        </ul>
      </Content>
    </Container>
  )
}

export default ExamplePage