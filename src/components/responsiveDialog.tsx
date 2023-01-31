import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";

export default function ResponsiveDialog({
  title,
  children,
  actionBtnText,
  onClick,
  open,
  onClose,
  showDeleteBtn,
  onDelete
}: any) {
  //const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      color="background.default"
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{title && title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
      {showDeleteBtn && (
          <Button onClick={onDelete}  color="primary" autoFocus size="medium" variant="contained" disableElevation>
            Delete
          </Button>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Button autoFocus onClick={onClose}>
          Close
        </Button>
        {actionBtnText && (
          <Button onClick={onClick} color="secondary" autoFocus size="medium" variant="contained" disableElevation>
            {actionBtnText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
