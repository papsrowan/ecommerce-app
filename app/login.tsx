import {
  View,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "react-query";
import { axiosOpenInstance } from "@/services/axios";
import { useAppStore } from "@/stores/appStore";
import { router, useLocalSearchParams } from "expo-router";
import { asynStorageService } from "@/services/AsyncStorage";
import Toast from "react-native-toast-message";

const width = Dimensions.get("window").width;

const Login = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { prevRoute } = useLocalSearchParams();

  const setUser = useAppStore((state) => state.setUser);

  const mutation = useMutation({
    mutationKey: "login",
    mutationFn: async (data: any) => {
      const user = await axiosOpenInstance.post("/auth/login", data);
      return user.data;
    },
    onSuccess: async (user: any) => {
      setUser(user);
      asynStorageService.setItem("user", JSON.stringify(user));
      Toast.show({
        type: "success",
        text1: "Bienvenue",
        text2: `${user.firstName}`,
        visibilityTime: 2500,
      });
      setTimeout(() => router.replace((prevRoute as string) || "/"), 2000);
    },
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Erreu",
        text2: `Username ou mot de passe incorrect`,
        visibilityTime: 2500,
      });
    },
  });
  const onSubmit = async (data: any) => {
    mutation.mutate(data);
  };
  return (
    <View className="h-full flex px-5 justify-center bg-bronze-background2 relative">
      {mutation.isLoading ? (
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
          <Text className="text-xl text-bronze-text1">Connexion en cours</Text>
        </View>
      ) : null}
      <View className=" gap-3">
        <Text className="text-center text-2xl font-bold text-bronze-text1 my-4">
          Happy to see you!
        </Text>
        <View className="border border-bronze-border2 bg-bronze-background1 rounded-3xl">
          <View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="py-2 px-5 border-b border-b-bronze-border2"
                  placeholder="Username"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="username"
            />
            {errors.username && <Text>This is required.</Text>}
          </View>
          <View>
            <Controller
              control={control}
              rules={{
                maxLength: 100,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Last name"
                  className="py-2 px-5"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password && <Text>This is required.</Text>}
          </View>
        </View>
        <Text
          onPress={handleSubmit(onSubmit)}
          className="w-full text-center bg-bronze-border1 border border-bronze-border3 py-3 rounded-3xl text-bronze-text1 text-xl"
        >
          LOGIN
        </Text>
      </View>
    </View>
  );
};

export default Login;
