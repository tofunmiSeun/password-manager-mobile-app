import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';
import { APP_PRIMARY_COLOR } from '../../Utils';

export default function EditVaultRecordButton({ vaultParams }) {
    const navigation = useNavigation();

    return (
        <HeaderButton iconView={<Ionicons name="create-outline" size={24} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { navigation.push('EditVaultRecord', vaultParams) }} />
    );
};
