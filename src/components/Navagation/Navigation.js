import React from 'react'
import "./Navigation.css"

const Navagation = ({onRouteChange, isSignedIn}) => {
    if (isSignedIn) {
        return (
        
            <nav>
                {/* className="f3 link dim black underline pa3 pointer" */}
                <p onClick={() => onRouteChange('signout')}>
                    Sign Out
                </p>
            </nav>
    
        );
    }
    
    return (
        
        <nav>
            {/* className="f3 link dim black underline pa3 pointer" */}
            <p onClick={() => onRouteChange('signin')}>
                Sign In
            </p>
            <p onClick={() => onRouteChange('register')}>
                Register
            </p>
        </nav>

    );
}

export default Navagation;