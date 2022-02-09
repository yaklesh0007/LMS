import React, { Component } from 'react';
import { Col, Container, Row ,Card} from 'reactstrap';

export default class Footer extends Component {
  render() {
    return <div>
    <Container className='mb-2'>
    <Row>
    <Col className='text-center'>
    <Card>

    <p>CopyRight Belong to : AAGroup of Company 2022</p>
    </Card>
    </Col>
    </Row>
    </Container>
    </div>;
  }
}
