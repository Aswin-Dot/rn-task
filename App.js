import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
  Roboto_900Black,
} from "@expo-google-fonts/roboto";

import RootComponent from "./RootComponent";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "https://tigra-5mgmi.ondigitalocean.app/graphql",
  cache: new InMemoryCache(),
});

export default function App() {

  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    Roboto_900Black,
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <ApolloProvider client={client}>
        <SafeAreaProvider>
         <RootComponent/>
        </SafeAreaProvider>
      </ApolloProvider>
    );
  }
}