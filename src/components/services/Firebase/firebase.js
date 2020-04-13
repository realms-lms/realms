import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();
    }

    // Firebase Authentication API calls
    doCreateUserWithEmailAndPassword = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    doSignOut = () => this.auth.signOut();
    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = (password) => this.auth.updatePassword(password);

    // Firebase Firestore API calls
    doAddOrganization = (orgName, airTableAPIKey, airTableBaseId, style, user, callback) => {
        this.db.collection('organizations').add({
            name: orgName,
            airTableAPIConfig: {
                apiKey: airTableAPIKey,
                baseId: airTableBaseId,
            },
            stylesheet: style,
            contacts: [ user, ],
        })
        .then((doc) => {
            callback(doc);
        })
        .catch((err) => {
            console.error(err);
        });
    };

    doGetOrganization = (orgCode, callback) => {
        this.db.collection('organizations').get()
            .then((querySnapshot) => {
                if (querySnapshot.size === 1) {
                    callback(querySnapshot.docs[0].data());
                }
                else {
                    querySnapshot.forEach((doc) => {
                        if (doc.id === orgCode) {
                            callback(doc.data());
                        }
                    });
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    doGetOrganizationCount = (callback) => {
        this.db.collection('organizations').get()
            .then((querySnapshot) => {
                callback(querySnapshot.size);
            })
            .catch((err) => {
                console.error(err);
            });
    }
}

export default Firebase;