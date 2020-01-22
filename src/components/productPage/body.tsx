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
  titleName: string;
  subTitle: string;
  ecoScore: string;
  photoUrl: string;
  details: string;
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
  const handleSearch = function(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  };

  const handleSubmit = async function() {
    const dataU = await getData(search);
    setResponse(dataU);
    console.log(dataU);
  };

  return (
    <div>
      {response['msg'] === 'Success' && loaded && (
        <div className='align-items-center'>
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
                  <h3>{response['mainProduct']['titleName']}</h3>
                </CardTitle>
                <CardSubtitle>
                  <h5>{response['mainProduct']['subTitle']}</h5>
                </CardSubtitle>
                <CardText>
                  <b>WingSpan Score:</b> {response['mainProduct']['ecoScore']}
                </CardText>
                <CardText>
                  <b>Price:</b> {response['mainProduct']['price']}
                </CardText>
                <CardText>
                  <b>Other Details:</b> {response['mainProduct']['details']}
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
                    response['mainProduct']['titleName'],
                    response['firstSuggestion']['titleName'],
                    response['secondSuggestion']['titleName'],
                    response['thirdSuggestion']['titleName']
                  ].map((content, index) => (
                    <td key={index}>
                      <h5>{content}</h5>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>WingSpan Score: </b>
                  </th>
                  {[
                    response['mainProduct']['ecoScore'],
                    response['firstSuggestion']['ecoScore'],
                    response['secondSuggestion']['ecoScore'],
                    response['thirdSuggestion']['ecoScore']
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
                    <td key={index}>{content}</td>
                  ))}
                </tr>
                <tr>
                  <th className='rowTable'>
                    <b>More Details: </b>
                  </th>
                  {[
                    response['mainProduct']['details'],
                    response['firstSuggestion']['details'],
                    response['secondSuggestion']['details'],
                    response['thirdSuggestion']['details']
                  ].map((content, index) => (
                    <td key={index}>{content}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {!loaded && <div>loading...</div>}
      {response['msg'] === 'No URL' && loaded && (
        <div>
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
