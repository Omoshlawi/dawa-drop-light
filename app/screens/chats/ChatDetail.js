import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useChat, useUser } from "../../api";
import ChatBuble from "../../components/ChatBuble";
import { getImageUrl } from "../../utils/helpers";

const ChatDetail = ({ navigation, route }) => {
  const { event } = route.params;
  const { getEventChats } = useChat();
  const [charts, setCharts] = useState([]);
  const { getUserId } = useUser();
  const userId = getUserId();
  const handleFetch = async () => {
    const response = await getEventChats(event._id);
    if (response.ok) {
      setCharts(response.data.results);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <View style={styles.screen}>
      <FlatList
        keyExtractor={(item) => item._id}
        data={charts}
        renderItem={({ item }) => {
          const { message, messageType, createdAt, sender: _sender } = item;
          const isImage = messageType === "image";
          const sender = _sender[0];
          return (
            <ChatBuble
              isImage={isImage}
              message={isImage ? getImageUrl(message) : message}
              createdAt={createdAt}
              isSender={sender._id === userId}
              sender={sender.username}
            />
          );
        }}
      />
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
