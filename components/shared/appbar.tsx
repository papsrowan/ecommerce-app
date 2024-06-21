import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAppStore } from "@/stores/appStore";
import Fa6Icon from "@expo/vector-icons/FontAwesome6";
import Fa5Icon from "@expo/vector-icons/FontAwesome5";
import { Link, router, usePathname } from "expo-router";
import { productService } from "@/services/product";
import { useQuery } from "react-query";
import { ScrollView } from "react-native";

const AppBar = () => {
  const user = useAppStore((state) => state.user);
  const cart = useAppStore((state) => state.cart);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  // const [results, setResults] = useState<any[]>([]);
  const results = useQuery({
    queryKey: ["search-products", query],
    queryFn: async () => {
      if (query.length > 3) {
        const products = await productService.searchProduct(query);
        return products;
      } else {
        return [];
      }
    },
  });

  const [isResultsVisible, setIsResultsVisible] = useState(false);

  return (
    <>
      <View className="flex bg-bronze-background2 flex-row gap-4 p-2 items-center border-b border-bronze-border1">
        <Link href="/me">
          {user ? (
            <Image
              src={user.image}
              className="h-[30px] rounded-[30px] w-[30px] border border-bronze-border3"
              resizeMode="cover"
            />
          ) : (
            <View>
              <Fa6Icon
                name="user-circle"
                style={{
                  color: "#A18072",
                }}
                size={24}
              />
            </View>
          )}
        </Link>
        <TextInput
          onPress={() => {
            setIsResultsVisible(() => true);
          }}
          className="border grow bg-bronze-background1 rounded-md border-bronze-border1 px-2"
          placeholder="Search anything you want"
          onChange={(e) => {
            const text = e.nativeEvent.text;
            setQuery(() => text);
            setIsResultsVisible(() => true);
          }}
          onFocus={() => {
            setIsResultsVisible(() => true);
          }}
          value={query}
        />
        <View className="relative ">
          {Object.keys(cart).length > 0 && !pathname.includes("/cart") ? (
            <View className=" h-[15px] w-[15px] items-center justify-center absolute -top-2 -right-1 z-50 text-center bg-bronze-border3 rounded-xl">
              <Text className="text-white text-[8px] text-center">
                {Object.keys(cart).length}
              </Text>
            </View>
          ) : null}

          <Fa5Icon
            onPress={() => {
              if (pathname.includes("/cart")) {
                router.push("/");
              } else {
                router.push("/cart");
              }
            }}
            name={pathname.includes("/cart") ? "home" : "shopping-cart"}
            style={{
              color: "#A18072",
            }}
            size={24}
          />
        </View>
      </View>
      {isResultsVisible ? (
        <View
          className="h-full z-50 absolute top-[100px] left-[0px] items-center w-full"
          onTouchStart={(event) => {
            if (event.target === event.currentTarget) {
              setIsResultsVisible(() => false);
            }
          }}
        >
          <View className="border-bronze-border2 border w-[80%] max-h-[70%] overflow-hidden p-4 rounded-[20px] bg-bronze-background2">
            <ScrollView>
              <View className="gap-4">
                {results.isIdle ? (
                  <Text>
                    Veuillez saisir le nom du produit que vous cherchez
                  </Text>
                ) : results.data ? (
                  results.data.length === 0 ? (
                    <Text>Aucun produit correspondant!</Text>
                  ) : (
                    results.data.map((product: any, index: number) => {
                      return (
                        <View
                          className="flex-row items-center gap-2"
                          key={`search-product-${index}`}
                        >
                          <Image
                            src={product.thumbnail}
                            className="border border-bronze-border3 h-[50px] w-[50px] bg-bronze-background2 rounded-[50px]"
                          />
                          <View className="w-[70%]">
                            <Text className="text-lg break-words">{product.title}</Text>
                            <Text>$ {product.price}</Text>
                          </View>
                        </View>
                      );
                    })
                  )
                ) : (
                  <View className="z-50 items-center justify-center h-full gap-5 bg-bronze-background2">
                    <ActivityIndicator
                      color={"#A18072"}
                      size={50}
                      className="rounded-2xl bg-bronze-background2 p-5"
                      style={{
                        elevation: 0.2,
                      }}
                    />
                    <Text className="text-xl text-bronze-text1">Recheche</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default AppBar;
