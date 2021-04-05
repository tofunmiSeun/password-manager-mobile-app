import * as React from 'react';
import { View } from 'react-native';
import UserService from '../../services/UserService';
import TextBox from '../../components/atoms/TextBox';
import PasswordBox from '../../components/atoms/PasswordBox';
import AppButton from '../../components/atoms/AppButton';
import OnboardingTempate from '../../components/templates/OnboardingTemplate';

export default function SignUpPage({ navigation }) {

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loadingData, setLoadingData] = React.useState(false);

    const SignUpForm = <View>
        <TextBox initialTextValue={name} onTextChangedCallBack={setName}
            placeholder='Name' isTextInputValid={name.trim().length > 0}
            invalidTextInputErrorMessage='Name is required' />
        <TextBox initialTextValue={email} onTextChangedCallBack={setEmail}
            placeholder='Email' isTextInputValid={email.trim().length > 0}
            invalidTextInputErrorMessage='Email address not valid' />
        <PasswordBox onPasswordChangedCallBack={setPassword} />
    </View>;

    const goToLogin = () => {
        navigation.replace('Login');
    }

    const isSignUpButtonDisabled = () => {
        return !Boolean(name.trim()) ||
            !Boolean(email.trim()) ||
            password.trim().length < 8
    };

    const onSignUpButtonClicked = () => {
        setLoadingData(true);
        UserService.signUp({ name, email, password }, () => {
            setLoadingData(false);
            navigation.replace('SignUp');
        }, (errorMessage) => {
            setLoadingData(false);
            console.log(errorMessage);
        });
    };

    return <OnboardingTempate title='Sign Up'
        form={SignUpForm}
        alternateActions={[{ title: 'Login', action: goToLogin }]}
        submitButton={<AppButton text='Sign Up'
            isLoading={loadingData}
            isDisabled={isSignUpButtonDisabled()}
            onClicked={onSignUpButtonClicked} />}
    />;
}