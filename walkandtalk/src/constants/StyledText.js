import React from "react";
import { Text, TextInput, Platform } from "react-native";

class StyledText extends React.Component {
  render() {
    if (Platform.OS === "android") {
      return (
        <Text
          {...this.props}
          style={[
            {
              fontFamily: "proxima_nova_reg",
              fontSize: 15,
              fontWeight: "normal",
              color: "grey"
            },
            this.props.style
          ]}
        />
      );
    } else if (Platform.OS === "ios") {
      return (
        <Text
          {...this.props}
          style={[
            {
              fontFamily: "Proxima Nova",
              fontSize: 15,
              fontWeight: "normal",
              color: "grey"
            },
            this.props.style
          ]}
        />
      );
    }
  }
}

class StyledTextInput extends React.Component {
  render() {
    if (Platform.OS === "android") {
      return (
        <TextInput
          {...this.props}
          style={[
            {
              fontFamily: "proxima_nova_reg",
              fontSize: 15
            },
            this.props.style
          ]}
        />
      );
    } else if (Platform.OS === "ios") {
      return (
        <TextInput
          {...this.props}
          style={[
            {
              fontFamily: "Proxima Nova",
              fontSize: 15
            },
            this.props.style
          ]}
        />
      );
    }
  }
}

export { StyledText, StyledTextInput };
