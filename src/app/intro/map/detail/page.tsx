'use client'

import { useEffect, useRef } from "react"
import styled from 'styled-components'

const MapStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
  align-items: center;
  height: calc(100vh - var(--height-header) - var(--height-footer));

  .map-container {
    width: 500px;
    height: 500px;

    @media screen and (max-width: 600px) {
      width: 325px;
      height: 325px;
    }
  }
`

export default function IntroMapDetail() {
  const mapElement = useRef(null)

  useEffect(() => {
    const { naver } = window
    if (!mapElement.current || !naver) return

    const location = new naver.maps.LatLng(37.5603, 127.19972)
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    }
    const map = new naver.maps.Map(mapElement.current, mapOptions)
    new naver.maps.Marker({
      position: location,
      map,
    })
  }, [])

  return (
    <MapStyle>
      <div>
        경기 하남시 미사강변한강로334번길 25
      </div>
      <div ref={mapElement} className="map-container" ></div>
    </MapStyle>
  )
}