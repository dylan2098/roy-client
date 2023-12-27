import React from "react";
import {
    Button,
    FormGroup,
    Form,
    Input,
    Modal,
    Row,
    Col
} from "reactstrap";

import { useForm, Controller } from 'react-hook-form';
import Loading from "../../Common/Loading";
import { useEffect, useState } from "react";
import Instance from "../../../utils/singleton"
import Services from "../../../services/index";
import Component from "../../Common/Index";


const ModalFormProduct = ({ toggleModel, open, onSubmit, dataMessage, loading, form, item, page, categories, productsMaster, productsVariant }) => {
    const Language = Instance.getInstaceLanguage();
    const ServiceInstance = Instance.getInstanceService()


    const [shortDesc, setShortDesc] = useState();
    const [longDesc, setLongDesc] = useState();

    useEffect(() => {
        if (item && form) {
            form.inputs.map(input => {
                setValue(input.name, item[input.name])

                if (input.name === "attributeProduct") {
                    input.value.map(att => {
                        if (item[att.name] && att.name === "productAdditionalAttributes") {
                            setValue(att.name, getAdditionalAttributes(item[att.name]));
                        } else {
                            setValue(att.name, item[att.name]);
                        }
                    })
                }

                if (input.name === "productLongDescription") {
                    setLongDesc(item[input.name]);
                }

                if (input.name === "productShortDescription") {
                    setShortDesc(item[input.name]);
                }

                if (input.name === "productImage") {
                    if (item[input.name]) {
                        setFileUploaded(JSON.parse(item[input.name]));
                    }
                }

                if (input.name === "productImages") {
                    if (item[input.name]) {
                        setFilesUploaded(JSON.parse(item[input.name]));
                    }
                }
            })
        }

        if (open === false) {
            setFileUploaded(null);
            setFilesUploaded([]);
            setLongDesc(null);
            setLongDesc(null);
        }
    }, [item, open])

    const { register, handleSubmit, setValue, control } = useForm();

    const showMessage = (dataMessage) => {
        let color = dataMessage.statusCode === 200 ? 'text-success' : 'text-danger';
        let elements = <div className={`justify-content-center text-center pt-2 pb-2 ` + color}>
            {dataMessage.message}
        </div>;
        return elements;
    }


    // upload file
    const [fileUploaded, setFileUploaded] = useState();
    const [loadingUploadFile, setLoadingUploadFile] = useState(false);


    // upload multiple files
    const [filesUploaded, setFilesUploaded] = useState();
    const [loadingUploadFiles, setLoadingUploadFiles] = useState(false);


    // delete all file
    const deleteImage = (publicId) => {
        return Services.getInstanceProduct().deleteImage(publicId);
    }


    const deleteAllFiles = async (publicId, filesUploaded, formType) => {
        if (formType === "add") {
            if (publicId) {
                setFileUploaded(null);
                await deleteImage(publicId);
            }

            if (filesUploaded && filesUploaded.length > 0) {
                filesUploaded.map(async (file) => {
                    await deleteImage(file.public_id);
                })
                setFilesUploaded(null);
            }
        } else {
            if (item && item["productImage"] && publicId) {
                const imageParse = JSON.parse(item["productImage"]);
                if (imageParse && imageParse.public_id && publicId !== imageParse.public_id) {
                    await deleteImage(publicId);
                }
            }

            if (item && item["productImages"] && filesUploaded) {
                const imagesParse = JSON.parse(item["productImages"]);

                // product empty images
                if (imagesParse.length <= 0 && filesUploaded.length > 0) {
                    filesUploaded.map(async (file) => {
                        await deleteImage(file.public_id);
                    })
                    setFilesUploaded(null);
                }

                // product have images
                if (imagesParse.length > 0 && filesUploaded.length > 0) {
                    // difference between two arrays of objects
                    const results = filesUploaded.filter(({ public_id: id1 }) => !imagesParse.some(({ public_id: id2 }) => id2 === id1));
                    results.map(async (file) => {
                        await deleteImage(file.public_id);
                    })
                    setFilesUploaded(null);
                }
            }
        }
    }


    const loadInputs = (form) => {
        return form && form.inputs.map((attr, key) => {
            const inputAttr = register(attr.name, { ...attr.options });
            return (
                attr.name && <FormGroup className="mb-3" key={key}>
                    {
                        <React.Fragment>
                            <Component.InputText attribute={attr} inputAttribute={inputAttr} item={item} setValue={setValue} page={page} />
                            <Component.InputRadio attribute={attr} inputAttribute={inputAttr} page={page} />

                            {
                                (attr.name === 'productShortDescription') && <Component.InputTextareaEditor attribute={attr} setValue={setShortDesc} page={page} item={item && item.productShortDescription} />
                            }

                            {
                                (attr.name === 'productLongDescription') && <Component.InputTextareaEditor attribute={attr} setValue={setLongDesc} page={page} item={item && item.productLongDescription} />
                            }

                            {
                                (attr.name === 'productSearchableIfUnavailable') && <Component.InputCheckbox attribute={attr} page={page} inputAttribute={inputAttr} />
                            }

                            {
                                (attr.name === 'productStoreForcePriceEnabled') && <Component.InputCheckbox attribute={attr} page={page} inputAttribute={inputAttr} />
                            }

                            {
                                (attr.name === 'productStoreNonDiscountableEnabled') && <Component.InputCheckbox attribute={attr} page={page} inputAttribute={inputAttr} />
                            }

                            {
                                (attr.name === 'categoryId' && <Component.InputSelect Component={Controller} control={control} attribute={attr} optionValues={categories} page={page} item={item && item.categoryId} />)
                            }

                            {
                                (attr.name === 'productMaster' && <Component.InputSelect Component={Controller} control={control} attribute={attr} optionValues={productsMaster} page={page} item={item && item.productMaster} />)
                            }

                            {
                                (attr.name === 'productVariants' && <Component.InputSelect Component={Controller} control={control} attribute={attr} optionValues={productsVariant} page={page} item={item && item.productVariants && (JSON.parse(item.productVariants))} />)
                            }

                            {
                                (attr.name === 'productImage') && <Component.InputFile
                                    type={attr.type}
                                    file={fileUploaded}
                                    setFile={setFileUploaded}
                                    loading={loadingUploadFile}
                                    setLoading={setLoadingUploadFile}
                                    label={attr.placeholder} page={page}
                                    item={item && item.productImage && JSON.parse(item.productImage)}
                                    typeForm={form.type}
                                />
                            }

                            {
                                (attr.name === 'productImages') && <Component.InputMultipleFiles
                                    type={attr.type} files={filesUploaded}
                                    setFiles={setFilesUploaded}
                                    loading={loadingUploadFiles}
                                    setLoading={setLoadingUploadFiles}
                                    label={attr.placeholder} page={page}
                                    items={item && item.productImages && JSON.parse(item.productImages)}
                                />
                            }
                        </React.Fragment>
                    }

                    {
                        attr.name === 'attributeProduct' &&
                        <Row>
                            {
                                attr.value && attr.value.map((attr, index) => {
                                    return (
                                        <React.Fragment key={index}>
                                            {
                                                (attr.name !== "productAdditionalAttributes") && <Col md="3" xs="3" sm="3" className="mt-2">
                                                    <Input type="text" name={attr.name}
                                                        placeholder={Language.getContent(attr.placeholder, page)}
                                                        {...register(attr.name)}
                                                        defaultValue={item && item[attr.name]}
                                                        onChange={(e) => setValue(attr.name, e.target.value)}
                                                    />
                                                </Col>
                                            }

                                            {
                                                (attr.name === "productAdditionalAttributes") && <Col className="mt-2">
                                                    <Input type="text" name={attr.name}
                                                        placeholder={Language.getContent(attr.placeholder, page)}
                                                        {...register(attr.name)}
                                                        defaultValue={item && item[attr.name] && getAdditionalAttributes(item[attr.name])}
                                                        onChange={(e) => setValue(attr.name, e.target.value)}
                                                    />
                                                </Col>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </Row>
                    }
                </FormGroup >
            )
        })
    }



    const loadButtonSubmit = (loading) => {
        let button;
        if (!loading) {
            button = <Button color="primary" type="submit" disabled={(loadingUploadFile || loadingUploadFiles) ? true : false}>
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



    // format additional attributes
    const getAdditionalAttributes = (dataAttributes) => {
        const parseDataAttr = JSON.parse(dataAttributes);
        let response = '';

        if (parseDataAttr && parseDataAttr.length > 0) {
            parseDataAttr.map((item) => {
                response += item.key + ':' + item.value + ","
            })
            response = response.substring(0, response.length - 1);
        }
        return response;
    }


    return (
        <>
            <Modal
                className="modal-dialog-centered modal-custom"
                isOpen={open}
                toggle={() => toggleModel()}
                backdrop="static"
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
                        onClick={() => {
                            toggleModel();
                            deleteAllFiles(fileUploaded && fileUploaded.public_id, filesUploaded);
                        }}
                    >
                        <span aria-hidden={true}>×</span>
                    </button>
                </div>
                <div className="modal-body">
                    <Form role="form" onSubmit={handleSubmit((data) => onSubmit({ ...data, productLongDescription: longDesc, productShortDescription: shortDesc, productImage: fileUploaded, productImages: filesUploaded }), onError)}>
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
                                onClick={() => { toggleModel(); deleteAllFiles(fileUploaded && fileUploaded.public_id, filesUploaded, form.type); }}
                            >
                                {Language.getContent("CLOSE", "COMMON")}
                            </Button>

                            {
                                loadButtonSubmit(loading)
                            }

                        </div>

                    </Form>
                </div>

            </Modal>
        </>
    );
}

export default ModalFormProduct;