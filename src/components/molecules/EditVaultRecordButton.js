import React from 'react';
import { Feather } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';

export default function EditVaultRecordButton({ vaultParams }) {
    const navigation = useNavigation();

    return (
        <HeaderButton iconView={<Feather name="edit" size={24} color="blue" />}
            onButtonClicked={() => { navigation.push('EditVaultRecord', vaultParams) }} />
    );
};
