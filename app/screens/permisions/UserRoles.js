import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { SafeArea } from "../../components/layout";
import { SearchHeader } from "../../components/input";
import { useAuthorize } from "../../api";
import { FlatList } from "react-native";
import { Avatar, Card, useTheme, Text } from "react-native-paper";
import { getImageUrl } from "../../utils/helpers";
import routes from "../../navigation/routes";
import { useFocusEffect } from "@react-navigation/native";

const UserRoles = ({ navigation, route }) => {
  const { getUsers, getRoles } = useAuthorize();
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState({ search: "" });
  const [loading, setLoading] = useState(false);

  const handFetch = async () => {
    setLoading(true);
    const response = await getUsers(search);
    const rResponse = await getRoles();
    setLoading(false);
    if (response.ok) {
      setUsers(response.data.results);
    }
    if (rResponse.ok) {
      setRoles(rResponse.data.results);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setUsers([]);
    }, [])
  );
  const { colors } = useTheme();
  return (
    <SafeArea>
      <SearchHeader
        placeholder="Search user..."
        onTextChange={(value) => setSearch({ ...search, search: value })}
        onSearch={handFetch}
      />
      <Text variant="titleSmall" style={{ padding: 10 }}>
        Search Results
      </Text>
      <FlatList
        data={users}
        refreshing={loading}
        onRefresh={handFetch}
        keyExtractor={(user) => user._id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const {
            _id,
            firstName,
            lastName,
            username,
            roles: userRoles,
            email,
            phoneNumber,
            image,
          } = item;
          const fullName = firstName ? `(${firstName} ${lastName})` : "";
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(routes.PERMISIONS_NAVIGATION, {
                  screen: routes.PERMISIONS_USER_ROLES_ASSIGNMENT_SCREEN,
                  params: { user: item, roles },
                });
              }}
            >
              <Card.Title
                style={{ backgroundColor: colors.surface, marginBottom: 5 }}
                title={`${username}${fullName}`}
                subtitle={`${email} | ${phoneNumber}`}
                subtitleStyle={{ color: colors.disabled }}
                left={(props) =>
                  image ? (
                    <Avatar.Image
                      {...props}
                      source={{ uri: getImageUrl(image) }}
                    />
                  ) : (
                    <Avatar.Icon {...props} icon="account" />
                  )
                }
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeArea>
  );
};

export default UserRoles;

const styles = StyleSheet.create({});
