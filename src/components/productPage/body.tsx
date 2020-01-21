import React, { useState, useEffect } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Table
} from 'reactstrap';
import { getResponse } from '../../api'

interface Product {
    price: string,
    titleName: string,
    subTitle: string,
    ecoScore: string,
    photoUrl: string,
    details: string,
}
interface Response {
    mainProduct?: Product,
    firstSuggestion?: Product,
    secondSuggestion?: Product,
    thirdSuggestion?: Product
}

const Body = () => {
    const [response, setResponse] = useState<Response>()
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
            {loaded &&
                <div>
                    <Card>
                        <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                        <CardBody>
                            <CardTitle>{response['mainProduct']['ecoScore']}</CardTitle>
                            <CardSubtitle>Card subtitle</CardSubtitle>
                            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                    <div>
                        <Table>
                            <thead>
                                <tr>
                                    {['one', 'two', 'three', 'four'].map((content, index) =>
                                        <th key={index}>{content}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Larry</td>
                                    <td>the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div></div>}
            {!loaded && <div>loading...</div>}
        </div>
    )
}

export default Body