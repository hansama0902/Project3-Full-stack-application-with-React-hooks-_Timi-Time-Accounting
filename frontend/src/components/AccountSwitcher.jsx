import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown, Button } from "react-bootstrap";
import UserManagement from "./UserManagement";
import { fetchUsers } from "../utils/api";
import "../stylesheets/AccountSwitcher.css";

const AccountSwitcher = ({ currentUser, onSwitch }) => {
  const [userList, setUserList] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    currentUser || "Please switch your account",
  );

  const loadUsers = async () => {
    try {
      const users = await fetchUsers();
      const userNames = users.map((user) => user.userName);
      setUserList(userNames);
      console.log("Loaded users:", userNames);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSwitch = (user) => {
    setSelectedUser(user);
    onSwitch(user);
  };

  return (
    <div className="account-switcher">
      <Dropdown className="account-dropdown">
        <Dropdown.Toggle variant="primary" className="w-100">
          {selectedUser}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {userList.length > 0 ? (
            userList.map((user) => (
              <Dropdown.Item key={user} onClick={() => handleSwitch(user)}>
                {user}
              </Dropdown.Item>
            ))
          ) : (
            <Dropdown.Item disabled>No Users Available</Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Button
        variant="secondary"
        onClick={() => setShowUserModal(true)}
        className="account-button"
      >
        Manage Users
      </Button>

      <UserManagement
        show={showUserModal}
        onClose={() => setShowUserModal(false)}
        onUserChange={(user) => {
          handleSwitch(user);
          loadUsers();
        }}
        currentUser={currentUser}
      />
    </div>
  );
};

AccountSwitcher.propTypes = {
  currentUser: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired,
};

export default AccountSwitcher;
