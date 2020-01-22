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
  Label,
  Input
} from 'reactstrap';
import { getResponse, getData } from '../../api';
import './body.css';

interface Product {
  price: string;
  brand: string;
  title: string;
  composition: string[];
  type: string;
  parent_type: string;
  ecoscore: string;
  photoUrl: string;
  features: string[];
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
  const [response, setResponse] = useState<Response | undefined>({
    msg: 'Not Loaded'
  });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getResponse().then(resp => {
      console.log(resp);
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
    setSearch(event.target.value);
  };

  const handleSubmit = async function () {
    const dataU = await getData(search);
    setResponse(dataU);
    console.log(dataU);
  };

  return (
    <div>
      {response['msg'] === 'Success' && loaded && (
        <div className='align-items-center bodyContainer'>
          <div className='d-flex justify-content-center'>
            <Card className='align-items-center p-1 w-50 m-2 main-product-wrapper'>
              <CardImg
                top
                className='mainCardImg'
                src={response.mainProduct.photoUrl}
                alt={response.mainProduct.photoUrl}
              />
              <CardBody>
                <CardTitle>
                  <h3>{response['mainProduct']['title']}</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5>{response['mainProduct']['type']}</h5>
                </CardSubtitle>
                <CardText>
                  <b>WingSpan Score:</b> {response['mainProduct']['ecoscore']}
                </CardText>
                <CardText>
                  <b>Price: </b> ${response['mainProduct']['price']}
                </CardText>
                <CardText>
                  <b>Composition:</b>  <ul>
                    {response['mainProduct']['composition'].map((content, index) => {
                      return (<li key={index}>{content}</li>)
                    })}
                  </ul>
                </CardText>
                <CardText>
                  <b>Other Details:</b> <ul>
                    {response['mainProduct']['features'].map((content, index) => {
                      return (<li key={index}>{content}</li>)
                    })}
                  </ul>
                </CardText>
              </CardBody>
            </Card>
          </div>
          <div>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  {[
                    response['mainProduct']['photoUrl'],
                    response['firstSuggestion']['photoUrl'],
                    response['secondSuggestion']['photoUrl'],
                    response['thirdSuggestion']['photoUrl']
                  ].map((content, index) => (
                    <th key={index} className='colTable'>
                      <div
                        className='imgInTable'
                        style={{ backgroundImage: `url(${content})` }}
                      ></div>
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
                  <th className='rowTable'>
                    <b>Type: </b>
                  </th>
                  {[
                    response['mainProduct']['type'],
                    response['firstSuggestion']['type'],
                    response['secondSuggestion']['type'],
                    response['thirdSuggestion']['type']
                  ].map((content, index) => (
                    <td key={index}>
                      {content}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>WingSpan Score: </b>
                  </th>
                  {[
                    response['mainProduct']['ecoscore'],
                    response['firstSuggestion']['ecoscore'],
                    response['secondSuggestion']['ecoscore'],
                    response['thirdSuggestion']['ecoscore']
                  ].map((content, index) => (
                    <td key={index}>{content}</td>
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
                <th className='rowTable'>
                  <b>Composition: </b>
                </th>
                {[
                  response['mainProduct']['composition'],
                  response['firstSuggestion']['composition'],
                  response['secondSuggestion']['composition'],
                  response['thirdSuggestion']['composition']
                ].map((content, index) => (
                  <td><ul>
                    {content.map((inner, index) => {
                      return (<li key={index}>{inner}</li>)
                    })}
                  </ul></td>
                ))}
              </tr>
                <tr>
                  <th className='rowTable'>
                    <b>More Details: </b>
                  </th>
                  {[
                    response['mainProduct']['features'],
                    response['firstSuggestion']['features'],
                    response['secondSuggestion']['features'],
                    response['thirdSuggestion']['features']
                  ].map((content, index) => (
                    <td><ul>
                      {content.map((inner, index) => {
                        return (<li key={index}>{inner}</li>)
                      })}
                    </ul></td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {!loaded && <div>loading...</div>}
      {response['msg'] === 'No URL' && loaded && (
        <div className='backgroundImg'>
          <Form className='search-form-wrapper'>
            <FormGroup>
              <Input
                required
                type='text'
                name='home-search-bar'
                id='home-search-bar'
                placeholder='Enter a URL...'
                onChange={event => handleSearch(event)}
              ></Input>
            </FormGroup>
            <Button
              type='button'
              className='btn-search'
              onClick={() => handleSubmit()}
            >
              Search
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Body;
