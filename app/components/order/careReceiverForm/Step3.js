import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from "react-native-paper";

/**
 * Delivery method
 * @returns 
 */

const Step3 = ({onNext, onPrevious}) => {
  return (
    <View>
      <Text>Step3</Text>
      <Button onPress={onNext}>Next</Button>
      <Button onPress={onPrevious}>Previous</Button>
    </View>
  )
}

export default Step3

const styles = StyleSheet.create({})