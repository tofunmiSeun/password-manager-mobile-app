import React from 'react';
import { EvilIcons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';

export default function AddVaultButton() {
    const navigation = useNavigation();

    return (
        <HeaderButton iconView={<EvilIcons name="plus" size={32} color="blue" />}
            onButtonClicked={() => { navigation.navigate('NewVault') }} />
    );
};
