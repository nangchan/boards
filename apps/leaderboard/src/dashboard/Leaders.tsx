import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import deals from './deals.stub';

interface FStat {
  id: number;
  name: string;
  won: number;
  open: number;
  lost: number;
}

export const leaders: { [key: string]: FStat } = deals.reduce(
  (stats: { [key: string]: FStat }, row: any) => ({
    ...stats,
    [row.creator.id]: {
      id: row.creator.id,
      name: `${row.person.firstName} ${row.person.firstName}`,
      won: (stats?.[row.creator.id]?.won || 0) + +(row.deal.status === 'won'), // '+' converts boolean to number
      open:
        (stats?.[row.creator.id]?.open || 0) + +(row.deal.status === 'open'),
      lost:
        (stats?.[row.creator.id]?.lost || 0) + +(row.deal.status === 'lost'),
    },
    totals: {
      id: 0,
      name: 'Totals',
      won: (stats?.totals?.won || 0) + +(row.deal.status === 'won'),
      open: (stats?.totals?.open || 0) + +(row.deal.status === 'open'),
      lost: (stats?.totals?.lost || 0) + +(row.deal.status === 'lost'),
    },
  }),
  {}
);

const sortedLeaders: FStat[] = Object.values(leaders)
  .filter((row) => row.id)
  .sort((row1, row2) => row2.won - row1.won);

export default function Leaders() {
  // const [state, setState] = useState({
  //   columnDefs: [
  //     { headerName: 'Sales Person', field: 'name' },
  //     { headerName: 'Open', field: 'open' },
  //     { headerName: 'Won', field: 'won' },
  //     { headerName: 'Lost', field: 'lost' },
  //   ],
  //   defaultColDef: { resizable: true },
  //   rowData: Object.values(leaders),
  // });

  return (
    <React.Fragment>
      <Title>Leaders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Sales Person</b>
            </TableCell>
            <TableCell>
              <b>Open</b>
            </TableCell>
            <TableCell>
              <b>Won</b>
            </TableCell>
            <TableCell>
              <b>Lost</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLeaders.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.open}</TableCell>
              <TableCell>{row.won}</TableCell>
              <TableCell>{row.lost}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <b>{leaders.totals.name}</b>
            </TableCell>
            <TableCell>
              <b>{leaders.totals.open}</b>
            </TableCell>
            <TableCell>
              <b>{leaders.totals.won}</b>
            </TableCell>
            <TableCell>
              <b>{leaders.totals.lost}</b>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
