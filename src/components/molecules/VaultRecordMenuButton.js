import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { useNavigation } from '@react-navigation/native';
import { APP_PRIMARY_COLOR } from '../../Utils';
import VaultDetailsMenu from '../organisms/VaultDetailsMenu';

export default function VaultRecordMenuButton({ vault }) {
    const navigation = useNavigation();
    const [showMenu, setShowMenu] = React.useState(false);

    return <>
        <HeaderButton iconView={<Ionicons name="ellipsis-horizontal-outline"
            size={32}
            color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { setShowMenu(true) }} />
        <VaultDetailsMenu isVisible={showMenu}
            vault={vault}
            onMenuClosed={() => setShowMenu(false)} />
    </>;
};
