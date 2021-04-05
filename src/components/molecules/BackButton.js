import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { APP_PRIMARY_COLOR, HEADER_BUTTON_SIZE } from '../../Utils';

export default function BackButton({ navigation }) {
    return (
        <HeaderButton iconView={
            <Ionicons name="arrow-back" size={HEADER_BUTTON_SIZE} color={APP_PRIMARY_COLOR} />
        } onButtonClicked={() => { navigation.goBack() }} />
    );
};
