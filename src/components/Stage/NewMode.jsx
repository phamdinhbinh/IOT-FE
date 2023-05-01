import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import NewConditionMode from "./NewConditionMode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function NewMode(props) {
  
  // 1 là độ ẩm
  // 2 là nhiệt độ
  // 3 là ánh sáng
  const [mode, setMode] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
      <Button
        onClick={handleClickOpen}
        className={"c-flex-center"}
        style={{
          margin: "12px 0",
          justifyContent: "flex-start",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
        }}
      >
        <AddIcon /> Thêm chế độ
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Thêm chế độ"}</DialogTitle>
        <DialogContent>
          <Box sx={{ minWidth: 300 }}>
            <br />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Chế độ</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={mode}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={1}>Độ ẩm</MenuItem>
                <MenuItem value={2}>Nhiệt độ</MenuItem>
                <MenuItem value={3}>Ánh sáng</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          {/* Thêm điều kiện */}
          {/* Bước 2 */}
          <NewConditionMode handleClose={handleClose} mode={mode} setMode={setMode} {...props} />
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
