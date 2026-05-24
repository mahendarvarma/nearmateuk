'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface LeafletMapProps {
  center: [number, number]
  markers: Array<{
    user: any
    lat: number
    lng: number
    compatibility: number
  }>
  onMarkerClick: (marker: any) => void
}

export default function LeafletMap({ center, markers, onMarkerClick }: LeafletMapProps) {
  const mapRef = useRef<any>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current).setView(center, 13)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map)

    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [])

  useEffect(() => {
    if (!mapRef.current) return

    // Clear existing markers
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof L.Marker) {
        mapRef.current?.removeLayer(layer)
      }
    })

    // Add new markers
    markers.forEach((markerData) => {
      const marker = L.marker([markerData.lat, markerData.lng])
        .addTo(mapRef.current!)
        .bindPopup(`
          <div class="p-2 min-w-[200px]">
            <div class="flex items-center gap-2 mb-2">
              <img src="${markerData.user.avatar}" alt="${markerData.user.nickname}" class="w-10 h-10 rounded-full object-cover" />
              <div>
                <p class="font-semibold text-sm">${markerData.user.nickname}</p>
                <p class="text-xs text-muted-foreground">${markerData.user.university}</p>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-bold text-primary">${markerData.compatibility}% Match</span>
            </div>
          </div>
        `)
      
      marker.on('click', () => onMarkerClick(markerData))
    })
  }, [markers, onMarkerClick])

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView(center, 13)
    }
  }, [center])

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
}
