import React from 'react';
import { Text, TextInput } from 'react-native';

class StyledText extends React.Component {
  render() {
    return (
      <Text {...this.props}
        style={[{
          fontFamily: 'proxima_nova_reg',
          fontSize: 15,
          color: 'grey'
        },
        this.props.style
        ]}
      />
    );
  }
}

class StyledTextInput extends React.Component {
  render() {
    return (
      <TextInput {...this.props}
        style={[{
          fontFamily: 'proxima_nova_reg',
          fontSize: 15
        },
        this.props.style
        ]}
      />
    );
  }
}

export { StyledText, StyledTextInput };
