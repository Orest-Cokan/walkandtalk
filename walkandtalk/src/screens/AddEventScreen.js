import React, { Component } from 'react';
import { AppRegistry, StyleSheet, View, Text, Button } from 'react-native';
import GenerateForm from 'react-native-form-builder';
import { Container, Header, Title, Content,  Body, Left, Right } from 'native-base';
import startMainTabs from "../components/navigation/MainTabNavigator";


const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    margin: 0,

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    width: '45%',
    height: 30,
    margin: 30,
  }
});

const fields = [
  {
    type: 'text',
    name: 'event_name',
    required: true,
    label: 'Event name',
    props: {
      style: {
        height:40
      }
    }
  },
  {
      type: 'date',
      mode: 'date',
      name: 'Date',
      required: true,
      minDate: new Date(),
      label: 'Date',
      placeholder: "Select date"
    },
    {
      type: 'date',
      mode: 'time',
      name: 'Start time',
      required: true,
      label: 'Start time',
    },
    {
      type: 'date',
      mode: 'time',
      name: 'End time',
      required: true,
      label: 'End time',
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      required: false,
      props: {
        multiline: true,
        numberOfLines: 5,
        maxLength: 140,
        style: {
          borderWidth: 1,
          textAlignVertical: 'top',
          borderColor: '#D9D5DC',
          marginTop: 20
        }
      }
    },

    {
      type: 'picker',
      name: 'intensity',
      mode: 'dropdown',
      label: 'Intensity',
      defaultValue: 'Slow',
      required: true,
      options: ['Slow', 'Intermediate', 'Brisk'],
      props: {
        style: {
          width: 160
        }
      }
    },
    {
      type: 'picker',
      name: 'type_of_venue',
      required: false,
      mode: 'dropdown',
      label: 'Type of venue',
      defaultValue: 'Indoor',
      options: ['Indoor', 'Outdoor'],
    },
    {
      type: 'text',
      name: 'location',
      required: true,
      label: 'Location',
    },

];
export default class FormGenerator extends Component {
  next() {
    const formValues = this.formGenerator.getValues();
    console.log('FORM VALUES', formValues);

    startMainTabs();

  }

  cancel() {
    startMainTabs();

  }
  render() {
    return (
    <Container>
      <Header style={{ backgroundColor: '#8262C6' }}>
        <Left style={{flex: 1}}></Left>
        <Body style={{flex: 1, alignItems:'center'}}>
          <Title>Create Event</Title>
        </Body>
        <Right style={{flex: 1}}></Right>
      </Header>

      <Content>
        <GenerateForm
          ref={(c) => {
            this.formGenerator = c;
          }}
          fields={fields}
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              onPress={() => this.next()}
              title="Cancel"
              color="#9B9B9B"
            >
            </Button>
          </View>
          <View style={styles.button}>
            <Button
              onPress={() => this.next()}
              title="Finish"
              color='#8262C6'
            >
            </Button>
          </View>
        </View>
      </Content>
    </Container>
    );
  }
}

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);