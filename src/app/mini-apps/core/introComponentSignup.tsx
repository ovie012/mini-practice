import React, { useState } from "react";
import { ImageBackground, Text, View, TextInput } from "react-native";

const introComponentSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    function handleSignup() {
        
    }

    const textInputTypes = [
        {
            placeholder: "First Name",
            secureTextEntry: false,
            keyboardType: "default",
            value: firstName,
            onChangeText: setFirstName,
        },
        {
            placeholder: "Last Name",
            secureTextEntry: false,
            keyboardType: "default",
            value: lastName,
            onChangeText: setLastName,
        },
        {
            placeholder: "Email Address",
            secureTextEntry: false,
            keyboardType: "email-address",
            value: email,
            onChangeText: setEmail,
        },
        {
            placeholder: "Password",
            secureTextEntry: true,
            keyboardType: "default",
            value: password,
            onChangeText: setPassword,
        },
    ]

  return (
    <ImageBackground
      source={require("@/assets/images/bg-intro-mobile.png")}
      style={{ flex: 1 }}
      resizeMode="cover"
      className="bg-introComponent-bg"
    >
      <View className="px-4 py-32 flex-1 items-center">
        <Text className="text-white text-4xl text-center font-poppinsBold mb-4">Learn to code by watching others</Text>
        <Text className="text-white text-xl text-center font-poppinsMedium w-[95%] mb-8">See how experienced developers solve problems in real-time. Watching scripted tutorials is great, but understanding how developers think is invaluable</Text>
        <View className="bg-introComponent-purple700 flex justify-center items-center flex-row rounded-lg w-full h-fit py-4 px-[86px]">
            <Text className="text-white text-center text-lg font-poppinsSemiBold">Try it free 7 days{' '}
                <Text className="text-introComponent-purple350 text-base font-poppinsMedium">then $20/mo. thereafter</Text>
            </Text>
        </View>
        <View className="mt-8 bg-white p-6 flex justify-center rounded-lg w-full gap-1">
            {textInputTypes.map((inputProps, index) => (
                <TextInput 
                    className="rounded-md font-poppinsBold px-4 py-4 mb-4 w-full border border-introComponent-purple350 text-introComponent-gray900"
                    key={index}
                    value={inputProps.value}
                    onChangeText={inputProps.onChangeText}
                    placeholder={inputProps.placeholder}
                    secureTextEntry={inputProps.secureTextEntry}
                />
            ))}
            <View className="bg-introComponent-green400 rounded-lg w-full py-3 mt-2">
                <Text className="text-white text-center font-poppinsMedium text-base">Claim your free trial</Text>
            </View>
             <Text className="text-gray-500 text-center text-xs mt-4 font-poppinsRegular">By clicking the button, you are agreeing to our <Text className="underline">Terms and Services</Text></Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default introComponentSignup;
