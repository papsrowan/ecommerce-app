import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { useAppStore } from "@/stores/appStore";
import { Link, router } from "expo-router";
import FA5 from "@expo/vector-icons/FontAwesome5";

const Me = () => {
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    if (!user) {
      router.replace({
        pathname: "/login",
        params: {
          prevRoute: "/me",
        },
      });
    }
  }, [user]);
  return (
    <SafeAreaView>
      {user ? (
        <View className="items-center justify-center h-full gap-3">
          <Image
            src={user.image}
            className="h-[100px] my-3 w-[100px] rounded-[50px] border border-bronze-border2"
            resizeMode="cover"
          />
          <Text className="font-bold text-2xl">
            {user.lastName.toUpperCase()} {user.firstName}
          </Text>
          <Text className="text-xl">{user.email}</Text>
          <View className="flex-row gap-10 my-5 items-center justify-center">
            <Link href={"/"}>
              <FA5 name="home" size={30} />
            </Link>
            <Link href={"/cart"}>
              <FA5 name="shopping-cart" size={30} />
            </Link>
          </View>
        </View>
      ) : (
        <View className="items-center justify-center h-full gap-5">
          <ActivityIndicator
            color={"#A18072"}
            size={50}
            className="rounded-2xl bg-bronze-background2 p-5"
            style={{
              elevation: 0.2,
            }}
          />
          <Text className="text-xl text-bronze-text1">Chargement</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Me;
