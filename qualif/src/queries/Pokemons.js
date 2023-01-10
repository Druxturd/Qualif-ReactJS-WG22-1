import { gql } from "@apollo/client";

export const ALL_POKEMON = gql`
    query{
        pokemons(limit: 100){
            results{
                id
                name
                artwork
            }
        }
    }
`

export const POKEMON_DETAIL = gql`
    query Detail($name: String!){
        pokemon(name: $name){
            abilities{
                ability{
                    name
                }
            }
            stats{
                base_stat
                stat{
                    name
                }
            }
        }
    }
`