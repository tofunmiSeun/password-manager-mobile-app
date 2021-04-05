import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { APP_PRIMARY_COLOR } from '../../Utils';
import ConfiguredKeyboardAvoidingView from './ConfiguredKeyboardAvoidingView';
import Alert from '../../components/molecules/Alert';

export default function OnboardingTempate({ title, form, submitButton, alternateActions, errorMessage, onErrorAlertClosed }) {
    return <ConfiguredKeyboardAvoidingView childView={<View style={styles.container}>
        <Text style={{ alignSelf: 'center', fontSize: 18 }}>CredVault</Text>
        <Text style={styles.pageTitle}>{title}</Text>
        <View style={{ flex: 1 }}>
            {form}
            {alternateActions && <View style={styles.alternateLinksGrid}>
                {alternateActions.map(action => {
                    return <TouchableOpacity key={action.title} style={styles.alternateLink}
                        onPress={action.action}>
                        <Text style={styles.alternateLinkText}>{action.title}</Text>
                    </TouchableOpacity>;
                })}
            </View>}
        </View>
        <View style={styles.actionButton}>{submitButton}</View>
        {Boolean(errorMessage) && <Alert message={errorMessage} type='error' onClosed={onErrorAlertClosed} />}
    </View>} />;
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#fff',
        flex: 1
    },
    pageTitle: {
        marginTop: 24,
        marginBottom: 24,
        fontSize: 24,
        fontWeight: 'bold'
    },
    alternateLinksGrid: {
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row'
    },
    alternateLink: {
        marginLeft: 8
    },
    alternateLinkText: {
        color: APP_PRIMARY_COLOR
    },
    actionButton: {
        marginTop: 40
    },
});