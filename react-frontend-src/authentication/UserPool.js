import {CognitoUserPool} from 'amazon-cognito-identity-js';
//npm install --save amazon-cognito-identity-js

const poolData = {
    UserPoolId: 'us-east-1_X5TZZybnO',
    ClientId: '6rrjn3860j2sdk2p5mptnqbja2'
};

export default new CognitoUserPool(poolData);