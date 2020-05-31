import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import deals from './deals.stub';

export const leaders = deals.reduce(
  (stats, row) => ({
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

export default function Leaders() {
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
          {Object.values(leaders).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id ? row.name : <b>{row.name}</b>}</TableCell>
              <TableCell>{row.id ? row.won : <b>{row.won}</b>}</TableCell>
              <TableCell>{row.id ? row.open : <b>{row.open}</b>}</TableCell>
              <TableCell>{row.id ? row.lost : <b>{row.lost}</b>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
