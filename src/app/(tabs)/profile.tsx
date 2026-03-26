import React, { JSX, useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Linking, TouchableOpacity } from 'react-native';
import IconFA from 'react-native-vector-icons/FontAwesome'; // Fa* icons
import IconFA5 from 'react-native-vector-icons/FontAwesome5'; // Si* icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // React Native icon, etc.
import profileImg from '@/assets/images/Profile-image.png'
import cleanProfileImg from '@/assets/images/clean-profile-image.png'

const profile = () => {

    const [zustandIconChosen, setZustandIconChosen] = useState<JSX.Element | null>(null);

    const randomThemeSelect = () => {
        const randomChoice = Math.random();
            if (randomChoice > 0.5) {
                // Closest to GiBearFace → FontAwesome "paw"
                setZustandIconChosen(<IconFA name="paw" size={24} color="#000" />);
            } else {
                // Closest to TbLetterZ → FontAwesome "bolt" (just as a placeholder)
                setZustandIconChosen(<IconFA name="bolt" size={24} color="#000" />);
            }
    };

    useEffect(() => {
        randomThemeSelect();
    }, []);

    const socials = [
        { icon: <IconFA name="linkedin" size={24} color="#0A66C2" />, link: "https://www.linkedin.com/in/ovie-emonefe-73b886259/" },
        { icon: <IconFA name="github" size={24} color="#000" />, link: "https://github.com/ovie012" },
        { icon: <IconFA name="twitter" size={24} color="#1DA1F2" />, link: "https://x.com/legend_devv" }, // closest to FaXTwitter
        { icon: <IconFA5 name="tiktok" size={24} color="#000" />, link: "https://www.tiktok.com/@legenddev_softwaredev" },
        { icon: <IconFA name="instagram" size={24} color="#C13584" />, link: "https://www.instagram.com/legendd.devv" },
    ];

    const skills = [
        { icon: <IconFA name="html5" size={20} color="#E34F26" />, name: "HTML" },
        { icon: <IconFA name="css3" size={20} color="#1572B6" />, name: "CSS" },
        { icon: <IconFA name="js" size={20} color="#F7DF1E" />, name: "JavaScript" },
        { icon: <IconFA name="react" size={20} color="#61DAFB" />, name: "React" },
        { icon: <IconFA5 name="redux" size={20} color="#764ABC" />, name: "Redux" },
        { icon: <IconFA5 name="css3-alt" size={20} color="#DB7093" />, name: "Styled Components" }, // closest visual
        { icon: <IconFA5 name="tailwind" size={20} color="#38BDF8" />, name: "Tailwind CSS" },
        { icon: <IconFA name="play" size={20} color="#000" />, name: "Framer Motion" },
        { icon: <IconFA5 name="typescript" size={20} color="#3178C6" />, name: "TypeScript" },
        { icon: zustandIconChosen, name: "Zustand" },
        { icon: <MaterialCommunityIcons name="react" size={20} color="#61DAFB" />, name: "React Native" },
    ];

  return (
      <View className='flex-1 bg-background'>
            <View className='items-center pt-32 justify-center'>
                <Image source={cleanProfileImg} className='w-[200px] h-[200px] bg-light-100 rounded-full justify-center items-center mb-8' />
                <Text className='text-light-200 font-extrabold text-lg' >EMONEFE OVIE EZEKIEL</Text>
            </View>
            <Text className='text-light-100 mb-3 mt-8 font-semibold text-center text-2xl underline underline-offset-8' >ABOUT</Text>
            <ScrollView 
                className='flex-1'
                contentContainerStyle={{
                    paddingBottom: 80,
                }}
            >
                <View className="space-y-3 px-5 pb-20 text-white">
                    <Text className="text-base text-white">
                        Hi, I’m Emonefe Ovie Ezekiel, a passionate Software Developer from Delta State, Nigeria but based in Lagos, Nigeria. My current stack includes{' '}
                        {skills.map((item, index) => (
                        <Text key={index} className="font-bold">
                            {item.name}{index < skills.length - 1 ? ', ' : ''}
                        </Text>
                        ))} 
                        {' '}and more. I have a strong interest in web and mobile development, and I’m always eager to learn new technologies and improve my skills. I’m particularly fascinated by the potential of AI and how it can be integrated into applications to create innovative solutions.
                        I am a proud graduate of Mathematics and Education from the University of Lagos, Nigeria. During my studies, I conducted impactful research on the role of OpenAI technologies in improving mathematics learning outcomes for secondary school students. This research not only deepened my understanding of AI's potential in education but also fueled my passion for leveraging technology to solve real-world problems.
                        Beyond coding, I value innovation and creating solutions that make life easier. Let’s build something amazing together!
                    </Text>
                </View>
            </ScrollView>
            {/* <View className='h-36 overflow-hidden'>
            </View> */}
        </View>
  )
}

export default profile;