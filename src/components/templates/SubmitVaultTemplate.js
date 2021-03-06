import * as React from 'react';
import TextBox from '../atoms/TextBox';
import FormTempate from './FormTemplate';

export default function SubmitVaultTemplate({ vaultName, onSubmitVaultClicked, isSubmitting }) {

    const [name, setName] = React.useState(vaultName);

    const isSubmitButtonDisabled = () => {
        return name.trim().length === 0;
    }

    return <FormTempate form={<TextBox initialTextValue={name} onTextChangedCallBack={setName}
        placeholder='Name'
        isTextInputValid={name.length > 0} />}
        submitButtonTitle='Save'
        isSubmitButtonDisabled={isSubmitButtonDisabled()}
        onSubmitButtonClicked={() => onSubmitVaultClicked(name)}
        isSubmittingForm={isSubmitting} />;

}
