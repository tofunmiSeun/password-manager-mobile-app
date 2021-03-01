import * as React from 'react';
import { Picker } from 'react-native';
import AtomsStyles from './AtomsStyles';


export default function SelectBox({ options = [], initialSelection = '',
    viewModelFormatter, onSelectionChangedCallBack }) {
    const [selectedValue, setSelectedValue] = React.useState(initialSelection);

    React.useEffect(() => {
        onSelectionChangedCallBack(selectedValue);
    }, [selectedValue]);


    return (
        <Picker selectedValue={selectedValue} style={AtomsStyles.selectBox}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            {options.map(el => {
                const viewModel = viewModelFormatter(el);
                return <Picker.Item key={viewModel.value} label={viewModel.label} value={viewModel.value} />;
            })}
        </Picker>
    );
}