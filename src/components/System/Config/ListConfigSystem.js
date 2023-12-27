import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Progress,
    Table,
} from "reactstrap";

import ConfigSystemContext from '../../../context/ConfigSystemContext';

// core components

import Services from "../../../services/index";
import Instance from '../../../utils/singleton';
import systemConfig from '../../../settings/systemConfig.json';

import { useEffect, useContext, useState } from 'react';
import Loading from "components/Common/Loading";

const ListConfigSystem = (props) => {
    const Helper = Instance.getInstanceHelper();
    const Language = Instance.getInstaceLanguage();

    const { store, dispatch } = useContext(ConfigSystemContext);
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState();

    const listStatus = systemConfig["STATUS"];
    const attributeDisplay = systemConfig["ATTRIBUTE_DISPLAY"];

    const listConfig = async (indexPage, search) => {
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


    const changeStatus = async (id, status, currentStatus) => {
        if (status !== currentStatus) {
            setLoading(true);
            setPosition(id);

            const res = await Services.getInstanceConfig().changeStatus(id, status);

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
            <i className={"bg-" + listStatus[item.status].color} />
            {
                listStatus[item.status].text
            }
        </Badge>;

        if (loading && position == item.id) {
            elements = <Loading size={2} />;
        }

        return elements;
    }



    useEffect(() => {
        listConfig(props.indexPage, props.search);
    }, [props.indexPage, props.search])

    return (
        <>
            {
                (store.items && store.items.length > 0) &&
                !props.loading && <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                        <tr>
                            {
                                attributeDisplay && attributeDisplay.map((attribute, index) => {
                                    return <th scope="col" className="text-center" key={index}>{Language.getContent(attribute, "SYSTEM_CONFIG")}</th>
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
                                        <td className="text-center">#{item.id}</td>
                                        <td className="text-center">{item.name}</td>
                                        <td className="text-center">{item.key}</td>
                                        <td className="text-center">{item.value}</td>
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
                                                                    onClick={() => changeStatus(item.id, indexStatus, item.status)}
                                                                    className={indexStatus === item.status ? "active" : null}
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
                                                        onClick={() => props.onClickFormUpdate(item)}
                                                    >
                                                        Update
                                                    </DropdownItem>
                                                    <DropdownItem
                                                        onClick={() => props.onClickDelete(item.id)}
                                                    >
                                                        Delete
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
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
        </>
    );
}

export default ListConfigSystem;