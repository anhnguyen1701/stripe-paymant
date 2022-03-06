import React, { useState, useEffect, Suspense } from 'react';
import firebase from 'firebase/compat/app';
import { auth, db } from './firebase';

export function SignIn() {
  const signIn = async () => {
    const credential = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    const { uid, email } = credential.user;
    db.collection('users').doc(uid).set({ email });
  };

  return <button onClick={signIn}>Sign In with Google</button>;
}

export function Signout(props) {
  return (
    props.user && <button onClick={() => auth.signOut()}>Sign Out User {props.user.uid}</button>
  );
}

export function Customers() {
  return (
    <Suspense fallback={'loading user'}>
      {/* <SaveCard /> */}
    </Suspense>
  );
}
