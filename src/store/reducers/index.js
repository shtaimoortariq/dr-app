import { combineReducers } from "redux";
import auth from './auth';
import health from './health';
import history from './history';
import patient from './patient';
import enroll from './enroll';
import user from './user';

export default combineReducers({
    auth,
    health,
    history,
    patient,
    enroll,
    user
});