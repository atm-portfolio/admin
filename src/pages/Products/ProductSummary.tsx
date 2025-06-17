import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  SizeColumnsToFitGridStrategy,
  GridApi,
} from 'ag-grid-community';

import { Link } from 'react-router-dom';

import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import { apiWithToken } from '../../utils/service';
import { ProductColumnType } from '../../types/grid';
import authProvider from '../../utils/auth';
import useWindowDimensions from '../../hooks/useWindowDimensions';

import productImg from '../../assets/images/product.svg';
import { getColWidth } from '../../utils/transforms';

function Actions({
  data,
  setSelected,
}: {
  data: ProductColumnType;
  setSelected: React.Dispatch<React.SetStateAction<ProductColumnType>>;
}) {
  const role = authProvider.getRole();
  return (
    <div className="actions">
      <Link className="edit" to={`${ROOT_PATH}/products/${data._id}`}>
        <i className="fa-solid fa-pen"></i>
      </Link>
      {role === 'ADMIN' && (
        <a
          className="delete"
          onClick={() => {
            setSelected(data);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </a>
      )}
    </div>
  );
}

function Image() {
  return (
    <img
      src={productImg}
      alt="Product Image"
      width={30}
      height={30}
      style={{ objectFit: 'cover', top: 5, position: 'relative' }}
    />
  );
}

export default function ProductSummary(): React.ReactElement {
  const gridApi = useRef<GridApi<ProductColumnType> | null>(null);
  const [width] = useWindowDimensions();

  const [selected, setSelected] = useState({} as ProductColumnType);
  const [rowData, setRowData] = useState([] as ProductColumnType[]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const role = authProvider.getRole();

  useEffect(() => {
    const isAuthenticated = authProvider.checkAuth();
    if (!isAuthenticated) return;
    apiWithToken()
      .get(`${apiBaseUrl}/products`)
      .then((res) => res.data)
      .then((data) => setRowData(data));
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: 'name' },
    { field: 'description' },
    { field: 'code' },
    { field: 'image', cellRenderer: Image },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: getColWidth(width),
      maxWidth: getColWidth(width),
      minWidth: getColWidth(width),
      cellRenderer: ({ data }: { data: ProductColumnType }) =>
        Actions({ data, setSelected }),
      pinned: 'right',
    },
  ] as ColDef<ProductColumnType>[]);

  const autoSizeStrategy: SizeColumnsToFitGridStrategy = useMemo(() => {
    return {
      type: 'fitGridWidth',
    };
  }, []);

  useEffect(() => {
    if (gridApi.current) {
      if (gridApi.current.isDestroyed()) return;
      setTimeout(() => gridApi.current?.sizeColumnsToFit(), 0);
      setColDefs((prev) => {
        return prev.map((colDef) => {
          if (colDef.colId === 'actions') {
            return {
              ...colDef,
              maxWidth: width < 400 ? 130 : 80,
            };
          }
          return colDef;
        });
      });
    }
  }, [width]);

  return (
    <div className="app-project">
      <nav className="crud-nav">
        <h3>
          <Link to="/">Home</Link> {'>'} <span>Products</span>
        </h3>
        {role === 'ADMIN' && (
          <Link to={`${ROOT_PATH}/products/new`}>
            <i
              className="fa-solid fa-circle-plus"
              title="New Product"
              style={{ fontSize: 30 }}
            ></i>
          </Link>
        )}
      </nav>

      <AgGridReact
        onGridReady={(params) => {
          params.api.sizeColumnsToFit();
          gridApi.current = params.api;
        }}
        rowData={rowData}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
        domLayout="autoHeight"
      />
      {selected._id && (
        <dialog className="modal">
          <div className="modal-content">
            <h4>
              Are you sure you want to delete{' '}
              <span className="highlight">{selected.name}</span>?
            </h4>
            <p className="warning">
              <strong>WARNING:</strong>This action cannot be undone
            </p>
            {errorMessage && <p>{errorMessage}</p>}
            <div className="modal-buttons">
              <button
                onClick={() => setSelected({} as ProductColumnType)}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={() => {
                  setIsLoading(true);

                  apiWithToken()
                    .delete(`${apiBaseUrl}/products/${selected._id}`)
                    .then(() => {
                      setIsLoading(false);
                      setSelected({} as ProductColumnType);
                      setRowData((prev) =>
                        prev.filter((product) => product._id !== selected._id)
                      );
                    })
                    .catch(() => {
                      setIsLoading(false);
                      setErrorMessage(
                        'Failed to delete product. Please try again.'
                      );
                    });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
}
