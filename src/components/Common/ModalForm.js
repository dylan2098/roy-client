import React from "react";
import {
    Button,
    FormGroup,
    Form,
    Input,
    InputGroup,
    Modal,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";

import { useForm } from 'react-hook-form';
import Loading from "./Loading";
import { useEffect } from "react";
import Instance from "../../utils/singleton"

const ModalForm = ({ toggleModel, open, onSubmit, dataMessage, loading, form, item, page }) => {
    const Language = Instance.getInstaceLanguage();

    useEffect(() => {
        if (item && form) {
            form.inputs.map(input => setValue(input.name, item[input.name]))
        }
    }, [item])

    const { register, handleSubmit, setValue } = useForm();

    const showMessage = (dataMessage) => {
        let color = dataMessage.statusCode === 200 ? 'text-success' : 'text-danger';
        let elements = <div className={`justify-content-center text-center pt-2 pb-2 ` + color}>
            {dataMessage.message}
        </div>;
        return elements;
    }

    const loadInputs = (form) => {
        return form && form.inputs.map((attr, key) => {
            const inputAttr = register(attr.name, { ...attr.options });
            return (
                attr.name && <FormGroup className="mb-3" key={key}>
                    <InputGroup className="input-group-alternative">
                        {
                            attr.icons &&
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className={attr.icons} />
                                </InputGroupText>
                            </InputGroupAddon>
                        }

                        {
                            (attr.type !== 'checkbox' && attr.type !== 'radio' && attr.type !== 'file') && <Input placeholder={Language.getContent(attr.placeholder, page)} type={attr.type} disabled={attr.disabled}
                                {...inputAttr}
                                onChange={(e) => setValue(attr.name, e.target.value)}
                                defaultValue={item && item[attr.name]}
                            />
                        }
                    </InputGroup>

                    {
                        (attr.type === 'radio') &&
                        attr.attrOptions.map((attOp, index) =>
                            <div className="custom-control custom-radio mb-3" key={index}>
                                <input
                                    type={attr.type}
                                    id={'customRadio' + index}
                                    className="custom-control-input"
                                    defaultChecked={attOp.checked}
                                    value={attOp.value}
                                    {...inputAttr}
                                />
                                <label className="custom-control-label" htmlFor={'customRadio' + index}>
                                    {attOp.label}
                                </label>
                            </div>
                        )
                    }
                </FormGroup >
            )
        })
    }


    const loadButton = (loading) => {
        let button;
        if (!loading) {
            button = <Button color="primary" type="submit">
                {form.type === "add" ? Language.getContent("SUBMIT", "COMMON") : Language.getContent("SAVE_CHANGES", "COMMON")}
            </Button>;
        } else {
            button = <Button color="primary" >
                <Loading size={2} />
            </Button>;
        }

        return button;
    }

    const onError = (error) => {
        console.log(error);
    }


    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={open}
            toggle={() => toggleModel()}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    {Language.getContent(form.title, page)}
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={() => toggleModel()}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="modal-body">
                <Form role="form" onSubmit={handleSubmit(onSubmit, onError)}>
                    {
                        loadInputs(form)
                    }

                    {
                        dataMessage && dataMessage.statusCode && showMessage(dataMessage)
                    }

                    <div className="justify-content-end d-flex pt-4 pb-3">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => toggleModel()}
                        >
                            {Language.getContent("CLOSE", "COMMON")}
                        </Button>

                        {
                            loadButton(loading)
                        }

                    </div>

                </Form>
            </div>

        </Modal>
    );
}

export default ModalForm;