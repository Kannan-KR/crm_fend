import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Table from "./Table";
import { Context } from "../Context";

function Users() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let fetchUsers = async () => {
    var decodedToken = jwt_decode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      navigate("/login");
    } else {
      var response = await axios.get(
        "https://crm-hthon.herokuapp.com/users/get",
        {
          headers: {
            "access-token": token,
          },
        }
      );
      setUserList(response.data);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          userList: userList,
          setUserList: setUserList,
        }}
      >
        <Table
          columns={[
            { id: "email", label: "Email" },
            { id: "firstName", label: "First Name" },
            { id: "lastName", label: "Last Name" },
            { id: "type", label: "Type" },
          ]}
          rows={userList}
        />
      </Context.Provider>
    </div>
  );
}

export default Users;
