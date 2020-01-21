import React, { useState } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Table
} from 'reactstrap';

const Body = () => {
    return (
        <div>
            <Card>
                <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />
                <CardBody>
                    <CardTitle>Card title</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    <Button>Button</Button>
                </CardBody>
            </Card>
            <div>
                <Table>
                    <thead>
                        <tr>
                            {['one', 'two', 'three', 'four'].map(content =>
                                <th>{content}</th>)}
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
            </div>
        </div>
    )
}

export default Body