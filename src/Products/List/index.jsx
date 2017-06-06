import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Filters from './Filters';
import Card from './Card';
import ProductsGrid from './styled';
import API from '../../api';
import { imageLink } from '../../utils';

const CardCol = props => (
  <Col xs={12} sm={6} md={6} lg={4}>
    {props.children}
  </Col>
);

export default class extends Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    this.fetchData(this.props.match.url);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps.match.url);
  }

  fetchData(url) {
    console.log(url);
    fetch(`${API}v1${url}`).then(
      (response) => {
        response.json().then((data) => {
          this.setState({ url, products: data.items.map(item => item) });
        });
      },
      (error) => {
        console.error(error);
      },
    );
  }

  render() {
    return (
      <div>
        <Filters />
        <ProductsGrid>
          <Grid fluid>
            <Row>
              {this.state.products.map((card, i) => (
                <CardCol key={card.id}>
                  <Card
                    img={imageLink(card.images[0].id, card.images[0].fileName)}
                    link={`${this.state.url}/${card.id}`}
                    price={card.price}
                    isSale={i % 5 === 0}
                  />
                </CardCol>
              ))}
            </Row>
          </Grid>
        </ProductsGrid>
      </div>
    );
  }
}
