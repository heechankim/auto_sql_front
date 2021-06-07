import React, {useEffect} from 'react'

// components
import GoogleLoginButton from "./GoogleLoginButton";
import AccountView from './AccountView'

// for redux
import {Store} from 'Store'
import {connect} from 'react-redux'
import {onGoogleLogin} from "Store/User";

// functions

const Account = (props) => {

    // state from landing index.js
    //const [isLogin, setIsLogin] = useState(false)
    
    const isLogin = props.isLogin
    const setIsLogin = props.setIsLogin

    useEffect(() => {
        if (Store.getState().User.id) {
            setIsLogin(true)
        }

    }, [isLogin]);

    // props
    const {onLogin} = props

    return (
        <div>
            {
                isLogin
                    ?
                    <AccountView {...props} />
                    :
                    <GoogleLoginButton
                        onLogin={onLogin}
                        isLogin={setIsLogin}
                    />
            }
        </div>
    );
}
// export default with redux connect
const mapToDispatch = (dispatch) => ({
    onLogin: (action) => dispatch(onGoogleLogin(action))
});
export default connect(null,  mapToDispatch)(Account);