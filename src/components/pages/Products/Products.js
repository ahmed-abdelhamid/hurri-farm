import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Table,
  Message,
  Dimmer,
  Loader,
  Input,
  FormField
} from 'semantic-ui-react';
import {
  getAllProducts,
  cleanProducts,
  editProductPrice
} from '../../../actions';
import { TABLE_HEADERS } from './fixtures';

const Products = ({
  products,
  getAllProducts,
  cleanProducts,
  editProductPrice
}) => {
  const [inputValue, setInputValue] = useState('');
  const [activeInput, setActiveInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getAllProducts();

    return () => cleanProducts();
  }, []);

  const handleClick = (id, price) => {
    try {
      const priceInt = parseInt(price);
      if (isNaN(priceInt)) {
        throw new Error();
      }
      editProductPrice(id, priceInt);
      setInputValue('');
    } catch (e) {
      setError('يرجى تحديد سعر المنتج');
    }
  };

  const handleInputFocus = id => {
    setActiveInput(id);
    setError('');
    setInputValue('');
  };

  const handleChange = value => {
    setError('');
    setInputValue(value);
  };

  const renderTableHeaders = () =>
    TABLE_HEADERS.map((header, index) => (
      <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
    ));

  const renderTabelRows = () =>
    products.map(product => (
      <Table.Row key={product.id}>
        <Table.Cell>{product.arabicName}</Table.Cell>
        <Table.Cell>{`${product.price} ريال سعودى`}</Table.Cell>
        <Table.Cell>
          <FormField inline>
            <Input
              action={{
                color: 'teal',
                labelPosition: 'left',
                icon: 'edit',
                content: 'تعديل السعر',
                onClick: () => handleClick(product.id, inputValue)
              }}
              fluid
              type="number"
              placeholder="تغيير السعر"
              error={error && product.id === activeInput ? true : false}
              value={product.id === activeInput ? inputValue : ''}
              onFocus={() => handleInputFocus(product.id)}
              onChange={(e, data) => handleChange(data.value)}
            />
          </FormField>
          {error && product.id === activeInput && (
            <Message error content={error} />
          )}
        </Table.Cell>
      </Table.Row>
    ));

  if (!products) {
    return (
      <Dimmer active inverted>
        <Loader size="medium">جارى البحث عن المنتجات المتاحة </Loader>
      </Dimmer>
    );
  }

  if (products.length === 0) {
    return (
      <Container>
        <Message
          className="text-center"
          header="عذرا"
          content="لا يوجد لديك منتجات مضافة"
          size="huge"
        />
      </Container>
    );
  }

  return (
    <Container>
      <Table striped style={{ margin: '50px 0' }}>
        <Table.Header>
          <Table.Row>{renderTableHeaders()}</Table.Row>
        </Table.Header>

        <Table.Body>{renderTabelRows()}</Table.Body>
      </Table>
    </Container>
  );
};

const mapStateToProps = ({ products }) => ({ products });

const mapDispatchToProps = dispatch => ({
  getAllProducts: () => dispatch(getAllProducts()),
  cleanProducts: () => dispatch(cleanProducts()),
  editProductPrice: (id, price) => dispatch(editProductPrice(id, price))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Products);
