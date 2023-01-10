import { useQuery } from "@apollo/client";
import { useRef, useState } from "react";
import Card from "../components/Card";
import { ALL_POKEMON } from "../queries/Pokemons";

function Home() {

    const {loading, data} = useQuery(ALL_POKEMON);
    let favs = [];
    if(localStorage.getItem('favorites') !== null){
        favs = JSON.parse(localStorage.getItem('favorites'));
    }

    const [Favorites, setFavorites] = useState(favs);
    const [Search, setSearch] = useState("");

    const searchRef = useRef();
    const inpSearch = () => {
        let searchVal = searchRef.current.value;
        setSearch(searchVal.toLowerCase());
    }

    const Searching = (Name) => {
        return Name.toLowerCase().includes(Search);
    }

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

    if(loading){
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
        return (
            <div>
                <div id="searchBar">
                    <input type="text" id="searchInput" placeholder="Type here" ref={searchRef}/>
                    <button id="btnSearch" onClick={() => {inpSearch()}}>Search</button>
                </div>
                <div id="listPokemons">
                    {pokemons.map((pokemon, i) => {
                        let isFav = Favorites.includes(pokemon.id);
                        let correct= true;
                        if(Search !== "") {
                            correct = Searching(pokemon.name);
                        }
                        console.log(correct);
                        if(correct){
                            return (
                                <div key={pokemon.id} >
                                    <Card src={pokemon.artwork} name={pokemon.name} id={pokemon.id}>
                                        <div id="nameNHeart">
                                            <div style={{
                                                fontFamily: "cursive",
                                                textDecoration: "none",
                                                color: "black"
                                            }}>{pokemon.name}</div>
                                            <img src={isFav ? "https://www.pngfind.com/pngs/m/52-526485_heart-icon-instagram-like-icon-png-transparent-png.png"
                                            : "https://upload.wikimedia.org/wikipedia/commons/1/1e/Heart-SG2001-transparent.png"} alt="" height="30"
                                            onClick={()=>{setFavorite(pokemon.id)}}/>
                                        </div>
                                    </Card>
                                </div>
                            )
                        }
                        return  null;
                    })}
                </div>
            </div>
        );
    }
}

export default Home;