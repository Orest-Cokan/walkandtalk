import React, { Component } from "react";
import { View, Alert } from "react-native";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";

/* This screen does not render anything,
instead, it checks if the logged in user is researcher or not, 
then go to the corresponding screen depending on the role.*/
export class Dispatch extends Component {
    constructor(props) {
        super(props);
    }

    /* Using listener that checks the role of the user and go the correspoding screen. */
    componentDidMount(){
        this.didFocusListener = this.props.navigation.addListener(
            'didFocus',
            () => {
                if (!this.props.user.user.researcher){
                    Actions.mainFormPage();
                }
                else{
                    Actions.mainRequestPage();
                }
            },
        );
        
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