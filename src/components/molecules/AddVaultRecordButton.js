import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';
import { APP_PRIMARY_COLOR, HEADER_BUTTON_SIZE } from '../../Utils';

export default function AddVaultRecordButton({ vaultParams }) {
    const navigation = useNavigation();

    return (
        <HeaderButton iconView={<Ionicons name="add" size={HEADER_BUTTON_SIZE} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { navigation.navigate('NewVaultRecord', vaultParams) }} />
    );
};
