import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';

export default function OnboardingTempate({ title, form, alternateAction, submitButton }) {
    return (<View style={styles.container}>
        <Text style={{ alignSelf: 'center', fontSize: 18 }}>CredVault</Text>
        <Text style={styles.pageTitle}>{title}</Text>
        {form}
        {alternateAction && <TouchableOpacity style={styles.alternateLink}
            onPress={alternateAction.action}>
            <Text>{alternateAction.title}</Text>
        </TouchableOpacity>}
        <View style={styles.actionButton}>{submitButton}</View>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    pageTitle: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 24,
        fontWeight: 'bold'
    },
    alternateLink: {
        alignSelf: 'flex-end',
        marginTop: 8
    },
    actionButton: {
        marginTop: 'auto'
    },
});