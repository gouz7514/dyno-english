import Lottie from 'lottie-react'
import styled from 'styled-components'

type LottieProps = {
  json: Record<string, any>
  height?: number
  description?: string
}

const LottieWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .lottie-description {
    text-align: center;
  }

  h3 {
    word-break: keep-all;
  }
`

export default function LottieAnimation({ json, height = 300, description }: LottieProps) {
  return (
    <LottieWrapper>
      <Lottie animationData={json} style={{ height }} loop={false} />
      <div className="lottie-description">
        { 
          description && (
            <h3>
              {description}
            </h3>
          )
        }
      </div>
    </LottieWrapper>
  )
}