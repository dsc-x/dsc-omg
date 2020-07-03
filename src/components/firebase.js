import { firebase } from '@firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: 'XXXXXXXXX_XXXXXXXXXXXXX_XXXXXXXXXXXXXX',
	authDomain: 'xxxxxxxxxxxxx.firebaseapp.com',
	databaseURL: 'https://xxxxxxxxxxxxx.firebaseio.com',
	projectId: 'xxxxxxxxxxxxx',
	storageBucket: 'xxxxxxxxxxxxx.appspot.com',
	messagingSenderId: 'XXXXXXXXXXXXX',
	appId: 'XXXXXXXXXXXXXXXXX',
	measurementId: 'XXXXXXXXXXXXX'
};
firebase.initializeApp(config);
if (typeof window !== 'undefined'){

import('firebase/performance').then(() => firebase.performance());
}
export default firebase;
