import React from "react";
import ReactDom from 'react-dom';
import App from './components/App/App';
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createAPI} from "./components/api/api";
import {requiredAutorization} from "./components/store/action";
import {AutorizationStatus} from "./components/const";
import rootReducer from "./components/store/root-reducer";
import CheckAutch from "./components/checkAutch/check-autch";


const api = createAPI(
    () => store.dispatch(requiredAutorization(AutorizationStatus.NO_AUTH))
);

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);


ReactDom.render(
    <Provider store={store}>
      <CheckAutch>
        <App/>,
      </CheckAutch>
    </Provider>,
    document.getElementById(`root`)
);


export default App;
