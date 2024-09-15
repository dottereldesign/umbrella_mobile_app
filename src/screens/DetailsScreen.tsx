// src/screens/DetailsScreen.tsx
import React from "react";
import { View, Text } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types"; // Create a type definition for your stack params

type Props = NativeStackScreenProps<RootStackParamList, "Details">;

const DetailsScreen = ({ route, navigation }: Props) => {
  return (
    <View>
      <Text>Details Screen</Text>
    </View>
  );
};

export default DetailsScreen;
