import * as React from 'react';
import TextBox from '../atoms/TextBox';
import PasswordBox from '../atoms/PasswordBox';
import FormTempate from './FormTemplate';

export default function SubmitVaultRecordTempate({ vaultRecord, onSubmitRecordClicked, isSubmitting }) {

    const [name, setName] = React.useState(vaultRecord.name);
    const [url, setUrl] = React.useState(vaultRecord.url);
    const [username, setUsername] = React.useState(vaultRecord.username);
    const [password, setPassword] = React.useState(vaultRecord.password);

    const isSubmitButtonDisabled = () => {
        return !Boolean(name.trim()) ||
            !Boolean(username.trim()) ||
            !Boolean(password.trim())
    }

    return (
        <FormTempate form={<>
            <TextBox initialTextValue={name} onTextChangedCallBack={setName}
                placeholder='Name'
                isTextInputValid={name.length > 0} />
            <TextBox initialTextValue={url} onTextChangedCallBack={setUrl}
                placeholder='Url'
                isTextInputValid={url.length > 0} />
            <TextBox initialTextValue={username} onTextChangedCallBack={setUsername}
                placeholder='Username'
                isTextInputValid={username.length > 0} />
            <PasswordBox initialValue={vaultRecord.password} onPasswordChangedCallBack={setPassword} /></>}
            submitButtonTitle='Save'
            isSubmitButtonDisabled={isSubmitButtonDisabled()}
            onSubmitButtonClicked={() => onSubmitRecordClicked(Object.assign(vaultRecord, { name, url, username, password }))}
            isSubmittingForm={isSubmitting} />
    );
}
