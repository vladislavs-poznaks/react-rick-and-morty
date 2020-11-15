import React, {useEffect, useState, useRef} from "react";
import {CharacterType} from "./types/CharacterType";
import {Link} from "react-router-dom";
import axios from "axios";

const SearchBox = () => {

    const inputEl = useRef<HTMLInputElement>(null);
    const [query, setQuery] = useState('');
    const [characters, setCharacters] = useState<CharacterType[]>([]);
    const [noResults, setNoResults] = useState(false);

    useEffect(() => {
        window.addEventListener('keypress', (e) => {
            if (e.key === '/') {
                e.preventDefault()
                inputEl.current?.focus()
            }
        })
    }, [])

    useEffect(() => {
        if (query.length > 2) {
            getCharacters();
        } else {
            setCharacters([]);
            setNoResults(false);
        }
    }, [query])

    const getCharacters = () => {
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
            .then(({data}) => {
                const DELETE_COUNT = 8;
                data.results.length > 12
                    ? setCharacters(data.results.splice(DELETE_COUNT))
                    : setCharacters(data.results);
                setNoResults(false);
            })
            .catch(() => {
                setCharacters([]);
                setNoResults(true);
            });
    }

    return (
        <div>

            <div className="relative">
                <input
                    className="bg-gray-800 text-sm rounded-full focus:outline-none focus:shadow-outline w-64 px-3 pl-8 py-1"
                    placeholder="Search (press '/' to focus...)"
                    ref={inputEl}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <div className="absolute top-0 flex items-center h-full ml-2">
                    <svg
                        className="fill-current text-gray-400 w-4"
                        viewBox="0 0 24 24">
                        <path
                            className="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z" />
                    </svg>
                </div>
            </div>
            <div
                className="absolute z-50 bg-gray-800 text-xs rounded w-64 mt-2"
            >
                <ul>
                    {characters.length > 0 && characters.map(({id, image, name}) => {
                        return (
                            <li
                                key={id}
                                className="border-b border-gray-700"
                            >
                                <Link
                                    to={`/character/${id}`}
                                    onClick={() => setQuery('')}
                                    className="block hover:bg-gray-700 flex items-center transition ease-in-out duration-150 px-3 py-3"
                                >
                                    <img
                                        src={image}
                                        alt="cover"
                                        className="w-10"
                                    />
                                    <span className="ml-2">{name}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
                {noResults && (
                    <div className="px-3 py-3">
                        No results for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBox;