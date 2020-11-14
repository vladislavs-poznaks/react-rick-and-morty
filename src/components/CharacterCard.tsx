import React, {FC} from "react";
import { CharacterType as Character } from "./types/CharacterType"

const CharacterCard: FC<Character> = ({id, name, status, image, origin}) => {
    return (
        <div className="space-y-3">
            <img
                className="rounded-lg"
                src={image}
                alt={name.concat(' image')}
            />
            <div
                className="text-xl font-semibold"
            >{name}</div>
            <div className="flex space-x-2 items-center">
                <div
                    className={`w-4 h-4 rounded-full ${status === 'Alive' ? 'bg-green-500 animate-pulse' : (status === 'Dead' ? 'bg-red-500 ' : 'bg-gray-500')}`}
                ></div>
                <div
                  className="text-lg"
                >
                    {status}
                </div>
            </div>
            {origin && (
                <div>
                    Origin: {origin.name}
                </div>
            )}
        </div>
    );
}

export default CharacterCard;