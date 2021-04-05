import * as React from 'react';
import { View } from 'react-native';
import UserService from '../../services/UserService';
import TextBox from '../../components/atoms/TextBox';
import PasswordBox from '../../components/atoms/PasswordBox';
import AppButton from '../../components/atoms/AppButton';
import OnboardingTempate from '../../components/templates/OnboardingTemplate';

export default function LoginPage({ navigation }) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loadingData, setLoadingData] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const LoginForm = <View>
        <TextBox initialTextValue={email} onTextChangedCallBack={setEmail}
            placeholder='Email'
            isTextInputValid={email.length > 0}
            invalidTextInputErrorMessage='Email address not valid' />
        <PasswordBox onPasswordChangedCallBack={setPassword} />
    </View>;

    const goToSignUp = () => {
        navigation.replace('SignUp');
    }

    const isLoginButtonDisabled = () => {
        return !Boolean(email.trim()) ||
            !Boolean(password.trim());
    };

    const onLoginButtonClicked = () => {
        setErrorMessage('');
        setLoadingData(true);
        UserService.login({ email, password }, () => {
            setLoadingData(false);
            navigation.replace('RecoverDevice');
        }, (error) => {
            setLoadingData(false);
            setErrorMessage(error);
        });
    };

    return <OnboardingTempate title={'Login'}
        form={LoginForm}
        alternateActions={[{ title: 'Sign up', action: goToSignUp }]}
        errorMessage={errorMessage}
        onErrorAlertClosed={() => setErrorMessage('')}
        submitButton={<AppButton text='Login'
            isLoading={loadingData}
            isDisabled={isLoginButtonDisabled()}
            onClicked={onLoginButtonClicked} />}
    />;

}