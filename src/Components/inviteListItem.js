import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';

export const extraListItems = (
  <div>
        <Tooltip title="REPORTS" arrow TransitionComponent={Zoom} placement="right">
          <ListItem button onClick={() => window.location.href = '/invite'}>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Invite Tendor" />
          </ListItem>
        </Tooltip>   
  </div>
);