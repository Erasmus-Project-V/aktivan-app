<script lang="ts">
    import maplibregl, { AttributionControl } from "maplibre-gl";
    import "maplibre-gl/dist/maplibre-gl.css";
    import { onMount } from "svelte";
    import { Body } from "svelte-body";

    export let coordinates: Array<{ latitude: number; longitude: number; }>;

    onMount(() => {
        const map = new maplibregl.Map({
            container: "map", // container id
            style: 'https://api.maptiler.com/maps/streets/style.json?key=lY1bvvaxXQRRVYw8tOll',
            center: [coordinates[0].longitude, coordinates[0].latitude],
            zoom: 13,
            attributionControl: false,
        });

        const startMarker = new maplibregl.Marker({
            color: "#00FF00"
        }).setLngLat([coordinates[0].longitude, coordinates[0].latitude])
            .addTo(map);

        const endMarker = new maplibregl.Marker({
            color: "#FF0000"
        }).setLngLat([coordinates[coordinates.length - 1].longitude, coordinates[coordinates.length - 1].latitude])
            .addTo(map);

        map.on('load', () => {
            map.addSource('route', {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'LineString',
                        'coordinates': coordinates.map(coord => [coord.longitude, coord.latitude]),
                    }
                }
            });
            map.addLayer({
                'id': 'route',
                'type': 'line',
                'source': 'route',
                'layout': {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                'paint': {
                    'line-color': '#888',
                    'line-width': 6,
                }
            });
        });
    });
</script>

<div class="{$$props.class}" id="map">

</div>