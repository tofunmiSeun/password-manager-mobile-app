import * as React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function ConfiguredKeyboardAvoidingView({ childView }) {
    return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={50} style={styles.container}>
        {childView}
    </KeyboardAvoidingView>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});