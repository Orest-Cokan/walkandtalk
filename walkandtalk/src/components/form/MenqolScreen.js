import React, { Component } from "react";
import { Image, WebView} from "react-native";
//import { WebView } from "react-native-webview";
import {
    Container,
    Header,
    Left,
    Body,
    Title,
    Right,
    Button,
  } from "native-base";
  import ScreenStyleSheet from "../../constants/ScreenStyleSheet";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";


class MenqolScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //gives warning when initial url is null
            url: "https://www.google.ca/",
            instance: 1,
        }
    }
    onBack = () => {
        // Navigate back to form page
        Actions.pop();
    };
    

    /*
    this funtion gets instance number from redcap, then update the survey link by calling getSurveyLink
    */
    setSurveyLink = () =>{
        //get instance number 
        const instanceData = "token=8038CE0F65642ECC477913BE85991380"
            + "&content=record"
            + "&format=json"
            + "&type=flat"
            + "&records[0]=" + this.props.user.user.id.toString() //to be changed to user redcap id
            + "&forms[0]=menqol"
            + "&returnFormat=json";

        fetch('https://med-rcdev.med.ualberta.ca/api/',{
            mode: "cors",
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
                body:instanceData,
        })
        .then((response) => {
            return response.json()
        })
        .then((body)=> {
            var lastInstanceStatus ;
            //status code, 0: imcomplete, 1: unverified, 2: complete
            lastInstanceStatus = body[body.length-1].menqol_complete;
            if (lastInstanceStatus == "2"){
                //callback gets survey link after this.state.instance is updated 
                this.setState({instance: parseInt(body.length,10 ) + 1}, () =>{
                    this.getSurveyLink()
                });
            } 
            else{
                //callback gets survey link after this.state.instance is updated 
                this.setState({instance: parseInt(body.length,10 ) }, () =>{
                    this.getSurveyLink()
                });
            }
            
        })
        .catch((error) => {
          console.log(error);
        });
    }

    getSurveyLink = () => {
        const linkData =
            "token=8038CE0F65642ECC477913BE85991380"
            + "&content=surveyLink"
            + "&format=json"
            + "&instrument=menqol"
            + "&event="
            + "&record=" + this.props.user.user.id.toString()  //to be changed to user record id 
            + "&repeat_instance=" + this.state.instance.toString() //to be changed to user menqol instance num 
            + "&returnFormat=json";
        
        fetch('https://med-rcdev.med.ualberta.ca/api/',{
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body:linkData,
        })
        .then((response) => {
            return response.text()
        })
        .then((responseText) => {
            this.setState({url: responseText});
        })
        .catch((error) => {
          console.log(error);
        });
    }


    async componentWillMount() {
        await this.setSurveyLink();
    };

    render(){
        return (
            <Container>
                {/* Header */}
                <Header
                    style={ScreenStyleSheet.header}
                    androidStatusBarColor={"white"}
                    iosBarStyle={"dark-content"}
                >
                <Left style={ScreenStyleSheet.headerSides}>
                    <Button transparent onPress={this.onBack}>
                    <Image
                        style={ScreenStyleSheet.backIcon}
                        source={require("../../assets/icons/back-button.png")}
                    />
                    </Button>
                </Left>
                <Body style={ScreenStyleSheet.headerBody}>
                    <Title style={ScreenStyleSheet.headerTitle}>MENQOL</Title>
                </Body>
                <Right style={ScreenStyleSheet.headerSides} />
                </Header>
                <WebView source={{uri: this.state.url}} />
               
            </Container>

        );
    }
    
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  null
)(MenqolScreen);
