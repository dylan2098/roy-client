import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
} from "reactstrap";

import ProductContext from '../../../context/ProductContext';
import ModalPrice from "./ModalPrice";

// core components

import Services from "../../../services/index";
import Instance from '../../../utils/singleton';
import productConfig from '../../../settings/productConfig.json';

import { useEffect, useContext, useState } from 'react';
import Loading from "components/Common/Loading";

const ListProduct = (props) => {
    const Helper = Instance.getInstanceHelper();
    const Language = Instance.getInstaceLanguage();

    const { store, dispatch } = useContext(ProductContext);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState();

    const listStatus = productConfig["STATUS"];
    const attributeDisplay = productConfig["ATTRIBUTE_DISPLAY"];

    const allProduct = async (indexPage, search) => {
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


    const changeStatus = async (id, status, currentStatus) => {
        if (status !== currentStatus) {
            setLoading(true);
            setPosition(id);

            const res = await Services.getInstanceProduct().changeStatus(id, status);

            if (!res || !res.statusCode) {
                return alert(res);
            }

            if (res.statusCode !== 200) {
                setLoading(false);
                return alert(res.message);
            }

            if (res.data) {
                setLoading(false);
                dispatch({
                    type: 'update_item',
                    payload: {
                        query: id,
                        items: res.data,
                    }
                })
            }
        }
    }

    const elementStatus = (loading, item, position) => {
        let elements = <Badge color="" className="badge-dot mr-4">
            <i className={"bg-" + listStatus[item.productStatus].color} />
            {
                listStatus[item.productStatus].text
            }
        </Badge>;

        if (loading && position == item.productId) {
            elements = <Loading size={2} />;
        }

        return elements;
    }

    const renderImage = (productImage) => {
        if (productImage) {
            const image = JSON.parse(productImage);
            if (image && image.url !== null) {
                return image.url;
            }
        }
        return null;
    }



    useEffect(() => {
        allProduct(props.indexPage, props.search);
    }, [props.indexPage, props.search])



    // show form price
    const [openModalPrice, setOpenModalPrice] = useState(false);
    const [productId, setProductId] = useState();


    const onClickModalPice = (productId) => {
        setProductId(productId);
        setOpenModalPrice(!openModalPrice);
    }

    const toggleModalPrice = () => {
        setOpenModalPrice(!openModalPrice);
    }




    return (
        <>
            {
                (store.items && store.items.length > 0) &&
                !props.loading && <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            {
                                attributeDisplay && attributeDisplay.map((attribute, index) => {
                                    return <th scope="col" className="text-center" key={index}>{Language.getContent(attribute, "PRODUCT")}</th>
                                })
                            }
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.items.map((item, index) => {
                                return (
                                    <tr key={item.productId + 1}>
                                        <td className="text-center">#{item.productId}</td>
                                        <td className="text-center"><img src={renderImage(item.productImage)} style={{ width: '80px', height: '80px' }} /></td>
                                        <td className="text-center">{item.productSKU}</td>
                                        <td className="text-center"><div className="limit-text"> {item.productName} </div></td>
                                        <td className="text-center">{item.categoryName}</td>
                                        <td className="text-center">{item.productType}</td>
                                        <td className="text-center">{item.productBrand}</td>
                                        <td className="text-center">
                                            <UncontrolledDropdown>
                                                <DropdownToggle
                                                    className=""
                                                    className={`text-grey ` + loading ? 'justify-content-center' : ''}
                                                    href="#pablo"
                                                    size="sm"
                                                    color=""
                                                    onClick={(e) => e.preventDefault()}

                                                >
                                                    {
                                                        elementStatus(loading, item, position)
                                                    }
                                                </DropdownToggle>
                                                <DropdownMenu className="dropdown-menu-arrow" right aria-haspopup="true" aria-expanded="false">
                                                    {
                                                        listStatus && listStatus.map((status, indexStatus) => {
                                                            return (
                                                                <DropdownItem
                                                                    key={indexStatus + 1}
                                                                    onClick={() => changeStatus(item.productId, indexStatus, item.productStatus)}
                                                                    className={indexStatus === item.productStatus ? "active" : null}
                                                                >
                                                                    <Badge color="" className="badge-dot mr-4">
                                                                        <i className={"bg-" + status.color} />
                                                                        {status.text}
                                                                    </Badge>
                                                                </DropdownItem>
                                                            )
                                                        })
                                                    }
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </td>

                                        <td className="text-right">
                                            {
                                                (item.role != 1) &&
                                                <UncontrolledDropdown>
                                                    <DropdownToggle
                                                        className="btn-icon-only text-light"
                                                        href="#pablo"
                                                        role="button"
                                                        size="sm"
                                                        color=""
                                                        onClick={(e) => e.preventDefault()}
                                                    >
                                                        <i className="fas fa-ellipsis-v" />
                                                    </DropdownToggle>
                                                    <DropdownMenu className="dropdown-menu-arrow" right>
                                                        <DropdownItem
                                                            onClick={() => onClickModalPice(item && item.productId)}
                                                        >
                                                            Prices
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={() => props.onClickFormUpdate(item)}
                                                        >
                                                            Update
                                                        </DropdownItem>
                                                        <DropdownItem
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            Delete
                                                        </DropdownItem>
                                                    </DropdownMenu>
                                                </UncontrolledDropdown>

                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </Table >
            }
            {
                props.loading && <Loading size={8} />
            }
            <ModalPrice toggleModel={toggleModalPrice} open={openModalPrice} productId={productId} />
        </>
    );
}

export default ListProduct;