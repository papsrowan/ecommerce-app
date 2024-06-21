import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RandomBgCard = ({
  text,
  classes,
  category,
}: {
  text: string;
  classes?: string;
  category: any;
}) => {
  return (
    <View className={`rounded-lg overflow-hidden p-4 bg-[#F6EDEA] ${classes}`}>
      <Link
        href={{
          pathname: "/category/[slug]",
          params: {
            slug: category.slug,
            name: category.name,
          },
        }}
        className="flex items-center justify-center text-center "
      >
        <Text className="text-xl text-bronze-text1 text-center font-extrabold">
          {text}
        </Text>
      </Link>
    </View>
  );
};

export default RandomBgCard;
