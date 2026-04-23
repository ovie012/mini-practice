import { View, Text, Pressable, Animated } from 'react-native';
import React,{ useEffect, useState }  from 'react';
// import FeatherIcon from 'react-native-vector-icons/Feather';
import { Feather } from '@expo/vector-icons';
import CountryPage from '../core-components/restCountriesAPIComponents/CountryPage';
import SearchPage from '../core-components/restCountriesAPIComponents/SearchPage';

const restCountriesAPI = () => {
  const [countries, setCountries] = useState<any[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [country, setCountry] = useState(null);

  const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => {
            if (prev.length >= 3) return "";
                return prev + ".";
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region,nativeName,languages,currencies,borders,tld"
                );
                
                const data = await response.json();
                const normalized = Array.isArray(data) ? data : [];
                
                setCountries(normalized);
                setFilteredCountries(normalized);
            } catch {
                setCountries([]);
                setFilteredCountries([]);
            } finally {
                setLoading(false);
            }
        };
        
        fetchCountries();
    }, []);
    
    return (
        <View className={`flex-1 ${darkMode ? 'bg-restCountriesAPI-blue950DarkBg' : 'bg-restCountriesAPI-grey50LightBg'}`}>
        <View className={`flex-row w-full px-4 pt-28 pb-6 items-center justify-between mb-6 
            ${darkMode ? "bg-restCountriesAPI-blue900DarkElements" : "bg-white shadow-md shadow-restCountriesAPI-grey400LightInputShadow "}`}>
            <Text className={`text-xl font-nunitoSansSemiBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                Where in the world?
            </Text>
            <Pressable
                className='flex-row items-center gap-2'
                onPress={() => setDarkMode(prev => !prev)} 
            >
                <Feather
                    name={darkMode ? "moon" : "sun"}
                    size={18}
                    color={darkMode ? "#fff" : "#000"}
                />
                <Text className={`font-nunitoSansRegular ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    {darkMode ? "Dark Mode" : "Light Mode"}
                </Text>
            </Pressable>
        </View>
        {!loading ? (
            <View className='px-4'>
                {country ? 
                    <CountryPage 
                    country={country}
                    setCountry={setCountry}
                    darkMode={darkMode}
                    /> 
                    : 
                    <SearchPage 
                    darkMode={darkMode}
                    setCountries={setCountries}
                    countries={countries}
                    filteredCountries={filteredCountries}
                    setFilteredCountries={setFilteredCountries}
                    setCountry={setCountry}
                    />
                }
            </View>
        ) : (
            <View className={`flex-1 items-center justify-center ${darkMode ? 'bg-restCountriesAPI-blue950DarkBg' : 'bg-restCountriesAPI-grey50LightBg'}`}>
                <Text className={`text-xl font-nunitoSansBold ${darkMode ? 'text-restCountriesAPI-white' : 'text-restCountriesAPI-grey950LightText'}`}>
                    Loading{dots}
                </Text>
            </View>
        )}
    </View>
  )
}

export default restCountriesAPI;










//   useEffect(() => {
//     const fetchCountries = async () => {
//         try {
//             const response = await fetch(
//                 "https://restcountries.com/v3.1/all?fields=name,capital,population,flags,region"
//             );

//             const data = await response.json();

//             if (!Array.isArray(data)) {
//                 setCountries([]);
//                 setFilteredCountries([]);
//                 return;
//             }

//             setCountries(data);
//             setFilteredCountries(data);
//         } catch (error) {
//             setCountries([]);
//             setFilteredCountries([]);
//         } finally {
//             setLoading(false);
//         }
//     };

//     fetchCountries()
//   }, [])