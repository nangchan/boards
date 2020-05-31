import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import CurrencyFormat from 'react-currency-format';
import { Link as RouterLink, Switch, Route } from 'react-router-dom';
import { leaders } from './Leaders';

const useStyles = makeStyles({
  balanceContext: {
    flex: 1,
  },
  link: {
    textDecoration: 'none',
  },
});

export default function Balance() {
  const classes = useStyles();

  // // const salesStats: {wonAmount: Number, openAmount: Number, lostAmount: number} = deals.reduce(
  // const salesStats = deals.reduce(
  //   (stats, row) => ({
  //     ...stats,
  //     wonAmount:
  //       (stats?.wonAmount || 0) +
  //       (row.deal.status === 'won' ? row.deal.value : 0),
  //     openAmount:
  //       (stats?.openAmount || 0) +
  //       (row.deal.status === 'open' ? row.deal.value : 0),
  //     lostAmount:
  //       (stats?.lostAmount || 0) +
  //       (row.deal.status === 'lost' ? row.deal.value : 0),
  //   }),
  //   {}
  // );

  return (
    <React.Fragment>
      <Switch>
        <Route path="/dashboard/open">
          <RouterLink to="/" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Won:
              <CurrencyFormat
                value={leaders.totals.won}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
          <br />
          <Title>Open</Title>
          <Typography component="p" variant="h4">
            <CurrencyFormat
              value={leaders.totals.open}
              thousandSeparator={true}
              displayType="text"
            />
          </Typography>
          <br />
          <RouterLink to="/dashboard/lost" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Lost:
              <CurrencyFormat
                value={leaders.totals.lost}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
        </Route>

        <Route path="/dashboard/lost">
          <RouterLink to="/" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Won:
              <CurrencyFormat
                value={leaders.totals.won}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
          <br />
          <RouterLink to="/dashboard/open" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Open:
              <CurrencyFormat
                value={leaders.totals.open}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
          <br />
          <Title>Lost</Title>
          <Typography component="p" variant="h4">
            <CurrencyFormat
              value={leaders.totals.lost}
              thousandSeparator={true}
              displayType="text"
            />
          </Typography>
        </Route>

        <Route path="/">
          <Title>Won</Title>
          <Typography component="p" variant="h4">
            <CurrencyFormat
              value={leaders.totals.won}
              thousandSeparator={true}
              displayType="text"
            />
          </Typography>
          <br />
          <RouterLink to="/dashboard/open" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Open:
              <CurrencyFormat
                value={leaders.totals.open}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
          <br />
          <RouterLink to="/dashboard/lost" className={classes.link}>
            <Typography
              color="textSecondary"
              className={classes.balanceContext}
            >
              Lost:
              <CurrencyFormat
                value={leaders.totals.lost}
                thousandSeparator={true}
                displayType="text"
              />
            </Typography>
          </RouterLink>
        </Route>
      </Switch>
    </React.Fragment>
  );
}
