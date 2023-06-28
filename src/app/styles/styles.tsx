'use client'

import styled from 'styled-components'

export const ArticleStyle = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .article-title {
    font-weight: bold;
    font-size: 1.5em;
    padding-bottom: 20px;
  }

  .article-content {
    line-height: 2em;
  }

  .spacing {
    padding-top: 24px;
  }

  p {
    word-break: keep-all;
    font-size: 1.1em;
    font-weight: 400;
  }

  h3 {
    font-size: 1.3em;
  }
`