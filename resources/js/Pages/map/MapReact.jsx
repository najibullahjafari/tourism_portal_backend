import React, { useEffect } from "react";
import { simplemaps_countrymap_mapdata } from "./mapdata";

function MapReact() {
    useEffect(() => {
        // Check if the simplemaps object is available
        if (window.simplemaps_countrymap) {
            window.simplemaps_countrymap.loadmap(simplemaps_countrymap_mapdata);
        } else {
            console.error("SimpleMaps library is not loaded.");
        }
    }, []);

    return (
        <div>
            <h1>HTML5/Javascript Country Map</h1>
            <div id="map" style={{ width: "100%", height: "500px" }}></div>
            <p>
                This map was created and can be edited at{" "}
                <a href="http://simplemaps.com/custom/country/2OF5gEOe">
                    http://simplemaps.com/custom/country/2OF5gEOe
                </a>
            </p>
            <p>
                To learn how to install this map on your web page, see the{" "}
                <a href="http://simplemaps.com/docs">Documentation</a>.
            </p>
        </div>
    );
}

export default MapReact;
