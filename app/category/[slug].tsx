import ProductCard from "@/components/shared/cards/productCard";
import { productService } from "@/services/product";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, ScrollView, Text, View } from "react-native";
import { useQuery } from "react-query";

export default function Category() {
  const { slug, name } = useLocalSearchParams();
  const products = useQuery({
    queryKey: [`all-products-of-category`],
    queryFn: async () => {
      const products = await productService.getProductsByCategory({
        name: slug as string,
      });

      return products.products;
    },
  });
  return (
    <>
      {!products.data || products.isLoading ? (
        <View className="items-center justify-center h-full gap-5">
          <ActivityIndicator
            color={"#A18072"}
            size={50}
            className="rounded-2xl bg-bronze-background2 p-5"
            style={{
              elevation: 0.2,
            }}
          />
          <Text className="text-xl text-bronze-text1">
            Chargement des produits
          </Text>
        </View>
      ) : (
        <ScrollView className="bg-bronze-background1">
          <Image
            className="h-[200px] rounded-b-3xl bg-bronze-solid1"
            src={products.data[0].images[0]}
            height={200}
            resizeMode="contain"
          />
          <View className="my-5">
            <Text className="text-center text-3xl font-bold">{name}</Text>
          </View>
          <View className="py-0 px-4 gap-10">
            {products.data.map((product: any, index: number) => {
              return <ProductCard key={`product-${index}`} product={product} />;
            })}
          </View>
        </ScrollView>
      )}
    </>
  );
}
