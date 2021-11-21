import "../styles/index.scss";
import "../styles/globals.scss";
import App from "next/app";

import {Provider} from "react-redux";
import store from "../store/store";

import {createWrapper} from 'next-redux-wrapper';

// function MyApp({ Component, pageProps }) {
//     return <Component {...pageProps} />
// }
//
//
//
// export default MyApp

class MyApp extends App {
    render() {
        const { Component,pageProps} = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps}/>
        </Provider>
    );
    }
}


const makeStore = () => store;

const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);