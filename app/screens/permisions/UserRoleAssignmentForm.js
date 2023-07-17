import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { SafeArea } from "../../components/layout";
import { Avatar, List, Text } from "react-native-paper";
import { getImageUrl } from "../../utils/helpers";
import { screenWidth } from "../../utils/contants";

const UserRoleAssignmentForm = ({ navigation, route }) => {
  const {
    user: {
      image,
      username,
      email,
      phoneNumber,
      firstName,
      lastName,
      _id: UserId,
    },
    roles,
  } = route.params;
  const fullName = firstName ? `(${firstName} ${lastName})` : "";
  return (
    <SafeArea style={styles.screen}>
      {image ? (
        <Avatar.Image
          source={{ uri: getImageUrl(image) }}
          size={screenWidth * 0.25}
        />
      ) : (
        <Avatar.Icon icon="user" />
      )}
      <View>
        <Text style={styles.text}>{`${username}${fullName}`}</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={styles.text}>{phoneNumber}</Text>
      </View>
      <FlatList
        data={roles}
        keyExtractor={({ _id }) => _id}
        renderIte={({ item }) => {
          const { name, description, privileges } = item;
          console.log(item);
          return <List.Item title={name} />;
        }}
      />
    </SafeArea>
  );
};

export default UserRoleAssignmentForm;

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
  },
  text: {
    textAlign: "center",
  },
});
