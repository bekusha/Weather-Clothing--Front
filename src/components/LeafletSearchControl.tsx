import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

interface Props {
    onLocationSelect: (lat: number, lon: number) => void;
}

const LeafletSearchControl: React.FC<Props> = ({ onLocationSelect }) => {
    const map = useMap();

    useEffect(() => {
        // Search provider using OpenStreetMap
        const provider = new OpenStreetMapProvider();

        // Initialize the GeoSearch control
        const searchControl = GeoSearchControl({
            provider,
            style: "bar",
            searchLabel: "search location...",
            showMarker: true,
            showPopup: true,
            popupFormat: ({ result }: any) => `${result.label}`,
            animateZoom: true,
            autoClose: true,
        });
        // Add the search control to the map
        map.addControl(searchControl);
        // Listen for the event when a location is selected from the search
        map.on("geosearch/showlocation", (e: any) => {
            const { location } = e;
            onLocationSelect(location.y, location.x);
        });
        // Clean up: remove the control when component is unmounted
        return () => {
            map.removeControl(searchControl);
        };
    }, [map, onLocationSelect]);

    return null;
};

export default LeafletSearchControl;
