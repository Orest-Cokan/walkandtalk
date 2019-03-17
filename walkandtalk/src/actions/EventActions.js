import { SET_EVENTS, EVENT_CREATE, EVENT_DELETE } from "./types";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import {Platform} from 'react-native';

// action to fetch all events
export const fetchEvents = () => {
  return dispatch => {
    var ip = getIP();
    var url = ip +"public/walkingevents";
    axios
      .get(url)
      .then(res => {
        dispatch({ type: SET_EVENTS, payload: res.data.events });
      })
      .catch(err => {
        console.log(err);
      });
  };
};

// action to create an event
export const createEvent = (
  organizer,
  title,
  date,
  start_time,
  end_time,
  description,
  intensity,
  venue,
  location,
  lat,
  long
) => {
  return dispatch => {
    var ip = getIP();
    var url = ip +"public/walkingevent";
    const walking_event = {
      organizer: organizer,
      title: title,
      date: date,
      start_time: start_time,
      end_time: end_time,
      description: description,
      intensity: intensity,
      venue: venue,
      location: {
        streetName: location,
        lat: lat,
        long: long
      }
    };
    axios
      .post(url, walking_event)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this even logged???");
          console.log(walking_event, "is this null?");
          dispatch({ type: EVENT_CREATE });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};

// action to delete an event from current events
export const deleteEvent = id => {
  return dispatch => {
    var ip = getIP();
    var url = ip +"public/walkingevent/";
    axios
      .delete(url + id)
      .then(res => {
        console.log(res.data);
        dispatch({ type: EVENT_DELETE, payload: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  };
};



// action to create a past event
export const createPastEvent = (
  organizer,
  title,
  date,
  start_time,
  end_time,
  description,
  intensity,
  venue,
  location,
  lat,
  long
) => {
  return dispatch => {
    var ip = getIP();
    var url = ip +"public/pastevent";
    const past_event = {
     id: id;
     organizer: organizer,
     title: title,
     description: description,
     date: date,
     start_time: start_time,
     end_time: end_time,
     location: location,
     attendees: attendees,
     duration: duration,
     distance: distance,
     intensity: intensity,
     venue: venue,
     walk_rating: walk_rating,
     walk_rating_comment: walk_rating_comment,
     location_rating: location_rating,
     location_rating_comment: location_rating_comment,
    };
    axios
      .post(url, past_event)
      .then(res => {
        if (res.status === 200) {
          console.log(res.status, "is this even logged???");
          console.log(walking_event, "is this null?");
          dispatch({ type: PAST_EVENT_CREATE });
          Actions.reset("app");
        }
      })
      .catch(err => {
        console.log(err, "kek");
      });
  };
};


var getIP = ()=>{
  if (Platform.OS === 'android') {
    return "http://10.0.2.2:2017/";
  }
  else if(Platform.OS === 'ios'){
    return "http://127.0.0.1:2017/";
  }
}

