import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {
  Grid,
  TextField,
  Paper,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
} from "@mui/material";

export default function BasicTextFields() {
  const token = localStorage.getItem("token");
  let navigate = useNavigate();

  let [firstname, setFirstname] = React.useState("");
  let [email, setEmail] = React.useState("");
  let [lastname, setLastname] = React.useState("");
  let [type, setType] = React.useState("");

  const getData = async () => {
    let id = window.location.href.substring(
      window.location.href.lastIndexOf("/") + 1
    );
    let thisuserData = await axios.get(
      "https://crm-hthon.herokuapp.com/users/get/" + id,
      {
        headers: {
          "access-token": token,
        },
      }
    );
    setFirstname(thisuserData.data.firstName);
    setEmail(thisuserData.data.email);
    setLastname(thisuserData.data.lastName);
    setType(thisuserData.data.type);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleUpdate = async (id, userQuantity) => {
    var decodedToken = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      navigate("/login");
    } else {
      let id = window.location.href.substring(
        window.location.href.lastIndexOf("/") + 1
      );

      try {
        var response = await axios.put(
          `https://crm-hthon.herokuapp.com/users/edit/${id}`,
          {
            user: {
              email: email,
              firstName: firstname,
              lastName: lastname,
              type: type,
            },
          },
          {
            headers: {
              "access-token": token,
            },
          }
        );
        if (response.status >= 200 && response.status < 300) {
          navigate("/users");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleChange = (setVariable, event) => {
    setVariable(event.target.value);
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
              label="Email"
              required={true}
              type="email"
              value={email}
              onChange={(e) => handleChange(setEmail, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="First Name"
              required={true}
              value={firstname}
              onChange={(e) => handleChange(setFirstname, e)}
            ></TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Last Name"
              required={true}
              value={lastname}
              onChange={(e) => handleChange(setLastname, e)}
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
            <Button variant="contained" onClick={(e) => handleUpdate(e)}>
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
