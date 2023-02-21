import React, { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UseUserAuth';

const Prevent = ({children}) => {
    var navigate = useNavigate();
    var {user, loading, visited} = useUserAuth();


    useEffect(() => {
      console.log(loading, user);
      if(visited){
        if(!user?.username && !loading){
                navigate('/login');
        }
      }else{
        navigate('/story');
      }
    }, [user, loading]);

    return (
    <>
      {user ? (<>{children}</>):(<div style={{fontSize:'1.8rem', color:'white', background:'#0A0A12', display: 'flex', flexDirection: 'column'}}><p>Not Logged in!</p><p>Redirecting to Login Page...</p></div>)}
    </>
  )
}

export default Prevent
