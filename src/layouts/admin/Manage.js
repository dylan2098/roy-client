import { Card, CardBody, CardTitle, Container, Row, Col, CardHeader } from "reactstrap";
import { NavLink, Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import React from "react";
import tabsManage from '../../tabsManage';
import Instance from "../../utils/singleton";

const Tab = (props) => {
    const Language = Instance.getInstaceLanguage();

    const tab = props.tab;
    return (
        <Col lg="6" xl="3" tag={Link} to={tab.path} className="mb-3">
            <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                    <Row>
                        <div className="col d-inline-flex p-2 justify-content-center">
                            <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0 "
                            >
                                {Language.getContent(tab.name, 'SYSTEM')}
                            </CardTitle>
                        </div>
                        <Col className="col-auto">
                            <div className={"icon icon-shape text-white rounded-circle shadow " + tab.color}>
                                <i className={tab.icon}></i>
                            </div>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
}

const ManagementType = (props) => {
    const Language = Instance.getInstaceLanguage();
    const type = props.types;
    const tabs = type.values;
    return (
        <>
            <Row className={"mb-4"}>
                <div className="col">
                    <Card className="shadow">
                        <CardHeader className="border-0">
                            <h3 className="mb-0"> {Language.getContent(type.name, 'SYSTEM')}</h3>
                        </CardHeader>

                        <Row>
                            {tabs.map(tab => (tab.status != 0) && <Tab tab={tab} key={tab.key} />)}
                        </Row>
                    </Card>
                </div>
            </Row>
        </>
    )
}


const Tabs = () => {
    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>

                {
                    tabsManage.map((types, key) => {
                        return (types.status != 0) && <ManagementType key={key + 1} types={types} />
                    })
                }
                {/* Card stats */}
            </Container >
        </>
    );
};

export default Tabs;
