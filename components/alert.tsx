import * as React from 'react';
import { useState } from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
interface Props {
  userId: string;
  del: (id: string) => void;
  cancl: (val: boolean) => void;
}
// userId - a string property that represents the unique identifier of a user.
// del - a function that takes a string parameter id and returns nothing (void). This function is expected to delete a resource associated with the id parameter.
// cancl - a function that takes a boolean parameter val and returns nothing (void). This function is expected to cancel an ongoing operation, usually associated with the user identified by the userId property.

export default function ResponsiveDialog(props: Props) {
  const [open, setOpen] = useState<boolean>(true);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const deleteUser = (id: string) => {
    props.del(id);
  };

  const handleClose = () => {
    setOpen(false);
    props.cancl(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Delete Record!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete, the data will be permanently
            deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained'  autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button variant='contained' color='error' onClick={()=>deleteUser(props.userId)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}