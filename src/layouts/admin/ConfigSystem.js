import {
    Card,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    Button
} from "reactstrap";

import ConfigSystemContext from '../../context/ConfigSystemContext';

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useReducer, useState } from 'react';
import reducer from '../../reducer/reduce';
import ListConfigSystem from "components/System/Config/ListConfigSystem";
import Paging from "components/Common/Paging";
import ModalForm from "components/Common/ModalForm";
import Services from "../../services/index";
import { useForm } from 'react-hook-form';
import systemConfig from '../../settings/systemConfig.json'
import Instance from "../../utils/singleton";
import Swal from 'sweetalert2'

const ConfigSystem = () => {
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
        const res = await Services.getInstanceConfig().getAllConfig(search, Instance.getInstanceHelper().getLimitInTable(), indexPage);

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
            const res = await Services.getInstanceConfig().createConfig(data);
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
            const res = await Services.getInstanceConfig().updateConfig(data);
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


    const onClickDelete = async (id) => {
        const confirmAlert = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want delete it?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonColor: '',
        })

        if (confirmAlert.isConfirmed) {
            const res = await Services.getInstanceConfig().deleteConfig(id);
            if (res.statusCode === 200) {

                dispatch({
                    type: 'delete_item',
                    payload: {
                        query: id,
                        items: store.items
                    }
                })

                Swal.fire(
                    'Deleted!',
                    'Deleted success!',
                    'success'
                )
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                })
            }
        }
    }


    return (
        <>
            <ConfigSystemContext.Provider value={{ store, dispatch }}>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <div className="col">
                            <Card className="shadow">
                                <Row>
                                    <div className="col-6">
                                        {
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
                                        }

                                    </div>

                                    <div className="col-6">
                                        <div className="form-inline mr-3 ml-3 mt-3 mb-3 float-right">
                                            <Button className="text-right" color="primary" type="button" onClick={() => toggleModelFormAdd()} > + {Language.getContent("ADD_CONFIG", "SYSTEM_CONFIG")} </Button >
                                        </div>
                                    </div>
                                </Row>



                                <ModalForm toggleModel={toggleModelFormAdd} open={openFormAdd} onSubmit={onSubmitFormAdd} dataMessage={dataMessageFormAdd} loading={loadingModelFormAdd} form={systemConfig["FORM_ADD"]} page={systemConfig["NAME"]} />
                                <ModalForm toggleModel={toggleModelFormUpdate} open={openFormUpdate} onSubmit={onSubmitFormUpdate} dataMessage={dataMessageFormUpdate} loading={loadingModelFormUpdate} form={systemConfig["FORM_UPDATE"]} item={itemUpdate} page={systemConfig["NAME"]} />

                                <ListConfigSystem indexPage={indexPage} search={search} loading={loading} onClickFormUpdate={onClickFormUpdate} onClickDelete={onClickDelete} />
                                {
                                    (store.items && store.items.length > 0) && <Paging propPaging={paging} clickIndexPage={clickPage} />
                                }
                            </Card>
                        </div>
                    </Row>
                </Container>
            </ConfigSystemContext.Provider>
        </>
    );
};


export default ConfigSystem