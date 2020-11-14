import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useBottomScrollListener} from 'react-bottom-scroll-listener';
import CharacterCard from "../../CharacterCard";

import axios from 'axios';

function Index() {
    const [characters, setCharacters] = useState([]);
    const [nextPageURL, setNextPageURL] = useState('');

    useEffect(() => {
        getCharacters('https://rickandmortyapi.com/api/character/');
    }, []);
    useBottomScrollListener(() => getCharacters(nextPageURL));

    const getCharacters = (url: string) => {
        axios.get(url)
            .then(({data}) => {
                //@ts-ignore
                setCharacters([...characters, ...data.results]);
                setNextPageURL(data.info.next);
            });
    }

    return (
        <div className="container mx-auto px-4 mt-6">
            <h2 className="uppercase tracking-wide font-semibold">
                Characters
            </h2>
            <div className="popular-games text-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mt-6">
                {characters.length > 0 ? (
                    characters.map(({id, name, status, image, origin}) => {
                        return (
                            <Link key={id} to={`/character/${id}`}>
                                <CharacterCard id={id} name={name} status={status} image={image} origin={origin}/>
                            </Link>
                        );
                    })
                ) : (
                    <div>
                        loading ...
                    </div>
                )}
            </div>
        </div>
    );
}

export default Index;
