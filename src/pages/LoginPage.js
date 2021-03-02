import * as React from 'react';
import { View } from 'react-native';
import UserService from '../services/UserService';
import TextBox from '../components/atoms/TextBox';
import PasswordBox from '../components/atoms/PasswordBox';
import AppButton from '../components/atoms/AppButton';
import OnboardingTempate from '../components/templates/OnboardingTemplate';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const LoginForm = <View>
        <TextBox initialTextValue={email} onTextChangedCallBack={setEmail}
            placeholder='Email'
            isTextInputValid={email.length > 0}
            invalidTextInputErrorMessage='Email address not valid' />
        <PasswordBox onPasswordChangedCallBack={setPassword} />
    </View>;

    const goToSignUp = () => {
        navigation.navigate('SignUp');
    }

    const isLoginButtonDisabled = () => {
        return !Boolean(email.trim()) ||
            !Boolean(password.trim());
    };

    const onLoginButtonClicked = () => {
        UserService.login({ email, password }, () => {
            setEmail('');
            setPassword('');
            navigation.navigate('RegisterDevice');
        }, (errorMessage) => {
            console.log(errorMessage);
        });
    };

    return <OnboardingTempate title={'Login'}
        form={LoginForm}
        alternateAction={{ title: 'Sign up', action: goToSignUp }}
        submitButton={<AppButton text='Login'
            isDisabled={isLoginButtonDisabled()}
            onClicked={onLoginButtonClicked} />}
    />;

}