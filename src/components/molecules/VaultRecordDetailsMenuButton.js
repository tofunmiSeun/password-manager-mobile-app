import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import HeaderButton from '../atoms/HeaderButton';
import { APP_PRIMARY_COLOR } from '../../Utils';
import VaultRecordDetailsMenu from '../organisms/VaultRecordDetailsMenu';

export default function VaultRecordDetailsMenuButton({ navigation, vaultRecord }) {
    const [showMenu, setShowMenu] = React.useState(false);

    return <>
        <HeaderButton iconView={<Ionicons name="ellipsis-horizontal"
            size={24} color={APP_PRIMARY_COLOR} />}
            onButtonClicked={() => { setShowMenu(true) }} />
        <VaultRecordDetailsMenu isVisible={showMenu}
            record={vaultRecord}
            onMenuClosed={() => setShowMenu(false)} />
    </>;
};
