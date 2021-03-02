import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

export default function OnboardingTempate({ title, form, submitButton, alternateActions }) {
    return (<KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}>
        <Text style={{ alignSelf: 'center', fontSize: 18 }}>CredVault</Text>
        <Text style={styles.pageTitle}>{title}</Text>
        {form}
        {alternateActions && <View style={styles.alternateLinksGrid}>
            {alternateActions.map(action => {
                return <TouchableOpacity key={action.title} style={styles.alternateLink}
                    onPress={action.action}>
                    <Text>{action.title}</Text>
                </TouchableOpacity>;
            })}
        </View>}
        <View style={styles.actionButton}>{submitButton}</View>
    </KeyboardAvoidingView>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff'
    },
    pageTitle: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 24,
        fontWeight: 'bold'
    },
    alternateLinksGrid: {
        alignSelf: 'flex-end',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row'
    },
    alternateLink: {
        marginLeft: 8
    },
    actionButton: {
        marginTop: 'auto'
    },
});