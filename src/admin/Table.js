import React, { useMemo, useState } from 'react';
import { useTable, usePagination, useRowState } from 'react-table';

export default function Table ({ data }) {
  const [newRow, setNewRow] = useState({
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: ''
  });

  // Define columns
  const columns = useMemo(
    () => [
      { Header: 'Column 1', accessor: 'col1' },
      { Header: 'Column 2', accessor: 'col2' },
      { Header: 'Column 3', accessor: 'col3' },
      { Header: 'Column 4', accessor: 'col4' },
      { Header: 'Column 5', accessor: 'col5' },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <>
            <button onClick={() => row.toggleRowSelected()}>
              Edit
            </button>
            <button onClick={() => handleDelete(row.index)}>
              Delete
            </button>
          </>
        )
      }
    ],
    []
  );

  // Define table instance with editable rows
  const tableInstance = useTable(
    {
      columns,
      data,
      autoResetPage: false,
      autoResetSelectedRows: false,
      autoResetRowState: false,
      initialState: {
        pageSize: 5
      }
    },
    usePagination,
    useRowState
  );

  // Extract necessary properties from table instance
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    pageCount,
    gotoPage,
    state: { pageIndex, selectedRowIds },
    selectedFlatRows
  } = tableInstance;

  // Handle input changes for new row
  const handleNewRowChange = (event) => {
    const { name, value } = event.target;
    setNewRow(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle submission of new row
  const handleNewRowSubmit = (event) => {
    event.preventDefault();
    const updatedData = [...data, newRow];
    setNewRow({
      col1: '',
      col2: '',
      col3: '',
      col4: '',
      col5: ''
    });
    tableInstance.setAllCellValues(
      updatedData.map(row => Object.values(row))
    );
  };

  // Handle deletion of rows
  const handleDelete = (index) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    tableInstance.setAllCellValues(
      updatedData.map(row => Object.values(row))
    );
  };

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
</table>
        </div>
        );
        }