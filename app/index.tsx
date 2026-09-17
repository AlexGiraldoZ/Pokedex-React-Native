import React, { useState, useEffect } from 'react';
import { getPokemonImage, Pokemon, getPokemonList } from '@/api/pokeapi';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { Link } from 'expo-router';


export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const data = await getPokemonList();
      setPokemonList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={styles.item}>
      <View style={styles.grayBackground}/>
      <Link href={{ pathname: '/pokemon/PokemonDetail', params: { name: item.name } }}>
        <View style={styles.itemColumn}>
          <Image source={{ uri: `${getPokemonImage(item.url)}` }} style={styles.image} />
          <Text style={styles.text}>{item.name}</Text>
        </View>
      </Link>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <FlatList
          data={pokemonList}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
          numColumns={3}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DC0A2D',
  },
  subcontainer: {
    marginHorizontal: 5,
    marginVertical: 10,
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  grayBackground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: '#EFEFEF',
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  item: {
    flex: 1,
    backgroundColor: 'white',
    margin: 5,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemColumn: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
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
});
