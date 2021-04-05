import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { APP_PRIMARY_COLOR, HEADER_BUTTON_SIZE } from '../../Utils';
import VaultDetailsMenu from '../organisms/VaultDetailsMenu';

export default function VaultRecordMenuButton({ navigation, vault }) {
    const [showMenu, setShowMenu] = React.useState(false);

    return <>
        <HeaderButton iconView={<Ionicons name="ellipsis-horizontal"
            size={HEADER_BUTTON_SIZE} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { setShowMenu(true) }} />
        <VaultDetailsMenu navigation={navigation} isVisible={showMenu}
            vault={vault}
            onMenuClosed={() => setShowMenu(false)} />
    </>;
};
