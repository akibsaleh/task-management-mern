import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import auth from '../Firebase/firebase.init';
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState(null);
    
    const handleEmailPassSignin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleEmailPassSignup = async (email, password) => {
        try {
            setLoading(true);
            return createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    };

    const handleGoogleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const handleLogout = () => {
        setUser(null);
        setLoading(true);
        setProfileInfo(null);
        return signOut(auth);
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            if(currentUser.email) {
                setUser(currentUser);
                setLoading(false);
            } else {
                setLoading(true);
            }
        });
        
        return () => {
            unSubscribe();
        }
    }, []);

    const authInfo = {
        user, loading, handleEmailPassSignin, handleEmailPassSignup, handleGoogleSignin, handleLogout, profileInfo, setProfileInfo
    }
    return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;