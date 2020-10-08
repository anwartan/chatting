import React, { FunctionComponent } from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { fonts } from "../../../utils/fonts";
type CustomProps ={
  fontType?:'Normal'|"Italic",
  variant?:'100'|'300'|'400'|'500'|'600'|'900',
  styles:StyleProp<TextStyle>,
  ellipsizeMode:'head'|'middle'|'tail'|'clip',
  numberOfLines:Number
}
const index:FunctionComponent<CustomProps> = (props) => (
  <Text numberOfLines={props.numberOfLines} ellipsizeMode={props.ellipsizeMode} style={[{fontFamily:fonts.primary[props.fontType][props.variant]},props.styles]} >{props.children}</Text>
);

index.defaultProps = {
  fontType:'Normal',
  variant:'400'
}


export default index;

const styles = StyleSheet.create({

});
