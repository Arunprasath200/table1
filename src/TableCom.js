
import React from 'react';
import { useTable } from 'react-table';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import './Table.css';

export const Table = ({ rows, deleteRow, editRow }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'TaskName', accessor: 'TaskName' },
      { Header: 'AssignedTo', accessor: 'AssignedName' },
      { Header: 'StartDate', accessor: 'StartDate' },
      { Header: 'EndDate', accessor: 'EndDate' },
      { Header: 'Tags', accessor: 'Tags', Cell: ({ value }) => <span className={`label label-${value}`}>{value.charAt(0).toUpperCase() + value.slice(1)}</span> },
      { Header: 'Followers', accessor: 'Followers' },
      { Header: 'Description', accessor: 'Description', className: 'expand' },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: ({ row }) => (
          <span className="actions">
            <BsFillPencilFill onClick={() => editRow(row.index)} />
            <BsFillTrashFill className="delete-btn" onClick={() => deleteRow(row.index)} />
          </span>
        ),
      },
    ],
    [] 
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows: tableRows, prepareRow } = useTable({ columns, data: rows });

  return (
    <div className="table-wrapper">
      <table className="table" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {tableRows.map((row) => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
