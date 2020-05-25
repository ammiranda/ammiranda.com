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
`

const ExamplePage = ({ data }) => {
  return (
    <Container>
      <SEO title="About" description="About Alex Miranda" />
      <Title>About</Title>
      <Content>
        <p>
          Hi, welcome to my site! I am Alex Miranda a software engineer based in
          Seattle, WA. I enjoy photography, traveling, reading and a myriad of
          other hobbies/topics. All of the photos on this site are travel
          pictures I took of some of my favorite places. I hope the insights I
          share here are useful to others. I would love to hear about awesome
          happenings in the tech space either here in the PNW or elsewhere. My
          resume is posted below. Thanks!
          <a href="/Alex_Miranda_Resume_Jan_20_20.pdf">Resume</a>
        </p>
      </Content>
    </Container>
  )
}

export default ExamplePage
