import Hero from "@/components/for-screens/home/Hero";
import AppBar from "@/components/shared/appbar";
import RandomBgCard from "@/components/shared/cards/randombg";
import { productService } from "@/services/product";
import { ActivityIndicator, Dimensions, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";

const width = Dimensions.get('window').width

export default function HomeScreen() {
  const topProducts = useQuery({
    queryKey: "top-products",
    queryFn: async () => {
      const products = await productService.getProductsByCategory({
        name: "tops",
      });

      return products.products as any[];
    },
  });

  const allCategories = useQuery({
    queryKey: "all-products-categories",
    queryFn: async () => {
      const categories = await productService.getAllProdutsCategories();

      return categories as any[];
    },
  });

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" hidden={false} />
      <AppBar />
      <ScrollView className="bg-bronze-background2 pb-[60px]">
        {topProducts.data ? (
          <Hero products={topProducts.data} />
        ) : (
          <View
            className="z-50 items-center justify-center h-full gap-5 absolute top-0 left-0 bg-bronze-background2"
            style={{ width }}
          >
            <ActivityIndicator
              color={"#A18072"}
              size={50}
              className="rounded-2xl bg-bronze-background2 p-5"
              style={{
                elevation: 0.2,
              }}
            />
            <Text className="text-xl text-bronze-text1">
              Connexion en cours
            </Text>
          </View>
        )}
        <View className="items-center flex-col gap-6">
          <Text className="text-2xl font-bold text-center text-bronze-text1">
            Our products
          </Text>
          <View className="flex flex-row flex-wrap gap-2 mx-auto pb-[50px] justify-center">
            {/* <Text>{JSON.stringify(allCategories.data || {}, null, 2)}</Text> */}
            {allCategories.data?.map((category: any, index: number) => {
              return (
                <RandomBgCard
                  classes="w-[45%]"
                  category={category}
                  key={`category-${index}`}
                  text={category.name}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
