import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { Card, Title } from 'react-native-paper'
import Header from './Header'

const Home = ({ route }) => {
    const [info, setInfo] = useState({
        name: "loading...",
        temp: "loading...",
        humidity: "loading...",
        desc: "loading...",
        icon: "loading..."
    })
    useEffect(() => {
        getWeather()
    }, [])
    const getWeather = async () => {
        let MyCity = await AsyncStorage.getItem("newCity");
        if (!MyCity) {
            const { city } = route.params;
            MyCity = city;
        }
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&APPID=420659eb9f58ca4eeaf16ed402af5409&units=metric`)
            .then(data => data.json())
            .then(results => {
                setInfo({
                    name: results.name,
                    temp: results.main.temp,
                    humidity: results.main.humidity,
                    desc: results.weather[0].description,
                    icon: results.weather[0].icon,
                })
            })
            .catch(err => {
                alert.apply(err.message)
            })
    }
    if (route.params.city != "london") {
        getWeather()
    }
    return (
        <View style={{ flex: 1 }}>
            <Header name="Weather App" />
            <View style={{ alignItems: "center" }}>
                <Title style={{
                    marginVertical: 30,
                    fontSize: 30
                }}>{info.name}</Title>
                <Image
                    style={{
                        width: 120,
                        height: 120,
                    }}
                    source={{ uri: `https://openweathermap.org/img/w/${info.icon}.png` }}
                />
            </View>
            <Card
                style={{
                    margin: 9,
                    padding: 15,
                }}>
                <Title>Temperature : {info.temp}</Title>
            </Card>
            <Card
                style={{
                    margin: 9,
                    padding: 15
                }}>
                <Title>Humidity : {info.humidity}</Title>
            </Card>
            <Card
                style={{
                    margin: 9,
                    padding: 15
                }}>
                <Title>Description : {info.desc}</Title>
            </Card>
        </View>
    )
}

export default Home