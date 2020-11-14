import React, {FC} from "react";
import {CharacterType as Character} from "./types/CharacterType"

const CharacterShow: FC<Character> = ({children, name, status, gender, species, image, origin, location}) => {
    return (
        <div className="game-details border-b border-gray-800 pb-12 flex flex-col md:flex-row lg:flex-row">
            <div className="flex-none">
                <img
                    className="rounded-lg"
                    src={image}
                    alt={name}/>
            </div>
            <div className="md:ml-6 lg:ml-12 space-y-6">
                <h2 className="font-semibold text-4xl leading-tight mt-1">
                    {name}
                </h2>
                <div className="flex space-x-2 items-center">
                    <div
                        className={`w-4 h-4 rounded-full ${status === 'Alive' ? 'bg-green-500 animate-pulse' : (status === 'Dead' ? 'bg-red-500 ' : 'bg-gray-500')}`}
                    ></div>
                    <div className="text-xl">
                        {status}
                    </div>
                </div>
                <div className="space-y-3">
                    <div>
                        Species: {species}
                    </div>
                    {gender &&
                    <div>
                        Gender: {gender}
                    </div>
                    }
                    {origin &&
                    <div>
                        Origin: {origin.name}
                    </div>
                    }
                    {location &&
                    <div>
                        Current location: {location.name}
                    </div>
                    }
                    {children}
                </div>
            </div>
        </div>
    );
}

export default CharacterShow;