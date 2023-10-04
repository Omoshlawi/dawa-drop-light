import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useChat, useUser } from "../../api";
import { getImageUrl } from "../../utils/helpers";
import { ChatBottomForm, ChatBuble } from "../../components/chat";

const ChatDetail = ({ navigation, route }) => {
  const { event } = route.params;
  const { getEventChats } = useChat();
  const [charts, setCharts] = useState([]);
  const { getUserId } = useUser();
  const userId = getUserId();
  const [formState, setFormState] = useState({
    messageType: "text",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleFetch = async () => {
    setLoading(true);
    const response = await getEventChats(event._id);
    setLoading(false);
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
        refreshing={loading}
        onRefresh={handleFetch}
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
      <ChatBottomForm message={formState} onMessageChange={setFormState} />
    </View>
  );
};

export default ChatDetail;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
