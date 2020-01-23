import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
  Form,
  FormGroup,
  Tooltip,
  Input,
  Spinner,
  FormText,
  FormFeedback,
  UncontrolledCollapse
} from 'reactstrap';
import { getResponse, getData } from '../../api';
import './body.css';
import InfoIcon from '@material-ui/icons/Info';
import Autocount from './autoCount';


interface Product {
  price: string;
  brand: string;
  title: string;
  brand_score: string;
  cotton: string;
  cot_pcth: number;
  polyester: string;
  pol_pctg: number;
  ismale: number;
  ecoscore: number;
  co2: number;
  urlPhoto: string;
  weight: number;
  url: string;
  description: string;
}

interface Response {
  msg?: string;
  mainProduct?: Product;
  firstSuggestion?: Product;
  secondSuggestion?: Product;
  thirdSuggestion?: Product;
}
interface Props {
  showSearchPage: boolean;
}

const Body: React.FC<Props> = props => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isInvalid, setIsInvalid] = useState();
  const [isValid, setIsValid] = useState();
  const toggle = () => setTooltipOpen(!tooltipOpen);
  const wingspanFormulaDescription = 'F(BrandScore,co2)';
  const [response, setResponse] = useState<Response | undefined>({
    msg: 'Not Loaded'
  });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getResponse().then(resp => {
      setResponse(resp);
      setLoaded(true);
      const { showSearchPage } = props;
      if (showSearchPage) {
        let tempResponse = { ...response };
        tempResponse['msg'] = 'No URL';
        setResponse(tempResponse);
      }
    });
  }, []);

  const [search, setSearch] = useState('');
  const handleSearch = function (event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.match('^(https?://)?(www.)?(amazon.)+')) {
      setSearch(event.target.value);
      setButtonDisabled(false);
      setIsInvalid('');
      setIsValid(true);
    } else if (event.target.value == '') {
      setIsInvalid('');
      setIsValid('');
      setButtonDisabled(true);
    } else {
      setButtonDisabled(true);
      setIsInvalid(true);
      setIsValid(false);
    }
  };

  const handleSubmit = async function () {
    const dataU = await getData(search);
    setResponse(dataU);
  };

  return (
    <div className='outer-product-wrapper'>
      {response['msg'] === 'Success' && loaded && (
        <div className='align-items-center bodyContainer'>
          <div className='d-flex justify-content-center'>
            <Card className='align-items-center p-1 w-50 m-2 main-product-wrapper'>
              <CardBody>
                <div className='product-top-header'>
                  <CardTitle>
                    <h3>
                      <b>{response['mainProduct']['title']}</b>
                    </h3>
                  </CardTitle>
                  <CardImg
                    top
                    className='mainCardImg'
                    src={response.mainProduct.urlPhoto}
                    alt={response.mainProduct.urlPhoto}
                  />
                </div>
                <div className='product-top-body'>
                  <CardText>
                    <span id='Tooltip'>
                      <b>
                        WingSpan
                        <sup>
                          <InfoIcon className='superscript' />
                        </sup>
                        :
                      </b>{' '}
                      {response['mainProduct']['ecoscore'].toFixed(2)}
                    </span>
                    <Tooltip
                      placement='top'
                      isOpen={tooltipOpen}
                      target='Tooltip'
                      toggle={toggle}
                    >
                      {wingspanFormulaDescription}
                    </Tooltip>
                  </CardText>
                  <CardText>
                    <b>CO<sub>2</sub>: </b>{response['mainProduct']['co2']} kgs
                  </CardText>
                  <CardText>
                    <b>Price: </b> ${response['mainProduct']['price']}
                  </CardText>
                  <CardText>
                    <b>Weight: </b>{response['mainProduct']['weight'].toFixed(2)} kgs
                </CardText>
                  <CardText>
                    <b>Composition:</b>{' '}
                    <ul>
                      <li>Cotton: {response['mainProduct']['cot_pcth']}%</li>
                      <li>Polyester: {response['mainProduct']['pol_pctg']}%</li>
                    </ul>
                  </CardText>
                  <CardText>
                    <b>Other Details:</b>{' '}

                    <p>{response['mainProduct']['description']}</p>

                  </CardText>
                  <CardText></CardText>
                </div>
              </CardBody>
            </Card>
          </div>
          <div className='bottom-product-wrapper'>
            <Table>
              <thead>
                <tr compare-top-row>
                  <th></th>
                  {[
                    response['mainProduct']['urlPhoto'],
                    response['firstSuggestion']['urlPhoto'],
                    response['secondSuggestion']['urlPhoto'],
                    response['thirdSuggestion']['urlPhoto']
                  ].map((content, index) => (
                    <th key={index} className='colTable '>
                      <div className='compare-img'>
                        <div
                          className='imgInTable'
                          style={{ backgroundImage: `url(${content})` }}
                        ></div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th className='rowTable'>
                    <b>Title: </b>
                  </th>
                  {[
                    response['mainProduct']['title'],
                    response['firstSuggestion']['title'],
                    response['secondSuggestion']['title'],
                    response['thirdSuggestion']['title']
                  ].map((content, index) => (
                    <td key={index}>
                      <h5>{content}</h5>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable' >
                    <span id="Tooltip2"> <b >WingSpan<sup ><InfoIcon className="superscript" /></sup>: </b></span>
                    <Tooltip placement="top" isOpen={tooltipOpen} target="Tooltip2" toggle={toggle}>
                      {wingspanFormulaDescription}
                    </Tooltip>
                  </th>
                  {[
                    response['mainProduct']['ecoscore'],
                    response['firstSuggestion']['ecoscore'],
                    response['secondSuggestion']['ecoscore'],
                    response['thirdSuggestion']['ecoscore']
                  ].map((content, index) => (
                    <td key={index}>{content.toFixed(2)}</td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable' >
                    <b>CO<sub>2</sub>: </b>
                  </th>
                  {[
                    response['mainProduct']['co2'],
                    response['firstSuggestion']['co2'],
                    response['secondSuggestion']['co2'],
                    response['thirdSuggestion']['co2']
                  ].map((content, index) => (
                    <td> {content} kgs</td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>Price: </b>
                  </th>
                  {[
                    response['mainProduct']['price'],
                    response['firstSuggestion']['price'],
                    response['secondSuggestion']['price'],
                    response['thirdSuggestion']['price']
                  ].map((content, index) => (
                    <td key={index}>${content}</td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable' >
                    <b>Weight: </b>
                  </th>
                  {[
                    response['mainProduct']['weight'],
                    response['firstSuggestion']['weight'],
                    response['secondSuggestion']['weight'],
                    response['thirdSuggestion']['weight']
                  ].map((content, index) => (
                    <td> {  Number((content).toFixed(2))} kgs</td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>Composition: </b>
                  </th>
                  {[
                    [response['mainProduct']['cot_pcth'], response['mainProduct']['pol_pctg']],
                    [response['firstSuggestion']['cot_pcth'], response['firstSuggestion']['pol_pctg']],
                    [response['secondSuggestion']['cot_pcth'], response['secondSuggestion']['pol_pctg']],
                    [response['thirdSuggestion']['cot_pcth'], response['thirdSuggestion']['pol_pctg']]
                  ].map((content, index) => (
                    <td>
                      <ul className='product-description-list'>
                        {content.map((inner, index) => {
                          if (index == 0) {
                            return (<li key={index}>{inner}% Cotton</li>)
                          } else {
                            return (<li key={index}>{inner}% Polyester</li>)
                          }
                        })}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>More Details: </b>
                  </th>
                  {[
                    response['mainProduct']['description'],
                    response['firstSuggestion']['description'],
                    response['secondSuggestion']['description'],
                    response['thirdSuggestion']['description']
                  ].map((content, index) => (

                    <td>{content}</td>))}
                </tr>
                <tr>
                  <th className='rowTable'></th>
                  {[
                    response['mainProduct']['url'],
                    response['firstSuggestion']['url'],
                    response['secondSuggestion']['url'],
                    response['thirdSuggestion']['url']
                  ].map((content, index) => (
                    <td key={index}>
                      <a href={content} target='_blank'>
                        <b>Buy now</b>
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {!loaded && (
        <div>
          <Spinner type='grow' color='secondary' />
          <Spinner type='grow' color='secondary' />
          <Spinner type='grow' color='secondary' />
        </div>
      )}
      {response['msg'] === 'No URL' && loaded && (
        <div className='backgroundImg'>
          <Form className='search-form-wrapper'>
            <FormGroup>
              <Input
                required
                type='text'
                name='home-search-bar'
                id='home-search-bar'
                placeholder='Enter an Amazon URL...'
                onChange={event => handleSearch(event)}
                invalid={isInvalid}
                autoComplete='off'
                valid={isValid}
              ></Input>
            </FormGroup>
            <Button
              type='button'
              className='btn-search'
              onClick={() => handleSubmit()}
              disabled={buttonDisabled}
            >
              Search
            </Button>
            <Autocount />
          </Form>
        </div>
      )}
    </div>
  );
};

export default Body;
