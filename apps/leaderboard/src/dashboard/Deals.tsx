import React, { useState } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import deals from './deals.stub';
import CurrencyFormat from 'react-currency-format';
import { useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Deals(): React.ReactElement {
  const classes = useStyles();
  const location = useLocation();
  const [limit, setLimit] = useState(10);

  const increaseLimit = (event) => {
    // event.preventDefault();
    setLimit(limit + 10);
  };

  return (
    <React.Fragment>
      <Title>Deals</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Sales Person</b>
            </TableCell>
            <TableCell>
              <b>Client</b>
            </TableCell>
            <TableCell>
              <b>Company</b>
            </TableCell>
            <TableCell>
              <b>Deal Title</b>
            </TableCell>
            <TableCell>
              <b>Deal Status</b>
            </TableCell>
            <TableCell align="right">
              <b>Sale Amount</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deals
            .filter((_row, index) => index < limit)
            .map((row) => (
              <TableRow key={row.deal.id}>
                <TableCell>{`${row.creator.firstName} ${row.creator.lastName}`}</TableCell>
                <TableCell>{`${row.person.firstName} ${row.person.lastName}`}</TableCell>
                <TableCell>{row.company.name}</TableCell>
                <TableCell>{row.deal.title}</TableCell>
                <TableCell>{row.deal.status}</TableCell>
                <TableCell align="right">
                  <CurrencyFormat
                    // fixedDecimalScale={true}
                    // decimalScale={2}
                    thousandSeparator={true}
                    value={row.deal.value}
                    displayType="text"
                    prefix="$"
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {limit < deals.length && (
        <div className={classes.seeMore}>
          <Link
            color="primary"
            href={`${location.pathname}#`}
            onClick={increaseLimit}
          >
            See more orders
          </Link>
        </div>
      )}
    </React.Fragment>
  );
}
