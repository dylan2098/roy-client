import Select from 'react-select';
import Instance from "../../../utils/singleton";

const InputSelect = ({ Component, control, attribute, optionValues, page, item, isDisabled }) => {
    const Language = Instance.getInstaceLanguage();
    const getDefaulValue = (item) => {
        let defaultValue = [];
        if (item.length > 0) {
            // hand with multiple 
            for (let i of item) {
                for (let opvVal of optionValues) {
                    if (opvVal.value == i) {
                        defaultValue.push(opvVal);
                    }
                }
            }
        } else {
            // hand one data
            defaultValue = optionValues.filter(opVal => opVal.value === item);
        }
        return defaultValue;
    }

    return (
        (attribute.type === 'select') && (
            <Component control={control} name={attribute.name} render={({ field: { onChange, value, ref } }) => (
                <Select
                    defaultValue={item && getDefaulValue(item)}
                    placeholder={Language.getContent(attribute.placeholder, page)}
                    inputRef={ref}
                    onChange={val => attribute.multiple ? val && onChange(val.map(c => c.value)) : val && onChange(val.value)}
                    options={optionValues}
                    isMulti={attribute.multiple}
                    isDisabled={isDisabled}
                />
            )} />
        )
    );
}

export default InputSelect;