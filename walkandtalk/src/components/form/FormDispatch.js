import React, { Component } from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

export class Dispatch extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        if (!this.props.user.user.researcher){
            Actions.mainFormPage();
        }
        else{
            Actions.mainRequestPage();
        }
        
    };

    render() {
        return (
            <View></View>
        )
    }
}

const mapStateToProps = state => state;
  
  
  export default connect(
    mapStateToProps,
    null
  )(Dispatch);