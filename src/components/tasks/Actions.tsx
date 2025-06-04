
import React, { useState } from 'react';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ActionsMenu {
  id: number;
  onAssing: (id: any) => void;
  onComplete: (id: any) => void;
}

const ActionsMenu: React.FC<ActionsMenu> = ({
  id,
  onAssing,
  onComplete,
}) => {
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
        aria-expanded={open ? 'true' : undefined}
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
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '100px',
          },
        }}
      >
        <MenuItem onClick={() => handleMenuItemClick(onAssing)}> <Button>Asignar a</Button></MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(onComplete)}> <Button>Completar</Button></MenuItem>
      </Menu>
    </>
  );
};

export default ActionsMenu;