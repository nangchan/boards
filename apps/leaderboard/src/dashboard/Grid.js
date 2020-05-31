import React, { Component } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import './grid.css';

export default class Grid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modules: AllCommunityModules,
      columnDefs: [
        {
          field: 'athlete',
          width: 150,
          suppressSizeToFit: true,
        },
        {
          field: 'age',
          headerName: 'Age of Athlete',
          width: 90,
          minWidth: 50,
          maxWidth: 150,
        },
        {
          field: 'country',
          width: 120,
        },
        {
          field: 'year',
          width: 90,
        },
        {
          field: 'date',
          width: 110,
        },
        {
          field: 'sport',
          width: 110,
        },
        {
          field: 'gold',
          width: 100,
        },
        {
          field: 'silver',
          width: 100,
        },
        {
          field: 'bronze',
          width: 100,
        },
        {
          field: 'total',
          width: 100,
        },
      ],
      defaultColDef: { resizable: true },
      rowData: null,
    };
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = (data) => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json',
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData(JSON.parse(httpRequest.responseText));
      }
    };
  };

  sizeToFit = () => {
    this.gridApi.sizeColumnsToFit();
  };

  autoSizeAll = (skipHeader) => {
    const allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds, skipHeader);
  };

  render() {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <div className="outer-div">
          <div className="button-bar">
            <button onClick={() => this.sizeToFit()}>Size to Fit</button>
            <button onClick={() => this.autoSizeAll(false)}>
              Auto-Size All
            </button>
            <button onClick={() => this.autoSizeAll(true)}>
              Auto-Size All (Skip Header)
            </button>
          </div>
          <div className="grid-wrapper">
            <div
              id="myGrid"
              style={{
                height: '100%',
                width: '100%',
              }}
              className="ag-theme-alpine"
            >
              <AgGridReact
                modules={this.state.modules}
                columnDefs={this.state.columnDefs}
                defaultColDef={this.state.defaultColDef}
                rowData={this.state.rowData}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
