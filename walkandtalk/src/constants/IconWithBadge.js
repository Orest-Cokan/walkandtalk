import React, { Component } from 'react';
import { View, Text } from 'react-native';
//import Socket from "./Socket";

class IconWithBadge extends Component{
  constructor(props) {
    super(props);

    /*
    this.state = {
        counter: 0
    }
    Socket.on('total_unread_notifications', (total) => {
      this.setState({ counter: total });
    }); */

  }

  showBadge() {
      if (this.props.total_unread > 0) {
          return (
            <Text style={{
                fontSize: 10,
                color:'#fff',
                position:'absolute',
                zIndex: 10,
                top: 1,
                right: 1,
                padding: 1,
                backgroundColor:'red',
                borderRadius: 5
              }}> {this.props.total_unread} </Text>
          )
      } else {
          return null;
      }
  }

  render(){
    return (
        <View style={{
            position: 'relative',
            padding: 5,
          }}>
           {this.showBadge()}
           {this.props.icon}
          </View>
    );
  }
}

export default IconWithBadge;
