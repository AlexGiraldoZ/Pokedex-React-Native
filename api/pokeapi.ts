import axios from 'axios';

export interface Pokemon {
    name: string;
    url: string;
    height: number;
    weight: number;
    base_experience: number;
    types: { type: { name: string } }[];
    sprites: {
      other: {
        'official-artwork': {
          front_default: string;
        }
      }
    },
    stats: { base_stat: number, effort: number, stat: { name: string } }[]
  }

export const getPokemonImage = (url: string): string => {
    const id = url.split('/').filter(Boolean).pop();
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export const getPokemonList = async (): Promise<Pokemon[]> => {
    try{
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150&offset=0');
    const data =  await response.json();
    return data.results; 
    }
    catch (error){
        console.error('Error fetching Pokémon list:', error);
        throw error;
    }
}  

export const getPokemonDetail = async (name: string): Promise<Pokemon> => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching details for Pokémon ${name}:`, error);
      throw error;
    }
  };

  export const getPokemonDetailAxios = async (name: string): Promise<Pokemon> => {
    try {
      const response = await axios(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching details for Pokémon ${name}:`, error);
      throw error;
    }
  }