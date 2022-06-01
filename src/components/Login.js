import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Paper, Button } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  localStorage.removeItem("token");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChange = (setVariable, event) => {
    setVariable(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://crm-hthon.herokuapp.com/register/signin",
      {
        users: {
          email: email,
          password: password,
        },
      }
    );
    if (response.data) {
      await localStorage.setItem("token", response.data);
      navigate("/users");
    }
    setEmail("");
    setPassword("");
  };

  return (
    <div style={{ padding: 30 }}>
      <Paper>
        <Grid
          container
          spacing={3}
          direction={"column"}
          justify={"center"}
          alignItems={"center"}
        >
          <Grid item xs={12}>
            <TextField
              label="Username"
              required={true}
              type="email"
              value={email}
              onChange={(e) => handleChange(setEmail, e)}
            ></TextField>
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
            <Button variant="contained" onClick={(e) => handleSubmit(e)}>
              Login
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default LoginPage;
