import { useQuery } from "@apollo/client";
import { useState } from "react";
import Card from "../components/Card";
import { ALL_POKEMON } from "../queries/Pokemons";

export default function Favorite() {

    const {loading, data} = useQuery(ALL_POKEMON);

    let favs = [];
    if(localStorage.getItem('favorites') !== null){
        favs = JSON.parse(localStorage.getItem('favorites'));
    }

    const [Favorites, setFavorites] = useState(favs);

    // const setFavorite = ((pokemonId) => {
    //     let newArr = [...Favorites];
    //     let search = Favorites.indexOf(pokemonId);
    //     newArr.slice(search, 1);
    //     localStorage.setItem('favorites', JSON.stringify(newArr));
    //     setFavorites(newArr);
    // });

    const setFavorite = ((pokemonId) => {
        let newArr = [...Favorites];
        let search = Favorites.indexOf(pokemonId);
        if(search === -1){
            newArr.push(pokemonId);
            localStorage.setItem('favorites', JSON.stringify(newArr));
        }else{
            newArr.splice(search, 1);
            localStorage.setItem('favorites', JSON.stringify(newArr));
        }
        setFavorites(newArr);
    })

    if(loading) {
        return (
            <p style={{
                fontSize: "40px",
                fontFamily: "cursive",
                color: "blue",
                textAlign: "center"
            }}>Loading...</p>
        );
    }else{
        const pokemons = data.pokemons.results;
        if(localStorage.getItem('favorites') !== null){
            return (
                <div id="listPokemons">
                    {pokemons.map((pokemon) => {
                        let isFav = Favorites.includes(pokemon.id);
                        if(isFav){
                            return (
                                <div key={pokemon.id}>
                                    <Card src={pokemon.artwork} name={pokemon.name} id={pokemon.id}>
                                        <div id="nameNHeart">
                                            <div style={{
                                                fontFamily: "cursive",
                                                textDecoration: "none",
                                                color: "black"
                                            }}>
                                                {pokemon.name}
                                            </div>
                                            <img src={isFav ? "https://www.pngfind.com/pngs/m/52-526485_heart-icon-instagram-like-icon-png-transparent-png.png"
                                            : "https://upload.wikimedia.org/wikipedia/commons/1/1e/Heart-SG2001-transparent.png"} alt="" height="30"
                                            onClick={()=>{setFavorite(pokemon.id)}}/>
                                        </div>
                                    </Card>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            );
        }
    }
}
