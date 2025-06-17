import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ProductColumnType } from '../../types/grid';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { apiWithToken } from '../../utils/service';
import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import authProvider from '../../utils/auth';

export default function ProductDetail(): React.ReactElement {
  const location = useLocation();
  const [product, setProduct] = useState<ProductColumnType>({
    _id: '',
    name: '',
    code: '',
    description: '',
    image: undefined,
  });

  const isNewProduct = location?.pathname === `${ROOT_PATH}/products/new`;

  const role = authProvider.getRole();

  useEffect(() => {
    if (isNewProduct) {
      return;
    }

    const objectId = location?.pathname.split('/').pop();
    const url = `${apiBaseUrl}/products/${objectId}`;

    apiWithToken()
      .get(url)
      .then((res) => setProduct(res.data));
  }, [isNewProduct, location.pathname]);

  return (
    <div className="app-product">
      <h3>
        <Link to={ROOT_PATH}>Home</Link> {'>'}{' '}
        <Link to={`${ROOT_PATH}/products`}>Products</Link> {'>'}{' '}
        {isNewProduct ? 'New Product' : product.name}
      </h3>
      <Form initialValues={product}>
        <Input
          label="ID"
          name="_id"
          type="text"
          hidden
          disabled={role !== 'ADMIN'}
        />
        <Input
          label="Name"
          name="name"
          type="text"
          disabled={role !== 'ADMIN'}
        />
        <Input
          label="Code"
          name="code"
          type="text"
          placeholder="111-AAA-111"
          details="Format: 111-AAA-111"
          maxLength={11}
          disabled={role !== 'ADMIN'}
        />
        <Input
          label="Description"
          name="description"
          type="textarea"
          disabled={role !== 'ADMIN'}
        />
      </Form>
    </div>
  );
}
