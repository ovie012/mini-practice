import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons';

const CountryPage = ({ 
    country, darkMode, setCountry 
} : {
    country: any;
    darkMode: boolean;
    setCountry: (country: any) => void;
}) => {
  return (
    <View>
        <TouchableOpacity 
            className={`w-32 rounded my-2 px-3 gap-2 py-3 flex flex-row items-center justify-center ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements' : 'bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow'}`}
            onPress={() => setCountry(null)}
        >
            <Image 
                source={icons.arrow}
                className='size-5 mr-1 mt-0.5 rotate-180'
                tintColor={darkMode ? "#fff" : "#000"}
            />
            <Text
                className={`text-xl font-nunitoSansLight ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}
            >
            Back
            </Text>
        </TouchableOpacity>
        <Image 
            source={{ uri: country.flags.png }}
            style={{
                width: "100%",
                height: 250,
                justifyContent: "center",
                alignSelf: "center",
            }}
            className="w-full h-40 rounded-sm my-6"
            resizeMode="cover"
        />
        <ScrollView 
            className='py-2'
            contentContainerStyle={{ paddingBottom: 1000 }}
            showsVerticalScrollIndicator={false}
        >
            <Text className={`text-xl mb-4 font-nunitoSansExtraBold my-4 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                {country.name.common}
            </Text>
            <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Native Name: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country.name.nativeName[Object.keys(country.name.nativeName)[0]].common}
                </Text> 
            </Text>
            <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Population: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country.population.toLocaleString()}
                </Text> 
            </Text>
            <Text className={`text-lg font-nunitoSansSemiBold mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Region: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country.region.toLocaleString()}
                </Text> 
            </Text>
            <Text className={`text-lg mb-8 font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Sub Region: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country?.subregion?.toLocaleString() || "N/A"}
                </Text> 
            </Text>
            <Text className={`text-lg mb-2 font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Top Level Domain: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country?.tld?.[0] || "N/A"}
                </Text> 
            </Text>
            <Text className={`text-lg mb-2 font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                currencies: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country?.currencies ? (Object.values(country.currencies)[0] as any ).name : "N/A"}
                </Text> 
            </Text>
            <Text className={`text-lg mb-8 font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Languages: {" "}
                <Text className={`text-lg font-nunitoSansLight mb-2 ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {country?.languages ? Object.values(country.languages).join(", ") : "N/A"}
                </Text> 
            </Text>
            <Text className={`text-lg mb-8 font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Border Countries:
            </Text>
            <View className='flex flex-wrap items-center gap-4 flex-row w-full'>
                {country.borders.map((item: any) => (
                    <Text key={item} className={`min-w-[30%] p-3 text-center rounded-md flex ${darkMode ? 'bg-restCountriesAPI-blue900DarkElements text-restCountriesAPI-white' : 'bg-restCountriesAPI-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow text-restCountriesAPI-grey950LightText'}`}>{item}</Text>
                ))}
            </View>
        </ScrollView>
    </View>
  )
}

export default CountryPage;