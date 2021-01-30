import * as React from 'react';
import { View } from 'react-native';
import { login } from '../services/OnboardingService';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';

export default function LoginPage({ route }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onLoginButtonClicked = () => {
        login({ email, password }, () => {
            setEmail('');
            setPassword('');
        }, (errorMessage) => {
            console.log(errorMessage);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <TextBox initialTextValue={email} onTextChangedCallBack={setEmail}
                placeholder='Email' isTextInputValid={email.length > 0}
                invalidTextInputErrorMessage='Email address not valid' />
            <PasswordBox onPasswordChangedCallBack={setPassword} />
            <Button text='Login' isDisabled={false} onClicked={onLoginButtonClicked} />
        </View>
    )
}