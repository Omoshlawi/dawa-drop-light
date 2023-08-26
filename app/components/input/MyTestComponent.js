import React, { useState } from "react";
import { View, Button } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const MyTestComponent = () => {
  const [dateTime, setDateTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowPicker(false);
    setDateTime(currentDate);
  };

  return (
    <View>
      <Button
        title="Open Date & Time Picker"
        onPress={() => setShowPicker(true)}
      />
      {showPicker && (
        <DateTimePicker
          value={dateTime}
          mode="datetime" // Use "datetime" to allow selecting both date and time
          is24Hour={true}
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

export default MyTestComponent;
