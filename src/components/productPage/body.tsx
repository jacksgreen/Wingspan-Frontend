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
    const [response, setResponse] = useState<Response | undefined>({ 'msg': 'Not Loaded' })
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        getResponse().then(resp => {
            console.log(resp)
            setResponse(resp)
            setLoaded(true)
        }
        )
    }, [])

    return (
        <div>
            {response['msg'] === 'Success' && loaded &&
                <div className="align-items-center">
                    <div className="d-flex justify-content-center">
                        <Card className="align-items-center p-1 w-50 m-2">
                            <CardImg top className="mainCardImg" src={response.mainProduct.photoUrl} alt={response.mainProduct.photoUrl} />
                            <CardBody>
                                <CardTitle><h3>{response['mainProduct']['titleName']}</h3></CardTitle>
                                <CardSubtitle><h5>{response['mainProduct']['subTitle']}</h5></CardSubtitle>
                                <CardText><b>WingSpan Score:</b> {response['mainProduct']['ecoScore']}</CardText>
                                <CardText><b>Price:</b> {response['mainProduct']['price']}</CardText>
                                <CardText><b>Other Details:</b> {response['mainProduct']['details']}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    <th></th>
                                    {[response['mainProduct']['photoUrl'], response['firstSuggestion']['photoUrl'],
                                    response['secondSuggestion']['photoUrl'], response['thirdSuggestion']['photoUrl']]
                                        .map((content, index) =>
                                            <th key={index} className="colTable">
                                                <div className="imgInTable"
                                                    style={{ backgroundImage: `url(${content})` }}>
                                                </div>
                                            </th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th className="rowTable"><b>Title: </b></th>
                                    {[response['mainProduct']['titleName'], response['firstSuggestion']['titleName'],
                                    response['secondSuggestion']['titleName'], response['thirdSuggestion']['titleName']]
                                        .map((content, index) =>
                                            <td key={index}><h5>{content}</h5></td>)}
                                </tr>
                                <tr>
                                    <th className="rowTable"><b>WingSpan Score: </b></th>
                                    {[response['mainProduct']['ecoScore'], response['firstSuggestion']['ecoScore'],
                                    response['secondSuggestion']['ecoScore'], response['thirdSuggestion']['ecoScore']]
                                        .map((content, index) =>
                                            <td key={index}>{content}</td>)}
                                </tr>
                                <tr>
                                    <th className="rowTable"><b>Price: </b></th>

                                    {[response['mainProduct']['price'], response['firstSuggestion']['price'],
                                    response['secondSuggestion']['price'], response['thirdSuggestion']['price']]
                                        .map((content, index) =>
                                            <td key={index}>{content}</td>)}
                                </tr>
                                <tr>
                                    <th className="rowTable"><b>More Details: </b></th>
                                    {[response['mainProduct']['details'], response['firstSuggestion']['details'],
                                    response['secondSuggestion']['details'], response['thirdSuggestion']['details']]
                                        .map((content, index) =>
                                            <td key={index}>{content}</td>)}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>}
            {!loaded && <div>loading...</div>}
            {response['msg'] === 'No URL' && loaded && <div>Jacks Page</div>}

        </div >
    )
}

export default Body;
