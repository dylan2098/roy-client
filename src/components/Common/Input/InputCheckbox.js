import Instance from "../../../utils/singleton";

const InputCheckbox = ({ attribute, page, inputAttribute }) => {
    const Language = Instance.getInstaceLanguage();

    return (attribute.type === 'checkbox') && <div className="pb-3">
        <label className="custom-toggle custom-toggle-primary">
            <input type="checkbox" {...inputAttribute} />
            <span className="custom-toggle-slider rounded-circle" data-label-off="OFF" data-label-on="ON"></span>
        </label>

        <span className="ml-5">{Language.getContent(attribute.placeholder, page)}</span>
    </div>
}

export default InputCheckbox;