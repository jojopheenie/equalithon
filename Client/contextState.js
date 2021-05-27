import React, { useReducer } from 'react';
import Context from './authentication/context';
import * as ACTIONS from './store/actions/actions';
import * as AuthReducer from './store/reducers/auth_reducer';

import Routes from './routes';

import Auth from './authentication/auth';

const auth = new Auth()


const ContextState = (props) => {

    /*
      Auth Reducer
    */
    const [stateAuthReducer, dispatchAuthReducer] = useReducer(AuthReducer.AuthReducer,
                                                               AuthReducer.initialState)


    const handleLogin = () => {
      dispatchAuthReducer(ACTIONS.login_success())
    }

    const handleLogout = () => {
      dispatchAuthReducer(ACTIONS.login_failure())
    }


    const handleDBProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.set_db_profile(profile))
    }

    const handleRemoveDBProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_db_profile())
    }

    const handleAddProfile = (profile) => {
      dispatchAuthReducer(ACTIONS.add_profile(profile))
    }

    const handleRemoveProfile = () => {
      dispatchAuthReducer(ACTIONS.remove_profile())
    }

    //Handle authentication from callback
    const handleAuthentication = (props) => {
      if(props.location.hash) {
        auth.handleAuth()
      }
    }


    return(
      <div>
      <Context.Provider
          value={{
            //Auth Reducer
            //keep for global state
            authState: stateAuthReducer.is_authenticated,
            dbProfileState: stateAuthReducer.db_profile,
            profileState:  stateAuthReducer.profile,

            handleAddDBProfile: (profile) => handleDBProfile(profile),
            handleRemoveDBProfile: () => handleRemoveDBProfile(),
            handleUserAddProfile: (profile) => handleAddProfile(profile),
            handleUserRemoveProfile: () => handleRemoveProfile(),
            handleUserLogin: () => handleLogin(),
            handleUserLogout: () => handleLogout(),

            //Handle auth
            //keep for global state
            handleAuth: (props) => handleAuthentication(props),
            authObj: auth
          }}>
          <Routes />
      </Context.Provider>
      </div>
    )
}


export default ContextState;
