import { View, Text, Image } from "react-native";
import React from "react";
import Swiper from "react-native-swiper";

const Hero = ({ products }: { products: any[] }) => {
  return (
    <View className="mx-3 overflow-hidden my-2 ">
      <Swiper
        autoplay
        loop
        height={300}
        bounces
        className=""
        dotStyle={{
          backgroundColor: "#A18072",
        }}
        activeDotStyle={{
          backgroundColor: "#43302B",
        }}
        decelerationRate={"normal"}
      >
        {products.map((product, index) => {
          return (
            <View key={`top-products-${index}`}>
              <Image
                src={product.images[0]}
                className="h-[250px] bg-[#DFCDC5] rounded-3xl object-contain mx-1"
                resizeMode="contain"
              />
            </View>
          );
        })}
      </Swiper>
    </View>
  );
};

export default Hero;
