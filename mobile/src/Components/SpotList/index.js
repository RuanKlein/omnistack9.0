import React, { useState, useEffect } from 'react';
import { 
    View,
    FlatList,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { withNavigation } from 'react-navigation';

import api from '../../Services/Api';
import env from '../../../env.json';

import styles from './styles';

export default withNavigation(({ tech, navigation }) => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const response = await api.get('/spots', {
                params: { tech }
            });

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function handleNavigate(id) {
        navigation.navigate('Book', { id });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Empresas que usam <Text style={styles.bold}>{tech}</Text></Text>

            <FlatList
                style={styles.list}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }} />
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price ? `R$ ${item.price}/dia` : 'GRATUITO'}</Text>

                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
                            <Text style={styles.buttonText}>
                                Solicitar reserva
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
});