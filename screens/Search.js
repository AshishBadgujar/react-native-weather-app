import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { Button, TextInput, Card } from 'react-native-paper'
import Header from './Header'

const Search = ({ navigation }) => {
    const [city, setCity] = useState('')
    const [cities, setCities] = useState([])
    const fetchCities = (text) => {
        setCity(text)
        fetch(`http://autocomplete.travelpayouts.com/places2?term=${text}&locale=en&types[]=city&callback=function`)
            .then(res => res.json())
            .then(res2 => {
                console.log(res2)
                // setCities(res2.suggestions)
            }).catch(err => alert.apply(err.message))
    }
    const btnClick = async () => {
        await AsyncStorage.setItem("newCity", city)
        navigation.navigate('home', { city: city })
    }
    const listClick = async (cityName) => {
        setCity(cityName)
        await AsyncStorage.setItem("newCity", cityName)
        navigation.navigate('home', { city: cityName })
    }
    return (
        <View style={{ flex: 1 }}>
            <Header name="Search" />
            <TextInput
                label="City Name"
                theme={{ colors: { primary: "#333" } }}
                value={city}
                onChangeText={(text) => fetchCities(text)}
                style={{ margin: 20 }}
            />
            <Button
                mode="contained"
                theme={{ colors: { primary: "#333" } }}
                style={{ marginHorizontal: 90, marginBottom: 20 }}
                onPress={() => btnClick()}
            ><Text>Save changes</Text></Button>
            <FlatList
                data={cities}
                renderItem={({ item }) => {
                    return (
                        <Card
                            style={{ margin: 2, padding: 12 }}
                            onPress={() => listClick(item.name)}
                        >
                            <Text>{item.name}</Text>
                        </Card>
                    )
                }}
                keyExtractor={item => item.name}
            />
        </View>
    )
}

export default Search
