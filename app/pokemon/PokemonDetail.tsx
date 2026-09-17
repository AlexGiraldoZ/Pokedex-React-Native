import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Pokemon, getPokemonDetail, getPokemonDetailAxios } from '@/api/pokeapi';

const PokemonDetail: React.FC = () => {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchPokemonDetail();
  }, [name]);


  const fetchPokemonDetail = async () => {
    try {
      if(name){
          const data = await getPokemonDetail(name);
          navigation.setOptions( { headerStyle: { backgroundColor: getTypeColor(data.types[0].type.name) } } )
          setPokemon(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!pokemon) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
        <View style={[styles.header, { backgroundColor: getTypeColor(pokemon.types[0].type.name) }]}>
            <Text style={styles.headerText}>{pokemon?.name}</Text>
            <Image
                source={{ uri: pokemon?.sprites.other['official-artwork'].front_default }}
                style={styles.image}
            />
        </View>
        <View style={styles.content}>
            <View style={styles.typesContainer}>
                {pokemon.types.map((typeInfo, index) => (
                <View key={index} style={[styles.typeContainer, { backgroundColor: getTypeColor(typeInfo.type.name) }]}>
                    <Text  style={styles.type}>
                    {typeInfo.type.name}
                    </Text>
                </View>
                ))}
            </View>
            <Text style={styles.sectionTitle}>About</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Weight: {pokemon.weight / 10} kg</Text>
                <Text style={styles.infoText}>Height: {pokemon.height / 10} m</Text>
            </View>
            <Text style={styles.sectionTitle}>Base Stats</Text>
            {pokemon.stats.map((stat, index) => (
                <View key={index} style={styles.statContainer}>
                    <Text style={[styles.statName, { color: getTypeColor(pokemon.types[0].type.name) }]}>{stat.stat.name}</Text>
                    <Text style={styles.statBase}>{stat.base_stat}</Text>
                    <View style={styles.progressBarContainer}>
                    <View style={[styles.progressBar, { width: `${stat.base_stat}%`, backgroundColor: getTypeColor(pokemon.types[0].type.name) }]} />
                    </View>
                </View>
            ))}
      </View>
  </ScrollView>
  );
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'bug': return '#A7B723';
    case 'dark': return '#75574C';
    case 'dragon': return '#7037FF';
    case 'electric': return '#F9CF30';
    case 'fairy': return '#E69EAC';
    case 'fighting': return '#C12239';
    case 'fire': return '#F57D31';
    case 'flying': return '#A891EC';
    case 'ghost': return '#70559B';
    case 'normal': return '#AAA67F';
    case 'grass': return '#74CB48';
    case 'ground': return '#DEC16B';
    case 'ice': return '#9AD6DF';
    case 'poison': return '#A43E9E';
    case 'psychic': return '#FB5584';
    case 'rock': return '#B69E31';
    case 'steel': return '#B7B9D0';
    case 'water': return '#6493EB';
    default: return '#DC0A2D';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DC0A2D',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: 'white',
  },
  header: {
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'capitalize',
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    padding: 20,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  typeContainer: {
    borderRadius: 12,
    marginHorizontal: 5,
  },
  type: {
    color: 'white',
    fontWeight: 'bold',
    paddingVertical: 5,
    paddingHorizontal: 15,
    textTransform: 'capitalize',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statName: {
    marginRight: 10,
    width: 80,
    fontWeight: 'bold',
    fontSize: 16,
  },
  statBase: {
    marginRight: 10,
    fontSize: 16,
  },
  progressBarContainer: {
    height: 10,
    width: '60%',
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
  },
});

export default PokemonDetail;
