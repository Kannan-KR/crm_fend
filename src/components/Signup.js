import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  Grid,
  TextField,
  Paper,
  Button,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  InputLabel,
} from "@mui/material";

const SignUpPage = () => {
  let navigate = useNavigate();

  const [type, setType] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confPassword, setConfPassword] = React.useState("");

  const handleChange = (setVariable, event) => {
    setVariable(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://crm-hthon.herokuapp.com/register/signup",
      {
        users: {
          email: email,
          firstName: fname,
          lastName: lname,
          password: password,
          type: type,
          confirmpassword: confPassword,
        },
      }
    );
    setFname("");
    setLname("");
    setType("");
    setEmail("");
    setPassword("");
    setConfPassword("");
    if (response) {
      navigate("/login");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Paper>
        <Grid
          container
          spacing={1.5}
          direction={"column"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              required={true}
              value={email}
              onChange={(e) => handleChange(setEmail, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="First Name"
              required={true}
              value={fname}
              onChange={(e) => handleChange(setFname, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Last Name"
              required={true}
              value={lname}
              onChange={(e) => handleChange(setLname, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <FormControl>
              <InputLabel>Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={(e) => handleChange(setType, e)}
              >
                <MenuItem value={"admin"}>Admin</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"employee"}>Employee</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Password"
              type={"password"}
              required={true}
              value={password}
              onChange={(e) => handleChange(setPassword, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label=" Confirm Password"
              type={"password"}
              required={true}
              value={confPassword}
              onChange={(e) => handleChange(setConfPassword, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" onClick={(e) => handleSubmit(e)}>
              Signup
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default SignUpPage;
