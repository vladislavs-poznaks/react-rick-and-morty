import React, {FC} from "react";
import {LocationType as Location} from "./types/LocationType"

const LocationCard: FC<Location> = ({name, type, dimension, residents, children}) => {
    return (
        <div className="space-y-2">
            <h2 className="uppercase tracking-wide font-semibold">
                {children}
            </h2>
            <div>
                {name}
            </div>
            <div>
                Type: {type}
            </div>
            <div>
                Dimension: {dimension}
            </div>
            <div>
                Population: {residents.length}
            </div>
        </div>
    );
}

export default LocationCard;