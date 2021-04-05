import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import ConfiguredKeyboardAvoidingView from './ConfiguredKeyboardAvoidingView';
import AppButton from '../atoms/AppButton';

export default function FormTempate({ form, submitButtonTitle, isSubmitButtonDisabled, onSubmitButtonClicked, isSubmittingForm }) {
    return <ConfiguredKeyboardAvoidingView childView={<>
        <View style={styles.formParent}>
            {form}
        </View>
        <View style={styles.actionButton}>
            <AppButton text={submitButtonTitle}
                isDisabled={isSubmitButtonDisabled}
                isLoading={isSubmittingForm}
                onClicked={onSubmitButtonClicked} />
        </View>
    </>} />;
}

const styles = StyleSheet.create({
    formParent: {
        padding: 16,
        backgroundColor: '#fff'
    },
    actionButton: {
        padding: 16,
        marginTop: 'auto'
    },
});