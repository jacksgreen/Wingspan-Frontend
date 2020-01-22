import React, { useState, useEffect } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table
} from 'reactstrap';
import { getResponse } from '../../api';
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

const Body = () => {
  const [response, setResponse] = useState<Response | undefined>({
    msg: 'Not Loaded'
  });
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    getResponse().then(resp => {
      console.log(resp);
      setResponse(resp);
      setLoaded(true);
    });
  }, []);

  return (
    <div>
      {response['msg'] === 'Success' && loaded && (
        <div className='align-items-center'>
          <Card className='align-items-center p-1 w-50'>
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
                WingSpan Score: {response['mainProduct']['ecoScore']}
              </CardText>
              <CardText>Price: {response['mainProduct']['price']}</CardText>
              <CardText>
                Other Detials: {response['mainProduct']['details']}
              </CardText>
            </CardBody>
          </Card>
          <div>
            <Table>
              <thead>
                <tr>
                  {[
                    response['mainProduct']['titleName'],
                    response['firstSuggestion']['titleName'],
                    response['secondSuggestion']['titleName'],
                    response['thirdSuggestion']['titleName']
                  ].map((content, index) => (
                    <th key={index}>{content}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope='row'>1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope='row'>2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope='row'>3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      )}
      {!loaded && <div>loading...</div>}
      {response['msg'] === 'No URL' && loaded && <div>Jacks Page</div>}
    </div>
  );
};

export default Body;
