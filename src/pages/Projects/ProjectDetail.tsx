import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import { apiWithToken } from '../../utils/service';

import Form from '../../components/Form';
import Input from '../../components/Input';
import { ProjectColumnType } from '../../types/grid';
import authProvider from '../../utils/auth';

export default function ProjectDetail(): React.ReactElement {
  const location = useLocation();
  const [project, setProject] = useState<ProjectColumnType>({
    _id: '',
    name: '',
    description: '',
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const isNewProject = location?.pathname === `${ROOT_PATH}/projects/new`;

  const role = authProvider.getRole();

  useEffect(() => {
    setLoading(true);

    apiWithToken()
      .get(`${apiBaseUrl}/products`)
      .then((res) => {
        if (isNewProject) {
          setLoading(false);
        }
        setProducts(res.data);
      })
      .catch(() => {
        setLoading(false);
      });

    if (isNewProject) {
      return;
    }

    const objectId = location?.pathname.split('/').pop();
    const url = `${apiBaseUrl}/projects/${objectId}`;

    apiWithToken()
      .get(url)
      .then((res) => {
        setProject(res.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [isNewProject, location]);

  if (loading) {
    return (
      <div className="app-about">
        <h3>Loading...</h3>
      </div>
    );
  }

  return (
    <div className="app-about">
      <h3>
        <Link to={ROOT_PATH}>Home</Link> {'>'}{' '}
        <Link to={`${ROOT_PATH}/projects`}>Projects</Link> {'>'}{' '}
        {isNewProject ? 'New Project' : project.name}
      </h3>
      <h3></h3>
      <Form initialValues={project}>
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
          label="Description"
          name="description"
          type="textarea"
          disabled={role !== 'ADMIN'}
        />
        <Input
          label="Products"
          name="products"
          type="select"
          multiple
          options={products}
          disabled={role !== 'ADMIN'}
        />
      </Form>
    </div>
  );
}
