import {
    Card,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    Button
} from "reactstrap";

import PricebookContext from '../../context/PricebookContext';

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useReducer, useState } from 'react';
import reducer from '../../reducer/reduce';
import ListPricebook from "components/Manager/Pricebook/ListPricebook";
import Paging from "components/Common/Paging";
import ModalForm from "components/Common/ModalForm";
import Services from "../../services/index";
import { useForm } from 'react-hook-form';
import pricebookConfig from '../../settings/pricebookConfig.json'
import Instance from "../../utils/singleton";

const PricebookIndex = () => {
    const Language = Instance.getInstaceLanguage();

    const initialAppState = {
        items: []
    }

    const { register, handleSubmit, setValue } = useForm();
    const [store, dispatch] = useReducer(reducer, initialAppState);
    const [loading, setLoading] = useState(true);
    const [indexPage, setIndexPage] = useState(1);
    const [search, setSearch] = useState();
    const [paging, setPaging] = useState();


    useEffect(() => {
        if (store.status === 200) {
            setLoading(false);
            setPaging(store.paging);
        }
    }, [store.items])


    const clickPage = (index) => {
        if (paging && index != paging.offset) {
            setIndexPage(index);
            setLoading(true);
        }
    }

    const onSubmit = (data) => {
        if (data && data.search != search) {
            setSearch(data.search);
            setIndexPage(1);
            setLoading(true);
        }
    }

    const onRefresh = () => {
        if (search != '') {
            setSearch('');
            setLoading(true);
            document.getElementById("search").value = '';
        }
    }

    const onReload = async () => {
        const res = await Services.getInstancePricebook().getAllPricebook(search, Instance.getInstanceHelper().getLimitInTable(), indexPage);

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
            const res = await Services.getInstancePricebook().createPricebook(data);
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



    //start form update
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
        setDataMessageFormUpdate({ message: ' ' });
    }


    const onSubmitFormUpdate = async (data) => {
        setLoadingModelFormUpdate(true);
        try {
            const res = await Services.getInstancePricebook().updatePricebook(data);
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
        <>
            <PricebookContext.Provider value={{ store, dispatch }}>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <Row>
                                    <div className="col-6">
                                        <Form className="form-inline mr-3 ml-3 mt-3 mb-3" onSubmit={handleSubmit(onSubmit)}>
                                            <FormGroup className="mb-0">
                                                {
                                                    search && <Button className="input-group-alternative text-red" type="button" onClick={onRefresh}>
                                                        <i className="fas fa-sync-alt" />
                                                    </Button>
                                                }

                                                <Button className="input-group-alternative text-purple" type="submit">
                                                    <i className="fas fa-search" />
                                                </Button>
                                                <Input placeholder={Language.getContent("SEARCH", "COMMON")} id="search" autoComplete="off" type="text" {...register("search")} />
                                            </FormGroup>
                                        </Form>
                                    </div>

                                    <div className="col-6">
                                        <div className="form-inline mr-3 ml-3 mt-3 mb-3 float-right">
                                            <Button className="text-right" color="primary" type="button" onClick={() => toggleModelFormAdd()} > + {Language.getContent('ADD_PRICEBOOK', 'PRICEBOOK')} </Button >
                                        </div>
                                    </div>
                                </Row>

                                <ModalForm toggleModel={toggleModelFormAdd} open={openFormAdd} onSubmit={onSubmitFormAdd} dataMessage={dataMessageFormAdd} loading={loadingModelFormAdd} form={pricebookConfig["FORM_ADD"]} page={pricebookConfig["NAME"]} />
                                <ModalForm toggleModel={toggleModelFormUpdate} open={openFormUpdate} onSubmit={onSubmitFormUpdate} dataMessage={dataMessageFormUpdate} loading={loadingModelFormUpdate} form={pricebookConfig["FORM_UPDATE"]} item={itemUpdate} page={pricebookConfig["NAME"]} />

                                <ListPricebook indexPage={indexPage} search={search} loading={loading} onClickFormUpdate={onClickFormUpdate} page={pricebookConfig["NAME"]} />
                                {
                                    (store.items && store.items.length > 0) && <Paging propPaging={paging} clickIndexPage={clickPage} />
                                }
                            </Card>
                        </div>
                    </Row>
                </Container>
            </PricebookContext.Provider>
        </>
    );
};


export default PricebookIndex;