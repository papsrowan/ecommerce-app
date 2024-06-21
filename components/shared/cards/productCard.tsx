import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React from "react";
import FA6 from "@expo/vector-icons/build/FontAwesome6";
import FA from "@expo/vector-icons/build/FontAwesome";
import Stars from "react-native-stars";
import BarCode from "@kichiyaki/react-native-barcode-generator";
import { useAppStore } from "@/stores/appStore";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;

const ProductCard = ({ product }: { product: any }) => {
  const addProduct = useAppStore((state) => state.addProduct);
  const cart = useAppStore((state) => state.cart);
  const handleAddToCart = () => {
    if (cart[product.id]) {
      router.replace("/cart");
      return;
    }

    addProduct(product, 1);
    Toast.show({
      type: "success",
      text1: "Success",
      text2: "Success",
      visibilityTime: 1500,
    });
  };
  return (
    <View className="p-4 rounded-[20px] w-full border-bronze-solid1 border bg-bronze-background2 relative">
      <View className="absolute top-0 left-0 p-4 z-50 flex-row w-[105%] items-center justify-between">
        <Image src={product.meta.qrCode} className="h-[70px] w-[70px]" />
        <BarCode value={product.meta.barcode} height={35} width={1} />
      </View>
      <Image
        src={product.images[0]}
        className="rounded-[20px] bg-bronze-background1"
        resizeMode="contain"
        style={{
          height: width,
        }}
      />
      <View className="flex flex-row gap-10 justify-between w-full items-center my-2">
        <View className="flex-row gap-2 flex-wrap mt-2 mb-1">
          {product.tags.slice(0, 2).map((tag: any, index: number) => {
            return (
              <Text
                key={`tag-${index}`}
                className="bg-bronze-border2 px-3 py-1 rounded-3xl"
              >
                {tag}
              </Text>
            );
          })}
        </View>
        <Stars
          default={product.rating}
          fullStar={<FA size={20} name={"star"} style={[styles.myStarStyle]} />}
          emptyStar={
            <FA
              size={20}
              name={"star-o"}
              style={[styles.myStarStyle, styles.myEmptyStarStyle]}
            />
          }
          halfStar={
            <FA size={20} name={"star-half"} style={[styles.myStarStyle]} />
          }
          spacing={4}
          count={5}
          half
          color="green"
        />
      </View>
      <View className="flex ">
        <Text className="text-xl my-2 font-bold">{product.title}</Text>
        <View>
          <Text>
            <FA6 name="check" color="green" />
            {"  "}
            {product.warrantyInformation}
          </Text>
          <Text>
            <FA6 name="check" color="green" />
            {"  "}
            {product.shippingInformation}
          </Text>
        </View>
        <View>
          <Text className="text-center text-4xl font-bold my-4">
            $ {product.price}
          </Text>
        </View>
        <Text
          onPress={handleAddToCart}
          className="border text-white bg-bronze-solid1 border-bronze-border3 py-3 rounded-3xl text-center text-xl"
        >
          {cart[product.id] ? "View your cart" : "Add To cart"}
        </Text>
      </View>
    </View>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
  myStarStyle: {
    color: "#C2A499",
    backgroundColor: "transparent",
    textShadowColor: "black",
    textShadowOffset: { width: 0.1, height: 0.1 },
    textShadowRadius: 0.2,
  },
  myEmptyStarStyle: {
    color: "white",
  },
});
