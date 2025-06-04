import React, { useState } from "react";
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

interface ActionsMenu {
  id: number;
  onAssing: (id: any) => void;
  onComplete: (id: any) => void;
}

const ActionsMenu: React.FC<ActionsMenu> = ({ id, onAssing, onComplete }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: (id: any) => void) => {
    action(id);
    handleClose();
  };

  return (
    <>
      <IconButton
        aria-label="more"
        id={`actions-button-${id}`}
        aria-controls={open ? `actions-menu-${id}` : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{ p: 0.5 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={`actions-menu-${id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
       
         <MenuItem
          onClick={() => handleMenuItemClick(onAssing)}
          sx={{
            backgroundColor: "primary.light",
            color: "success.contrastText",
            "& .MuiListItemIcon-root": {
              color: "success.contrastText",
            },
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <ListItemIcon>
          <AssignmentIndIcon fontSize="small" /> 
          </ListItemIcon>
          <ListItemText primary="Asignar a" />
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick(onComplete)}
          sx={{
            backgroundColor: "success.light",
            color: "success.contrastText",
            "& .MuiListItemIcon-root": {
              color: "success.contrastText",
            },
            "&:hover": {
              backgroundColor: "success.dark",
            },
          }}
        >
          <ListItemIcon>
            <CheckCircleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Completar" />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;
