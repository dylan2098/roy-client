import EditorConvertToHTML from '../EditorConvertToHTML';
import Instance from "../../../utils/singleton"

const InputTextareaEditor = ({ attribute, setValue, page, item }) => {
    const Language = Instance.getInstaceLanguage();
    return (attribute.type === 'textarea') && <EditorConvertToHTML handleChangeValue={setValue} placeholder={Language.getContent(attribute.placeholder, page)} html={item} />
}

export default InputTextareaEditor;