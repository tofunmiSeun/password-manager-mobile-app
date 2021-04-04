import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { APP_PRIMARY_COLOR } from '../../Utils';

export default function BackButton({ navigation }) {
    return (
        <HeaderButton iconView={<Ionicons name="arrow-back" size={24} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { navigation.goBack() }} />
    );
};
