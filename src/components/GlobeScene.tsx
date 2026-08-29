import { useEffect, useRef, useState } from 'react'
import Globe, { type GlobeMethods } from 'react-globe.gl'
import { globeArcs, globeLabels, globePoints } from '@/data/aboutGlobe'
import { colorRgb } from '@/config/colors'

interface GlobeSceneProps {
  className?: string
  compact?: boolean
}

export function GlobeScene({ className = '', compact = false }: GlobeSceneProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 640, height: 480 })

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      setSize({
        width: Math.round(node.clientWidth),
        height: Math.round(node.clientHeight),
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const introLabels = compact ? globeLabels.slice(0, 1) : globeLabels
  const introPoints = compact
    ? globePoints.filter((point) => point.label === 'New York')
    : globePoints

  return (
    <div ref={containerRef} className={`globe-scene h-full w-full ${className}`.trim()}>
      <Globe
        ref={globeRef}
        width={size.width}
        height={size.height}
        globeImageUrl="/textures/earth-night.jpg"
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor={`rgba(${colorRgb.orange.join(',')},0.4)`}
        atmosphereAltitude={compact ? 0.12 : 0.14}
        pointsData={introPoints}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="size"
        pointAltitude={0.02}
        pointLabel="label"
        arcsData={globeArcs}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcAltitudeAutoScale={0.45}
        arcStroke={0.6}
        arcDashLength={0.45}
        arcDashGap={2}
        arcDashAnimateTime={2000}
        labelsData={introLabels}
        labelLat="lat"
        labelLng="lng"
        labelText="text"
        labelColor="color"
        labelSize="size"
        labelDotRadius={0.35}
        labelDotOrientation="bottom"
        labelIncludeDot
        labelResolution={2}
        onGlobeReady={() => {
          globeRef.current?.pointOfView(
            { lat: 38, lng: -58, altitude: compact ? 2.1 : 2.4 },
            compact ? 0 : 800,
          )
          const controls = globeRef.current?.controls()
          if (controls) {
            controls.autoRotate = true
            controls.autoRotateSpeed = compact ? 0.65 : 0.55
            controls.enableZoom = false
          }
        }}
      />
    </div>
  )
}
