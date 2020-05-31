import React, { useEffect, MouseEvent } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MaterialLink from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems } from './navigation';
import SalesPie from './SalesPie';
import Balance from './Balance';
import Deals from './Deals';
import Leaders from './Leaders';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import withWidth from '@material-ui/core/withWidth';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MaterialLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MaterialLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 340,
  },
}));

enum VARIANT_TYPE {
  PERMANENT = 'permanent',
  TEMPORARY = 'temporary',
  PERSISTENT = 'persistent',
}

function Dashboard({ width }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [variant, setVariant] = React.useState<VARIANT_TYPE>(
    VARIANT_TYPE.PERMANENT
  );
  const handleDrawerOpen = (_event: MouseEvent<HTMLDocument | HTMLElement>) => {
    setOpen(true);
  };
  const handleDrawerClose = (
    _event: MouseEvent<HTMLDocument | HTMLElement>
  ) => {
    setOpen(false);
  };
  const handleDrawerCloseOnClick = (
    _event: MouseEvent<HTMLDocument | HTMLElement>
  ) => {
    if (variant === VARIANT_TYPE.TEMPORARY) {
      setOpen(false);
    }
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    if (width === 'sm' || width === 'xs') {
      setVariant(VARIANT_TYPE.TEMPORARY);
      setOpen(false);
    } else {
      setVariant(VARIANT_TYPE.PERMANENT);
      setOpen(true);
    }
  }, [width, variant]);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
          variant={variant}
          // onBackdropClick={handleDrawerClose}
          onClick={handleDrawerCloseOnClick}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
          {/* <List>{secondaryListItems}</List> */}
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              {/* A <Switch> looks through its children <Route>s and
                  renders the first one that matches the current URL. */}
              <Switch>
                <Route path="/deals">
                  {/* All Deals */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Deals />
                    </Paper>
                  </Grid>
                </Route>
                <Route path="/(dashboard)?/:status?">
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper className={fixedHeightPaper}>
                      <SalesPie />
                    </Paper>
                  </Grid>
                  {/* Total Sales */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper className={fixedHeightPaper}>
                      <Balance />
                    </Paper>
                  </Grid>
                  {/* Leaders */}
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Leaders />
                    </Paper>
                  </Grid>
                </Route>
              </Switch>
            </Grid>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>
        </main>
      </div>
    </Router>
  );
}

export default withWidth()(Dashboard);
