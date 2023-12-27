import Instance from "../../../utils/singleton";
import {
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";

const InputText = ({ attribute, inputAttribute, page, item, setValue }) => {
    const Language = Instance.getInstaceLanguage();

    return (['text', 'number', 'hidden'].includes(attribute.type)) &&
        (
            <InputGroup className="input-group-alternative">
                {
                    attribute.icons &&
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <i className={attribute.icons} />
                        </InputGroupText>
                    </InputGroupAddon>
                }

                <Input step={attribute.step} placeholder={Language.getContent(attribute.placeholder, page)} type={attribute.type} disabled={attribute.disabled}
                    {...inputAttribute}
                    onChange={(e) => setValue(attribute.name, e.target.value)}
                    defaultValue={item && item[attribute.name]}
                />

            </InputGroup>
        )
}

export default InputText;