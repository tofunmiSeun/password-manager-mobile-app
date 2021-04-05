import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { APP_PRIMARY_COLOR, HEADER_BUTTON_SIZE } from '../../Utils';
import VaultRecordDetailsMenu from '../organisms/VaultRecordDetailsMenu';

export default function VaultRecordDetailsMenuButton({ navigation, vaultRecord }) {
    const [showMenu, setShowMenu] = React.useState(false);

    return <>
        <HeaderButton iconView={<Ionicons name="ellipsis-horizontal"
            size={HEADER_BUTTON_SIZE} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { setShowMenu(true) }} />
        <VaultRecordDetailsMenu isVisible={showMenu}
            record={vaultRecord}
            onMenuClosed={() => setShowMenu(false)} />
    </>;
};
