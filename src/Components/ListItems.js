import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export const mainListItems = (
  <div>
      <ListItem button onClick={() => window.location.href = '/admin'} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard"/>
      </ListItem>    
      <ListItem button onClick={() => window.location.href = '/pos'}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="POS" />
      </ListItem>
      <ListItem button onClick={() => window.location.href = '/stock'}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Stock" />
      </ListItem>

      <Tooltip title="REPORTS" arrow TransitionComponent={Zoom} placement="right">
        <ListSubheader inset={false} color="inherit" >-----  REPORTS  -----</ListSubheader>
      </Tooltip>

      <Tooltip title="REPORTS" arrow TransitionComponent={Zoom} placement="right">
        <ListItem button onClick={() => window.location.href = '/purchases'}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Purchases Report" />
        </ListItem>
      </Tooltip>

      <Tooltip title="REPORTS" arrow TransitionComponent={Zoom} placement="right">
        <ListItem button onClick={() => window.location.href = '/sales'}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Sales Report" />
        </ListItem>
      </Tooltip>       
  </div>
);
