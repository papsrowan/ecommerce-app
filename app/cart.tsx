import AppBar from "@/components/shared/appbar";
import { useAppStore } from "@/stores/appStore";
import { router } from "expo-router";
import { useEffect, useMemo } from "react";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  const user = useAppStore((state) => state.user);
  const state = useAppStore();
  const cart = useAppStore((state) => state.cart);

  const total = useMemo(() => {
    return Object.keys(cart).reduce((prev, curr) => {
      return prev + cart[curr].product.price * cart[curr].quantity;
    }, 0);
  }, [cart]);

  useEffect(() => {
    if (!user) {
      router.replace({
        pathname: "/login",
        params: {
          prevRoute: "/cart",
        },
      });
    }
  }, [user]);
  return (
    <SafeAreaView
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <AppBar />
      <Text className="my-4 text-3xl text-bronze-text1 font-bold text-center">
        Votre panier
      </Text>
      <View className="flex-row justify-between px-4 my-4 border-b border-b-bronze-border3 py-2">
        <Text className="text-xl">Total</Text>
        <Text className="text-xl">$ {total.toFixed(2)}</Text>
      </View>
      <ScrollView className="grow">
        <View className="px-4 gap-5">
          {Object.keys(cart).map((key: string, index: number) => {
            const item = cart[key];
            return (
              <View
                key={`product-${index}`}
                className="flex flex-row justify-between items-center"
              >
                <View
                  className="flex-row gap-3 shrink items-center"
                  style={{
                    maxWidth: "50%",
                  }}
                >
                  <Image
                    src={item.product.thumbnail}
                    className="h-[70px] w-[70px] rounded-lg bg-white border border-bronze-border3"
                    resizeMode="cover"
                  />
                  <View>
                    <Text className="text-xl font-bold break-words">
                      {item.product.title}
                    </Text>
                    <Text>
                      ${item.product.price} x {item.quantity}
                    </Text>
                    <Text
                      className="text-lg border-b"
                      style={{
                        alignSelf: "flex-start",
                      }}
                    >
                      Sub total: ${(item.product.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                </View>
                <View className="shrink-0 flex-row items-center justify-end gap-4">
                  <Text
                    onPress={() => {
                      state.decreaseProductQty(item.product.id);
                    }}
                    className="text-3xl text-white rounded-lg bg-bronze-solid1 w-[30px] text-center"
                  >
                    -
                  </Text>
                  <Text
                    onPress={() => {
                      state.increaseProductQty(item.product.id);
                    }}
                    className="text-3xl text-white rounded-lg bg-blue-500 w-[30px] text-center"
                  >
                    +
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <Text className="text-center py-3 static z-50 bottom-0 left-0 text-xl bg-bronze-solid1 font-bold text-white">
        PAYER
      </Text>
    </SafeAreaView>
  );
}
