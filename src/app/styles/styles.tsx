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

  .article-section {
    padding-bottom: 40px;

    .section-title {
      &.toggle {
        cursor: pointer;

        &:hover {
          transform: scale(1.05);
        }
      }

      .section-title-text {
        font-size: 24px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;

        .icon-click {
          display: inline-block;
          width: 28px;
          height: 28px;
          background-size: 28px 28px;
          background-image: url('/icon/icon-click.webp');
        }
      }
    }

    .section-content {
      line-height: 2em;
    }
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

export const FormStyle = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  padding: 40px 12px 24px;

  .form-title {
    margin-bottom: 24px;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    label {
      margin-bottom: 8px;
    }

    .input-error {
      margin-top: 8px;
      color: red;
      font-size: 12px;
      height: 12px;
    }

    textarea {
      height: 200px;
      border-radius: 8px;
      padding: 8px;
      border: 1px solid #ccc;

      &:focus {
        border: 1px solid var(--primary-green);
      }
    }
  }
`