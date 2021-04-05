import * as React from 'react';
import { TextInput } from 'react-native';
import AtomsStyles from './AtomsStyles';


export default function TextBox({ initialTextValue = '', onTextChangedCallBack = (newText) => { return; },
    placeholder = '', isTextInputValid = true, invalidTextInputErrorMessage = '' }) {

    const [textValue, setTextValue] = React.useState(initialTextValue);

    const onTextChanged = (newTextValue) => {
        setTextValue(newTextValue);
        onTextChangedCallBack(newTextValue);
    }

    return <>
        <TextInput style={isTextInputValid ? [AtomsStyles.textInput] : [AtomsStyles.textInput, { borderColor: 'red' }]}
            placeholder={placeholder}
            value={textValue}
            onChangeText={onTextChanged} />
    </>;
}