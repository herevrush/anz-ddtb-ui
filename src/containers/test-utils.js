import { render as rtlRender } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import { reducer as formReducer } from 'redux-form'
import accountReducer from '../store/reducers/Account'
import transactionsReducer from '../store/reducers/Transactions'
// Import your own reducer
import userReducer from '../store/reducers/User'
import thunk from 'redux-thunk'
const rootReducer = combineReducers({
    u: userReducer,
    a: accountReducer,
    t: transactionsReducer,
    form: formReducer,
});

function render(

    ui,
    {
        initialState,
        store = createStore(rootReducer, initialState, compose(
            applyMiddleware(thunk)
        )),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
