import React from 'react';
import { Platform } from 'react-native';
import MobileModalTemplate from './MobileModalTemplate';
import WebModalTemplate from './WebModalTemplate';

export default function ModalTemplate({ modalVisible, modalContent, onModalDismissed = () => { } }) {
    return <>
        {Platform.OS == 'web' && <WebModalTemplate modalVisible={modalVisible}
            modalContent={modalContent}
            onModalDismissed={onModalDismissed} />
        }
        {Platform.OS != 'web' && <MobileModalTemplate modalVisible={modalVisible}
            modalContent={modalContent}
            onModalDismissed={onModalDismissed} />
        }
    </>
}