import React from "react";
import {
  gql,
  useMutation,
} from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";

const setionList = [
  {
    id: "1",
    headerTitle: "Tenant",
    image: require("./assets/images/avatar.png"),
    title: "Darrel Steward",
  },
  {
    id: "2",
    headerTitle: "Building",
    image: require("./assets/images/img1.png"),
    title: "89 Great Street Shelbyville",
  },
  {
    id: "3",
    headerTitle: "Unit",
    image: require("./assets/images/img2.png"),
    title: "7H",
  },
];

const RootComponent = () => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Login mutation
  const LOGIN_MUTATION = gql`
    mutation Login($email: String!, $password: String!) {
      tokenAuth(email: $email, password: $password) {
        token
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: email,
      password: password,
    },
    onCompleted: ({ data }) => {
      console.log(data.tokenAuth);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // Render component
  const SectionComponent = ({ item }) => {
    return (
      <View
        style={{
          padding: 15,
          backgroundColor: "#fff",
          marginTop: 25,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontFamily: "Roboto_700Bold", fontSize: 20 }}>
            {item.headerTitle}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#E8F2F1",
              padding: 15,
              borderRadius: 10,
            }}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={{
                fontFamily: "Roboto_700Bold",
                fontSize: 16,
                color: "#24554E",
              }}
            >
              View all Transactions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image source={item.image} style={{ height: 50, width: 50 }} />

          <Text
            style={{
              fontFamily: "Roboto_400Regular",
              fontSize: 18,
              marginLeft: 10,
            }}
          >
            {item.title}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#E5E5E5" }}>
      <StatusBar style="auto" />
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          height: 50,
          paddingHorizontal: 15,
          zIndex: 999,
        }}
      >
        <TouchableOpacity onPress={() => console.log("back")}>
          <Feather name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log("upload")}>
          <Feather name="upload" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          flex: 1,
          overflow: "visible",
          paddingBottom: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Bank Account */}
        <View
          style={{
            backgroundColor: "#fff",
            paddingTop: 30,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            padding: 20,
          }}
        >
          {/* Profile Pic */}
          <View
            style={{
              position: "absolute",
              top: -35,
              alignSelf: "center",
            }}
          >
            <Image
              source={require("./assets/images/avatar.png")}
              style={{ height: 75, width: 75 }}
              resizeMode="cover"
            />
          </View>

          {/* Name */}
          <Text
            style={{
              marginTop: 15,
              fontFamily: "Roboto_400Regular",
              fontSize: 15,
              lineHeight: 30,
              alignSelf: "center",
            }}
          >
            From: Darrell Steward
          </Text>

          {/* Button */}
          <View
            style={{
              marginHorizontal: 15,
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{ height: 2, width: 70, backgroundColor: "#E7E9E9" }}
            />
            <Button
              TouchableComponent={TouchableOpacity}
              icon={
                <Image
                  source={require("./assets/images/suitcase-Icon.png")}
                  style={{ height: 25, width: 25, marginRight: 10 }}
                  resizeMode="cover"
                />
              }
              buttonStyle={{
                borderWidth: 0,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#36796F",
                borderColor: "#36796F",
              }}
              containerStyle={{
                marginHorizontal: 25,
                borderColor: "#36796F",
              }}
              title="Bank Account"
              titleStyle={{ fontFamily: "Roboto_700Bold", fontSize: 15 }}
              onPress={() => console.log("Bank Account")}
            />
            <View
              style={{ height: 2, width: 70, backgroundColor: "#E7E9E9" }}
            />
          </View>

          {/* Date */}
          <Text
            style={{
              marginTop: 10,
              fontFamily: "Roboto_400Regular",
              fontSize: 15,
              lineHeight: 30,
              alignSelf: "center",
            }}
          >
            11 Aug 2018
          </Text>

          {/* Amount */}
          <Text
            style={{
              marginTop: 15,
              fontFamily: "Roboto_700Bold",
              fontSize: 45,
              alignSelf: "center",
            }}
          >
            $14,312
          </Text>
        </View>

        {/* Sections */}
        {setionList.map((item, index) => (
          <SectionComponent item={item} key={index} />
        ))}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Login</Text>

            <Input
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              onChangeText={(value) => setEmail(value)}
            />
            <Input
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={login}
              >
                <Text style={styles.textStyle}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    margin: 15,
    marginTop: 22,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#36796F",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default RootComponent;