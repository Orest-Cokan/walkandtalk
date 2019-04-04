import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import AuthScreen from '../src/components/login/AuthScreen';
import React from 'react';
import GenerateForm from "react-native-form-builder";
import {
  Container,
  Header,
  Content,
} from "native-base";

configure({ adapter: new Adapter() });

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const state = {
  email: "User 1",
  password: "p",
};

describe('Testing AuthScreen', () => {
  it('should render form', () => {
    const wrapper = shallow(<AuthScreen />);
    expect(wrapper.findWhere(node => node.prop('testID') === 'container')).toBeTruthy();
  });

});
