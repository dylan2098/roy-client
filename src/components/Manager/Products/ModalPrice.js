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
import Instance from "../../../utils/singleton"
import ListProductPrice from "./ListProductPrice";
import ProductPriceContext from '../../../context/ProductPriceContext';
import { useEffect, useReducer, useState } from 'react';
import reducer from '../../../reducer/reduce';
import Loading from "components/Common/Loading";
import PriceProductConfig from '../../../settings/priceProductConfig.json';
import ModalFormPriceProduct from "./ModalFormPriceProduct";
import Services from "../../../services/index";

const ModalPrice = ({ toggleModel, open, productId, loadingList }) => {
    const Language = Instance.getInstaceLanguage();


    const initialAppState = {
        items: []
    }

    const [store, dispatch] = useReducer(reducer, initialAppState);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (store.status === 200) {
            setLoading(false);
            getAllPricebooks();
        }
    }, [store.items])


    const onReload = async () => {
        const res = await Services.getInstanceProduct().getProductPrice(productId);

        if (!res || !res.statusCode) {
            return alert(res);
        }

        if (res.statusCode !== 200) {
            return alert(res.message);
        }

        if (res.data) {
            dispatch({
                type: 'init',
                payload: {
                    items: res.data,
                    paging: res.attachedData,
                    status: res.statusCode
                }
            })
        }
    }


    // get list pricebooks enter input of select
    const [pricebooks, setPricebooks] = useState([]);
    const getAllPricebooks = async () => {
        let pricebooks = [];

        const res = await Services.getInstancePricebook().getAllPricebook();
        if (res && res.data && res.data.length > 0) {
            res.data.map((item) => pricebooks.push({ value: item.id, label: item.name }));
        }

        setPricebooks(pricebooks);
    }



    // form add
    const [openFormAdd, setOpenFormAdd] = useState(false);
    const [dataMessageFormAdd, setDataMessageFormAdd] = useState();
    const [loadingModelFormAdd, setLoadingModelFormAdd] = useState();

    const toggleModelFormAdd = () => {
        setOpenFormAdd(!openFormAdd);
        setDataMessageFormAdd({ message: '' });
    }

    const onSubmitFormAdd = async (data) => {
        setLoadingModelFormAdd(true);
        try {
            if (data.productId) {
                data.productId = parseInt(data.productId);
            }

            const res = await Services.getInstanceProduct().createProductPrice(data);
            if (res.statusCode !== 200) {
                setLoadingModelFormAdd(false);
                return setDataMessageFormAdd({ message: res.message, statusCode: res.statusCode });
            }

            setLoadingModelFormAdd(false);
            setOpenFormAdd(!openFormAdd);
            setDataMessageFormAdd({ message: res.message, statusCode: res.statusCode });

            if (res.statusCode === 200) {
                onReload();
                setLoading(true);
            }

        } catch (error) {
            return setDataMessageFormAdd({ message: error.message, statusCode: 500 });
        }
    }


    // form update
    const [openFormUpdate, setOpenFormUpdate] = useState(false);
    const [dataMessageFormUpdate, setDataMessageFormUpdate] = useState();
    const [loadingModelFormUpdate, setLoadingModelFormUpdate] = useState();
    const [itemUpdate, setItemUpdate] = useState();

    const onClickFormUpdate = (item) => {
        setItemUpdate(item);
        setOpenFormUpdate(!openFormUpdate);
    }


    const toggleModelFormUpdate = () => {
        setOpenFormUpdate(!openFormUpdate);
        setDataMessageFormUpdate({ message: '' });
    }

    const onSubmitFormUpdate = async (data) => {
        setLoadingModelFormUpdate(true);
        try {
            const res = await Services.getInstanceProduct().updateProductPrice(data);
            if (res.statusCode !== 200) {
                setLoadingModelFormUpdate(false);
                return setDataMessageFormUpdate({ message: res.message, statusCode: res.statusCode });
            }

            setLoadingModelFormUpdate(false);
            setOpenFormUpdate(!openFormUpdate);
            setDataMessageFormUpdate({ message: res.message, statusCode: res.statusCode });

            if (res.statusCode === 200) {
                dispatch({
                    type: 'update_item',
                    payload: {
                        query: data.id,
                        items: res.data,
                    }
                })
                setOpenFormUpdate(!openFormUpdate);
                setDataMessageFormUpdate({ message: '' });
            }

        } catch (error) {
            return setDataMessageFormUpdate({ message: error.message, statusCode: 500 });
        }
    }









    return (
        <ProductPriceContext.Provider value={{ store, dispatch }}>
            <Modal
                className="modal-dialog-centered modal-custom-3"
                isOpen={open}
                toggle={() => toggleModel()}
            >
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Product Price
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
                    <div className="mb-3 float-right">
                        <Button className="text-right" color="primary" type="button" onClick={() => toggleModelFormAdd()} > + ADD </Button >
                    </div>

                    <ListProductPrice productId={productId} loadingList={loading} onClickFormUpdate={onClickFormUpdate} />

                    <div className="justify-content-end d-flex pt-4 pb-3">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={() => toggleModel()}
                        >
                            {Language.getContent("CLOSE", "COMMON")}
                        </Button>
                    </div>
                </div>

            </Modal>

            <ModalFormPriceProduct
                toggleModel={toggleModelFormAdd}
                open={openFormAdd}
                onSubmit={onSubmitFormAdd}
                dataMessage={dataMessageFormAdd}
                loading={loadingModelFormAdd}
                form={PriceProductConfig["FORM_ADD"]}
                page={PriceProductConfig["NAME"]}
                pricebooks={pricebooks}
                productId={productId}
            />

            <ModalFormPriceProduct
                toggleModel={toggleModelFormUpdate}
                open={openFormUpdate}
                onSubmit={onSubmitFormUpdate}
                dataMessage={dataMessageFormUpdate}
                loading={loadingModelFormUpdate}
                form={PriceProductConfig["FORM_UPDATE"]}
                page={PriceProductConfig["NAME"]}
                pricebooks={pricebooks}
                item={itemUpdate}
                productId={productId}
            />


        </ProductPriceContext.Provider>
    )
}


export default ModalPrice;