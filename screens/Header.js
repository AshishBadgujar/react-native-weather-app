import React from 'react'
import { Appbar, Title } from 'react-native-paper';

const Header = ({ name }) => {
    return (
        <Appbar.Header
            style={{ flexDirection: "row", justifyContent: "center" }}
            theme={{
                colors: {
                    primary: "#333"
                }
            }}>
            <Title style={{ color: "white" }}>{name}</Title>
        </Appbar.Header>
    );
}

export default Header
