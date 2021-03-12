import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';

export default function DeleteVaultButton({ vaultParams }) {
    const navigation = useNavigation();

    return (
        <HeaderButton iconView={<Ionicons name="trash-outline" size={24} color='red' />}
            onButtonClicked={() => { }} />
    );
};
