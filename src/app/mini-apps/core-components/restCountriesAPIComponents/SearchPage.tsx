import { View, Text, TextInput, Pressable, Animated, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

const SearchPage = ({ 
    darkMode,
    setCountries,
    countries,
    filteredCountries,
    setFilteredCountries,
    setCountry,
} : { 
    darkMode: boolean,
    setCountries: (val: any) => void,
    countries: any[],
    filteredCountries: any[],
    setFilteredCountries: (val: any) => void,
    setCountry: (val: any) => void,
}) => {
    const [showRegionFilter, setShowRegionFilter] = useState(false);


    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: showRegionFilter ? 200 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [showRegionFilter]);

    const handleSearch = (text: string) => {
        const filtered = countries.filter((country) =>
            country.name.common.toLowerCase().includes(text.toLowerCase())
        );

        setFilteredCountries(filtered);
    };

    const handleFilterByRegion = (region: string) => {
        const filtered = countries.filter((country) =>
            country.region === region
        );

        setFilteredCountries(filtered);
        setShowRegionFilter(false);
    };

    const handleCountryPress = (country: any) => {
        setCountry(country);
    }

  return (
    <View>
        <View className='flex-row items-center relative mb-6'>
            <FontAwesome5Icon
                name='search'
                size={20}
                color={darkMode ? "#ffffff" : "#6b7280"}
                style={{
                    position: 'absolute',
                    top: 25,
                    left: 30,
                    zIndex: 10,
                }}
            />
            <TextInput
                placeholder='Search for a country...'
                placeholderTextColor={darkMode ? "#ffffff" : "#6b7280"}
                onChangeText={handleSearch}
                className={`w-full rounded-md p-6 pl-20 text-lg ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements text-restCountriesAPI-LightInput ' : 'bg-restCountriesAPI-white text-restCountriesAPI-grey950LightText shadow-md shadow-restCountriesAPI-grey400LightInputShadow'} `}
            />
        </View>
        <View className='flex mb-4 w-full gap-2 relative z-20'>
            <Pressable 
                className={`flex-row w-1/2 justify-between items-center gap-2 rounded-md p-4   ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements' : 'bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow'}`}
                onPress={() => setShowRegionFilter(!showRegionFilter)}
            >
                <Text className={`text-lg font-nunitoSansRegular ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    Filter by Region
                </Text>
                <FontAwesome5Icon
                    name='chevron-down'
                    size={12}
                    color={darkMode ? "#ffffff" : "#6b7280"}
                />
            </Pressable>
            <Animated.View
                style={{
                    height: heightAnim,
                    overflow: "hidden",
                    position: "absolute",
                    top: 60,
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(107, 114, 128, 0.1)",
                }}
                className={`w-1/2 rounded-md ${
                    darkMode
                    ? "bg-restCountriesAPI-blue900DarkElements"
                    : "bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow"
                }`}
            >
                {["Africa", "Americas", "Asia", "Europe", "Oceania"].map((region) => (
                    <Text
                        key={region}
                        onPress={() => handleFilterByRegion(region)}
                        className={`px-4 py-2 text-lg font-nunitoSansRegular ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText shadow-md shadow-restCountriesAPI-grey400LightInputShadow'} hover:bg-gray-200`}
                    >
                        {region}
                    </Text>
                ))}
            </Animated.View>
        </View>
        <View className='flex items-center justify-center mb-4 gap-4 px-10'>
            {/* <View className={`w-full rounded-md flex ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements' : 'bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow'}`}>
                <Image 
                    source={{ uri: "https://flagcdn.com/w320/af.png" }}
                    className="w-full h-40 rounded-md"
                    resizeMode="cover"
                />
                <View className='px-8 py-2'>
                    <Text className={`text-xl mb-4 font-nunitoSansExtraBold my-4 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                        Afghanistan
                    </Text>
                    <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                        Population: {" "}
                        <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                            38,928,346
                        </Text>
                    </Text>
                    <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                        Region: {" "}
                        <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                            Asia
                        </Text>
                    </Text>
                    <Text className={`text-lg font-nunitoSansSemiBold mb-4 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                        Capital: 
                        <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                            Kabul
                        </Text>
                    </Text>
                </View>
            </View> */}
            <FlatList
                data={filteredCountries}
                keyExtractor={(item) => item.name.common}
                style={{ 
                    width: "100%",
                    boxShadow: darkMode ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "0 4px 6px rgba(107, 114, 128, 0.1)",
                }}
                renderItem={({ item }) => (
                    <Pressable 
                        className={`w-full rounded-md mb-8 flex ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements' : 'bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow'}`}
                        onPress={() => handleCountryPress(item)}
                    >
                        <Image 
                            source={{ uri: item.flags.png }}
                            className="w-full h-40 rounded-md"
                            resizeMode="cover"
                        />
                        <View className='px-8 py-2'>
                            <Text className={`text-xl mb-4 font-nunitoSansExtraBold my-4 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                {item.name.common}
                            </Text>
                            <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                Population: {" "}
                                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                    {item.population.toLocaleString()}
                                </Text>
                            </Text>
                            <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                Region: {" "}
                                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                    {item.region}
                                </Text>
                            </Text>
                            <Text className={`text-lg font-nunitoSansSemiBold mb-4 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                Capital: {" "}
                                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                                    {item.capital ? item.capital[0] : "N/A"}
                                </Text>
                            </Text>
                        </View>
                    </Pressable>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    </View>
  )
}

export default SearchPage;