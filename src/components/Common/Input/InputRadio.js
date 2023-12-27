const InputRadio = ({ attribute, inputAttribute }) => {
    return (attribute.type === 'radio') &&
        attribute.attrOptions.map((attOp, index) =>
            <div className="custom-control custom-radio mb-3 browser-default custom-select" key={index}>
                <input
                    type="radio"
                    id={'customRadio' + index}
                    className="custom-control-input"
                    defaultChecked={attOp.checked}
                    value={attOp.value}
                    {...inputAttribute}
                />
                <label className="custom-control-label" htmlFor={'customRadio' + index}>
                    {attOp.label}
                </label>
            </div>
        )
}

export default InputRadio;