import React, { useState, useMemo, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  SizeColumnsToFitGridStrategy,
  GridApi,
} from 'ag-grid-community';

import { apiBaseUrl, ROOT_PATH } from '../../utils/constants';
import { apiWithToken } from '../../utils/service';
import { Link } from 'react-router-dom';
import { ProjectColumnType } from '../../types/grid';
import authProvider from '../../utils/auth';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { getColWidth } from '../../utils/transforms';

function Actions({
  data,
  setSelected,
}: {
  data: ProjectColumnType;
  setSelected: React.Dispatch<React.SetStateAction<ProjectColumnType>>;
}) {
  const role = authProvider.getRole();
  return (
    <div className="actions">
      <Link className="edit" to={`${ROOT_PATH}/projects/${data._id}`}>
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

function Products({ data }: { data: ProjectColumnType }) {
  return (
    <div className="pill">
      {data.products.length > 0 ? data.products.length : 'No'} Product(s)
    </div>
  );
}

export default function ProjectSummary(): React.ReactElement {
  const gridApi = useRef<GridApi<ProjectColumnType> | null>(null);
  const [width] = useWindowDimensions();

  const [selected, setSelected] = useState({} as ProjectColumnType);
  const [rowData, setRowData] = useState([] as ProjectColumnType[]);
  const [errorMessage, setErrorMessage] = useState('');

  const role = authProvider.getRole();

  useEffect(() => {
    const isAuthenticated = authProvider.checkAuth();
    if (!isAuthenticated) return;
    apiWithToken()
      .get(`${apiBaseUrl}/projects`)
      .then((res) => res.data)
      .then((data) => setRowData(data));
  }, []);

  const [colDefs, setColDefs] = useState([
    { field: 'name' },
    { field: 'description' },
    { field: 'products', cellRenderer: Products },
    {
      colId: 'actions',
      headerName: 'Actions',
      width: getColWidth(width),
      maxWidth: getColWidth(width),
      minWidth: getColWidth(width),
      cellRenderer: ({ data }: { data: ProjectColumnType }) =>
        Actions({ data, setSelected }),
      pinned: 'right',
    },
  ] as ColDef<ProjectColumnType>[]);

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
              maxWidth: getColWidth(width),
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
          <Link to="/">Home</Link> {'>'} <span>Projects</span>
        </h3>
        {role === 'ADMIN' && (
          <Link to={`${ROOT_PATH}/projects/new`}>
            <i
              className="fa-solid fa-circle-plus"
              title="New Project"
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
              <button onClick={() => setSelected({} as ProjectColumnType)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  apiWithToken()
                    .delete(`${apiBaseUrl}/projects/${selected._id}`)
                    .then(() => {
                      setSelected({} as ProjectColumnType);
                      setRowData((prev) =>
                        prev.filter((project) => project._id !== selected._id)
                      );
                    })
                    .catch(() => {
                      setErrorMessage(
                        'Failed to delete project. Please try again.'
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
      <br />
    </div>
  );
}
