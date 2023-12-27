import {
    Card,
    Container,
    Row,
    Form,
    FormGroup,
    Input,
    Button
} from "reactstrap";

import ProductContext from '../../context/ProductContext';

// core components
import Header from "components/Headers/Header.js";
import { useEffect, useReducer, useState } from 'react';
import reducer from '../../reducer/reducerProduct';
import ListProduct from "components/Manager/Products/ListProduct";
import Paging from "components/Common/Paging";
import ModalFormProduct from "components/Manager/Products/ModalFormProduct";
import Services from "../../services/index";
import { useForm } from 'react-hook-form';
import productConfig from '../../settings/productConfig.json'
import Instance from "../../utils/singleton";

const ProductIndex = () => {
    const Language = Instance.getInstaceLanguage();
    const Helper = Instance.getInstanceHelper()

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
            loadCategory();
            loadProductsMaster();
            loadProductVariant();
        }
    }, [store.items])


    const onReload = async () => {
        const res = await Services.getInstanceProduct().getAllProduct(search, Instance.getInstanceHelper().getLimitInTable(), indexPage);

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
            const product = formatData(data);
            const res = await Services.getInstanceProduct().createProduct(product);

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

            if (data && data.productVariants) {
                if (Helper.isJsonString(data.productVariants)) {
                    data.productVariants = JSON.parse(data.productVariants);
                }
            }

            const product = formatData(data);

            const res = await Services.getInstanceProduct().updateProduct(product);

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
                        query: res.data.productId,
                        items: res.data,
                    }
                })

                // delete image if you have new image or delete old image
                if ((itemUpdate && itemUpdate.productImage && product && product.image)) {
                    const parseImageOldItemUpdate = JSON.parse(itemUpdate.productImage);
                    const parseImageProduct = JSON.parse(product.image);

                    if (parseImageOldItemUpdate.public_id !== parseImageProduct.public_id) {
                        await Services.getInstanceProduct().deleteImage(parseImageOldItemUpdate.public_id);
                    }
                }

                setOpenFormUpdate(!openFormUpdate);
                setDataMessageFormUpdate({ message: '' });
            }

        } catch (error) {
            return setDataMessageFormUpdate({ message: error.message, statusCode: 500 });
        }
    }





    // products variant
    const [productsVariant, setProductsVariant] = useState([]);

    const loadProductVariant = async () => {
        let data = [];
        const res = await Services.getInstanceProduct().getProductsVariant();
        if (res && res.data && res.data.length > 0) {
            res.data.map((item) => data.push({ value: item.id, label: item.name }));
        }

        setProductsVariant(data);
    }





    // products master
    const [productsMaster, setProductsMaster] = useState([]);

    const loadProductsMaster = async () => {
        let data = [];
        const res = await Services.getInstanceProduct().getProductsMaster();
        if (res && res.data && res.data.length > 0) {
            res.data.map((item) => data.push({ value: item.id, label: item.name }));
        }
        setProductsMaster(data);
    }





    // categories
    const [categories, setCategories] = useState([]);

    const loadCategory = async () => {
        let data = [];

        const res = await Services.getInstanceCategory().getAll();
        if (res && res.data && res.data.length > 0) {
            res.data.map((item) => data.push({ value: item.id, label: item.name }));
        }
        setCategories(data);
    }




    // paging
    const clickPage = (index) => {
        if (paging && index != paging.offset) {
            setIndexPage(index);
            setLoading(true);
        }
    }




    // search
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





    // format 
    const formatData = (data) => {
        let product = {};

        if (data.productAdditionalAttributes) {
            const aditionAttr = data.productAdditionalAttributes;
            const splitAttributes = aditionAttr.split(",");

            if (splitAttributes.length > 0) {
                let dataAttr = [];
                splitAttributes.map(splitAttribute => {
                    const splitAttr = splitAttribute.split(":");
                    dataAttr.push({ key: splitAttr[0], value: splitAttr[1] });
                })
                product.additionalAttributes = JSON.stringify(dataAttr);
            }
        }

        if (data.productId) {
            product.id = data.productId;
        }

        product.type = 'master';

        if (data.productMaster) {
            product.type = 'variant';
            product.productMaster = data.productMaster;
        }

        if (data.productSKU) {
            product.sku = data.productSKU;
        }

        if (data.productName) {
            product.name = data.productName;
        }

        product.variants = JSON.stringify(data.productVariants);
        product.bundled = data.productBundled;
        product.categoryId = data.categoryId;
        product.brand = data.productBrand;
        product.size = data.productSize;
        product.depth = data.productDepth;
        product.height = data.productHeight;
        product.weight = data.productWeight;
        product.width = data.productWidth;
        product.length = data.productLength;
        product.age = data.productAge;
        product.manufacturerName = data.productManuFacturerName;
        product.color = data.productColor;
        product.shortDesc = data.productShortDescription;
        product.longDesc = data.productLongDescription;
        product.minOrderQuantity = data.productMinOrderQuantity || 1;
        product.numberOrderOfMonth = data.productNumberOrderOfMonth;
        product.searchableIfUnavailable = data.productSearchableIfUnavailable;
        product.storeForcePriceEnabled = data.productStoreForcePriceEnabled;
        product.storeNonDiscountableEnabled = data.productStoreNonDiscountableEnabled;
        product.status = data.productStatus;

        if (data.productUnit) {
            product.unit = data.productUnit;
        }


        if (data.productImage) {
            product.image = JSON.stringify({ public_id: data.productImage.public_id, url: data.productImage.url })
        }

        if (data.productImages) {
            data.images = [];
            data.productImages.map(img => data.images.push({ public_id: img.public_id, url: img.url }));

            product.images = JSON.stringify(data.images);
        }

        return product;
    }


    return (
        <>
            <ProductContext.Provider value={{ store, dispatch }}>
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
                                            <Button className="text-right" color="primary" type="button" onClick={() => toggleModelFormAdd()} > + {Language.getContent("ADD_PRODUCT", "PRODUCT")} </Button >
                                        </div>
                                    </div>
                                </Row>

                                <ModalFormProduct toggleModel={toggleModelFormAdd} open={openFormAdd} onSubmit={onSubmitFormAdd} dataMessage={dataMessageFormAdd} loading={loadingModelFormAdd} form={productConfig["FORM_ADD"]} page={productConfig["NAME"]} categories={categories} productsMaster={productsMaster} productsVariant={productsVariant} />
                                <ModalFormProduct toggleModel={toggleModelFormUpdate} open={openFormUpdate} onSubmit={onSubmitFormUpdate} dataMessage={dataMessageFormUpdate} loading={loadingModelFormUpdate} form={productConfig["FORM_UPDATE"]} item={itemUpdate} page={productConfig["NAME"]} categories={categories} productsMaster={productsMaster} productsVariant={productsVariant} />

                                <ListProduct indexPage={indexPage} search={search} loading={loading} onClickFormUpdate={onClickFormUpdate} />
                                {
                                    (store.items && store.items.length > 0) && <Paging propPaging={paging} clickIndexPage={clickPage} />
                                }
                            </Card>
                        </div>
                    </Row>
                </Container>
            </ProductContext.Provider>
        </>
    );
};


export default ProductIndex;