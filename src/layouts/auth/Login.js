import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import Services from "../../services/index";
import Instance from "../../utils/singleton";
import { useState, useEffect } from "react";
import Loading from "components/Common/Loading";

const Login = () => {
  const Language = Instance.getInstaceLanguage();

  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [isResponse, setIsResponse] = useState();
  const [lang, setLang] = useState(localStorage.royClient_lang ? Language.getLanguageByLocale(localStorage.royClient_lang) : Language.getLocale(0));

  const onSubmit = async (data) => {
    setIsResponse(false);

    try {
      const res = await Services.getInstanceAuth().login(data);

      if (res && res.statusCode !== 200) {
        setIsResponse(true);
        return setMessage(res.message);
      }

      if (res && res.data && res.data.role !== 1 && res.data.status === 1) {
        setIsResponse(true);
        return setMessage('Permission denined');
      }

      if (res.statusCode === 200) {
        Services.getInstanceAuth().setStorage(res.data);
        setIsResponse(true);
        history.replace(from);
      }

    } catch (error) {
      setMessage(error.message);
      setIsResponse(true);
    }
  }


  const onClickGetLang = (index) => {
    setLang(Language.getLocale(index));
  }


  useEffect(() => {
    if (isResponse === false) {
      setLoading(true);
    } else {
      setLoading(false);
    }

    if (lang != localStorage.royClient_lang) {
      localStorage.royClient_lang = lang.LOCALE;
    }

  }, [isResponse, lang])

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>{Language.getContent('TITLE_LOGIN', 'AUTH')}</small>
            </div>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={Language.getContent('USER_NAME', 'AUTH')}
                    type="text"
                    autoComplete="new-username"
                    {...register("username", { required: true, min: 5 })}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder={Language.getContent('PASSWORD', 'AUTH')}
                    type="password"
                    autoComplete="new-password"
                    {...register("password", { required: true, min: 8 })}
                  />
                </InputGroup>
              </FormGroup>
              {message && <div className="justify-content-center text-center text-danger">{message}</div>}
              <div className="text-center">
                {
                  !loading && <Button className="my-4" color="primary" type="submit">
                    {Language.getContent('SIGN_IN', 'AUTH')}
                  </Button>
                }
                {
                  loading && <Button className="my-4" color="primary" type="submit">
                    <Loading size={2} />
                  </Button>
                }

                <UncontrolledDropdown>
                  <DropdownToggle caret color="default" id="navbarDropdownMenuLink2">
                    {
                      <>
                        <img
                          alt="..."
                          className="pr-1"
                          src={lang && Language.getFlag(lang.LOCALE)}
                        ></img>
                        {
                          lang && lang.NAME
                        }
                      </>
                    }
                  </DropdownToggle>

                  <DropdownMenu aria-labelledby="navbarDropdownMenuLink2">
                    {
                      Language.getListLanguages().map((lang, index) => {
                        return <DropdownItem href="#pablo" onClick={() => onClickGetLang(index)} key={index} active={localStorage.royClient_lang === lang.LOCALE}>
                          <img
                            alt="..."
                            src={Language.getFlag(lang.LOCALE)}
                            className="pr-1"
                          ></img>
                          {lang.NAME}
                        </DropdownItem>
                      })
                    }
                  </DropdownMenu>
                </UncontrolledDropdown>

              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>{Language.getContent('FORGOT_PASSWORD', 'AUTH')}</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
