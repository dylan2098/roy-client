import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Table,
} from "reactstrap";

import ProductPriceContext from '../../../context/ProductPriceContext';
// core components

import Services from "../../../services/index";
import Instance from '../../../utils/singleton';
import PriceProductConfig from '../../../settings/priceProductConfig.json';

import { useEffect, useContext, useState } from 'react';
import Loading from "components/Common/Loading";

const ListProductPrice = ({ productId, loadingList, onClickFormUpdate }) => {
    const Helper = Instance.getInstanceHelper();
    const Language = Instance.getInstaceLanguage();

    const { store, dispatch } = useContext(ProductPriceContext);
    const attributeDisplay = PriceProductConfig["ATTRIBUTE_DISPLAY"];


    // loading
    const [loading, setLoading] = useState(false);

    const listProductPrice = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    }

    useEffect(() => {
        listProductPrice();
    }, [])

    return (
        <>
            {
                (store && store.items && store.items.length > 0) &&
                !loadingList && <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            {
                                attributeDisplay && attributeDisplay.map((attribute, index) => {
                                    return <th scope="col" className="text-center" key={index}>{Language.getContent(attribute, "PRICE_PRODUCT")}</th>
                                })
                            }
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        {
                            store.items.map((item, index) => {
                                return (
                                    <tr key={item.id + 1}>
                                        <td className="text-center">{item.currencyCode}</td>
                                        <td className="text-center">{item.symbol}{item.basePrice}</td>
                                        <td className="text-center">{item.symbol}{item.grossPrice}</td>
                                        <td className="text-center">{item.symbol}{item.netPrice}</td>
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
                                                            onClick={() => onClickFormUpdate(item)}
                                                        >
                                                            Update
                                                        </DropdownItem>
                                                        <DropdownItem
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
                loadingList && <Loading size={8} />
            }
        </>
    );
}

export default ListProductPrice;