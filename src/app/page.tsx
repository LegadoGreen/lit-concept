"use client";
import React, { useEffect, useRef } from 'react';
import Head from 'next/head';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Initialize Mapbox token (you should replace this with your actual token)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const Home: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    if (!mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/standard',
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Load the GeoJSON data when the map is ready
    map.current.on('load', () => {
      // Add the GeoJSON source with clustering enabled
      map.current?.addSource('points', {
        type: 'geojson',
        data: '/points.geojson',
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });

      // Add the clusters layer
      map.current?.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'points',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',  // color for 1-100 points
            100, '#f1f075',  // color for 100-750 points
            750, '#f28cb1'   // color for 750+ points
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            8,  // radius for 1-100 points (reduced from 20)
            100, 14,  // radius for 100-750 points (reduced from 30)
            750, 20   // radius for 750+ points (reduced from 40)
          ]
        }
      });

      // Add the count of points in each cluster
      map.current?.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'points',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      // Add the unclustered points layer
      map.current?.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'points',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-opacity': 0.8
        }
      });

      // Add click handler for clusters
      map.current?.on('click', 'clusters', (e) => {
        if (!map.current) return;

        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ['clusters']
        });
        const clusterId = features?.[0]?.properties?.cluster_id;
        const source = map.current.getSource('points') as mapboxgl.GeoJSONSource;

        if (clusterId !== undefined) {
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err || !map.current || zoom === null) return;

            const coordinates = (features?.[0]?.geometry as any).coordinates;
            map.current.easeTo({
              center: coordinates,
              zoom: zoom
            });
          });
        }
      });

      // Change the cursor to a pointer when hovering over clusters
      map.current?.on('mouseenter', 'clusters', () => {
        if (map.current?.getCanvas()) {
          map.current.getCanvas().style.cursor = 'pointer';
        }
      });
      map.current?.on('mouseleave', 'clusters', () => {
        if (map.current?.getCanvas()) {
          map.current.getCanvas().style.cursor = '';
        }
      });
    });

    // Cleanup on unmount
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Head>
        <title>Environmental Impact Map</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="w-full h-screen">
        <div ref={mapContainer} className="w-full h-full" />
      </div>
    </div>
  );
};

export default Home;
