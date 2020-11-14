import React, {useEffect, useState} from "react";
import { CharacterType } from "../../types/CharacterType";
import { LocationType } from "../../types/LocationType";
import CharacterShow from "../../CharacterShow";
import CharacterCard from "../../CharacterCard";
import LocationCard from "../../LocationCard";
import Modal from "../../modal/modal";

import {
    Link,
    Redirect,
    useParams
} from 'react-router-dom';

import axios from "axios";


const Show = () => {
    //@ts-ignore
    const characterURL: string = `https://rickandmortyapi.com/api/character/${useParams().id}`;

    const [character, setCharacter] = useState<CharacterType>();
    const [residents, setResidents] = useState<CharacterType[]>([]);

    const [location, setLocation] = useState<LocationType>();
    const [origin, setOrigin] = useState<LocationType>();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pageNotFound, setPageNotFound] = useState(false);

    useEffect(() => {
        getCharacter();
    }, [useParams()]);

    useEffect(() => {
        character && getLocations()
    }, [character]);

    const getCharacter = () => {
        axios.get(characterURL)
            .then(({data}) => {
                setCharacter(data);
            })
            .catch(err => {
                setPageNotFound(true);
            });
    }

    const getLocations = () => {
        //@ts-ignore
        axios.get(character.location.url)
            .then(({data}) => {
                setLocation(data);
                getResidents(data.residents);
            });
        //@ts-ignore
        axios.get(character.origin.url)
            .then(({data}) => {
                setOrigin(data);
            });
    }

    const getResidents = (residents: string[]) => {

        const ids = residents.map((url: string) => {
            const partials = url.split('/');
            return partials[partials.length - 1];
        });

        if(ids.length > 12) {
            ids.splice(12, ids.length - 12);
        } else if (ids.length > 6) {
            ids.splice(6, ids.length - 6);
        }

        axios.get('https://rickandmortyapi.com/api/character/' + (ids.join(',')))
            .then(({data}) => {
                setResidents(data);
            })
    }

    return (
        <div className="h-screen">
            {character ? (
                <div className="container mx-auto px-4 mt-12">
                    <CharacterShow
                        name={character.name}
                        image={character.image}
                        status={character.status}
                        species={character.species}
                        gender={character.gender}
                        origin={character.origin}
                        location={character.location}
                    >
                        <div
                            className="inline-block text-sm hover:text-gray-500 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Location Info
                        </div>
                    </CharacterShow>
                    <div className="mt-6">
                        <h2 className="uppercase tracking-wide font-semibold mt-6">
                            Residents in Current Location
                        </h2>

                        <div className="text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mt-6">
                            {residents.length > 0 ? (
                                residents.map(({id, name, image, status}) => {
                                    return (
                                        <Link
                                            key={id}
                                            to={`/character/${id}`}
                                        >
                                            <CharacterCard
                                                id={id}
                                                name={name}
                                                status={status}
                                                image={image}
                                            />
                                        </Link>
                                    );
                                })
                            ) : (
                                <div>
                                    No residents ...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    loading ...
                </div>
            )}
            {pageNotFound && (
                 <Redirect to="/page-not-found"/>
            )}

            {isModalOpen && (
                <Modal
                    onClick={() => {
                        setIsModalOpen(false)
                    }}
                >
                    <div className="space-y-6">
                        {origin && (<LocationCard
                            name={origin.name}
                            type={origin.type}
                            dimension={origin.dimension}
                            residents={origin.residents}>
                            Origin
                        </LocationCard>)}
                        {location && (<LocationCard
                            name={location.name}
                            type={location.type}
                            dimension={location.dimension}
                            residents={location.residents}>
                            Location
                        </LocationCard>)}
                    </div>
                </Modal>
            )}
        </div>
    )
}

export default Show;