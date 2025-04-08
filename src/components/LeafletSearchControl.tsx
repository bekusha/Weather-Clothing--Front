import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

interface Props {
    onLocationSelect: (lat: number, lon: number) => void;
}

const LeafletSearchControl: React.FC<Props> = ({ onLocationSelect }) => {
    const map = useMap();

    useEffect(() => {
        const provider = new OpenStreetMapProvider();

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

        map.addControl(searchControl);

        map.on("geosearch/showlocation", (e: any) => {
            const { location } = e;
            onLocationSelect(location.y, location.x); // latitude, longitude
        });

        return () => {
            map.removeControl(searchControl);
        };
    }, [map, onLocationSelect]);

    return null;
};

export default LeafletSearchControl;
