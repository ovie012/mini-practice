import React, { useState } from "react";
import { cn } from "@/src/app/utils/cn";
import { ImageBackground, Text, View, TextInput, Pressable } from "react-native";

const introComponentSignup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSignup() {
        if (!email || !password || !firstName || !lastName) {
            setErrorMessage("Please fill in all fields.");
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setErrorMessage("");
        setSubmitted(true);
    }

    const textInputTypes = [
        {
            id: 1,
            placeholder: "First Name",
            secureTextEntry: false,
            keyboardType: "default",
            value: firstName,
            onChangeText: setFirstName,
        },
        {
            id: 2,
            placeholder: "Last Name",
            secureTextEntry: false,
            keyboardType: "default",
            value: lastName,
            onChangeText: setLastName,
        },
        {
            id: 3,
            placeholder: "Email Address",
            secureTextEntry: false,
            keyboardType: "email-address",
            value: email,
            onChangeText: setEmail,
        },
        {
            id: 4,
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
        {submitted ? 
        <View className="mt-8 mb-10 bg-white p-6 flex justify-center rounded-lg w-full gap-4">
            <Text className="text-introComponent-gray900 text-center text-lg font-poppinsBold">Thank you for signing up, {firstName}!</Text>
            <Text className="text-introComponent-gray900 text-center text-base font-poppinsRegular">Your free trial has been activated. Enjoy exploring our platform and all the resources we have to offer.</Text>
            <Pressable
                className="bg-introComponent-green400 rounded-lg p-5 w-full"
                onPress={() => { setSubmitted(false) }}
            >
                <Text className="text-introComponent-green400 text-center text-base font-poppinsMedium">Go back</Text>
            </Pressable>
        </View>
        :
        <View className="mt-8 mb-10 bg-white p-6 flex justify-center rounded-lg w-full gap-4">
            {textInputTypes.map((inputProps) => (
                <TextInput 
                    className={cn("rounded-md font-poppinsBold px-4 py-4 w-full text-introComponent-gray900", errorMessage ? "border-2 border-introComponent-bg" : "border border-introComponent-purple350")}
                    key={inputProps.id}
                    value={inputProps.value}
                    onChangeText={inputProps.onChangeText}
                    placeholder={inputProps.placeholder}
                    secureTextEntry={inputProps.secureTextEntry}
                />
            ))}
            {errorMessage && <Text className="text-introComponent-bg font-poppinsRegular text-sm text-center">{errorMessage}</Text>}
            <Pressable
                className="bg-introComponent-green400 rounded-lg p-5 w-full"
                onPress={handleSignup}
            >
                <Text className="text-white text-lg text-center font-poppinsBold uppercase">Claim Your Free trial</Text>
            </Pressable>
            <Text className="text-gray-500 text-center text-xs font-poppinsRegular">By clicking the button, you are agreeing to our <Text className="text-introComponent-bg font-poppinsBold">Terms and Services</Text></Text>
        </View>
        }
      </View>
    </ImageBackground>
  );
};

export default introComponentSignup;
