import { Link, Stack } from "expo-router";
import { Text, TextInput, View, ScrollView, StyleSheet } from "react-native";
import { Image } from "expo-image";
import * as Navbar from "expo-navigation-bar"

//Components
import ImageContainer from "@/components/ImageContainer";

//Images
const mobileSearch = require('@/assets/images/undraw_mobile-search_macy.svg');
const love = require('@/assets/images/undraw_love-it_8pc0.svg');
const site = require('@/assets/images/undraw_mobile-site_qjby.svg');
const spread = require('@/assets/images/undraw_spread-love_0ekp.svg');

export default function Index() {
  return (
    <ScrollView className="default-container">
      <View className="default-container">
        <Stack.Screen options={{ headerTitle: "Songify" }} />

        <View>
          <Text className="text-4xl font-bold text-center p-3 mb-10">Welcome to Songify</Text>
        </View>
        <View className='w-full h-full flex flex-row justify-between align-middle bg-bg-light pt-5'>
          <Text className="text-4xl font-bold p-3 ">LIKE SONGS</Text>
          <Image source={love} className='h-full md:w-96 sm:w-96 img-fix'/>
        </View>
        <View className='w-full h-full flex flex-row justify-between pt-5'>
          <Image source={spread} className='h-full md:w-96 sm:w-96 img-fix'/>
          <Text className="text-4xl font-bold p-3">SHARE WITH FRIENDS</Text>
        </View>
        <View className='w-full h-full flex flex-row justify-between bg-bg-light pt-5'>
          <Text className="text-4xl font-bold p-3">VIEW ON MOBILE OR DESKTOP</Text>
          <Image source={site} className='h-full md:w-96 sm:w-96 img-fix'/>
        </View>
        <View className='w-full h-full flex flex-row justify-between pt-5'>
          <Image source={mobileSearch} className='h-full md:w-96 sm:w-96 img-fix'/>
          <Text className="text-4xl font-bold p-3">SEARCH FOR YOUR FAVOURITES</Text>
        </View>
      </View>
    </ScrollView>
  );
}

