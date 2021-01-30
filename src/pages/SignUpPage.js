import * as React from 'react';
import { View } from 'react-native';
import { signUp } from '../services/OnboardingService';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import Button from '../components/atoms/Button';

export default function SignUpPage({ navigation }) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onSignUpButtonClicked = () => {
        signUp({ name, email, password }, () => {
            setName('');
            setEmail('');
            setPassword('');
        }, (errorMessage) => {
            console.log(errorMessage);
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <TextBox initialTextValue={name} onTextChangedCallBack={setName}
                placeholder='Name' isTextInputValid={name.trim().length > 0}
                invalidTextInputErrorMessage='Name is required' />
            <TextBox initialTextValue={email} onTextChangedCallBack={setEmail}
                placeholder='Email' isTextInputValid={email.trim().length > 0}
                invalidTextInputErrorMessage='Email address not valid' />
            <PasswordBox onPasswordChangedCallBack={setPassword} />
            <Button text='Sign Up' isDisabled={false} onClicked={onSignUpButtonClicked} />
        </View>
    )
}