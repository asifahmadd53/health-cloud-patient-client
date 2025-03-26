import { StyleSheet, Text, View, Image,Dimensions } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const CustomInput = ({ placeholder, icon, value, onChange }) => {
 
  const {width,height} = Dimensions.get('window')
  
  const isTablet = width > 768;

  return (
    <TextInput
    
      onChangeText={onChange}
      keyboardAppearance="dark"
      placeholder={placeholder}
      value={value}
      mode="outlined"
      outlineColor="rgb(148 163 184)"
      left={<TextInput.Icon icon={() => <Image source={icon} style={{ width:isTablet ? 28 : 20, height : isTablet?28 :20 }} />} />}
      activeOutlineColor={"#a5a5a5"}
      placeholderTextColor={'#393d3f'}
      style={{ backgroundColor: "white", height:isTablet ? 70 : 55 , fontSize: isTablet ? 20 : 16}}
      // cursorColor='black'
      
      theme={{
        roundness:12,
        colors: {
          primary: "black", // ✅ Forces indicator (caret) to stay black
          text: "black", // Ensures the input text is black
        },
      }}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({})
