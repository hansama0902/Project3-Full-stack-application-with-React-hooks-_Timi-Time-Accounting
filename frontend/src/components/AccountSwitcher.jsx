import { useState } from "react";
import PropTypes from "prop-types";
import { Dropdown, Button, Form, Modal } from "react-bootstrap";

const AccountSwitcher = ({ userList, currentUser, onSwitch, onManageUsers }) => {
  const [selectedUser, setSelectedUser] = useState(currentUser);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState("");

  const handleSwitch = (user) => {
    setSelectedUser(user);
    onSwitch(user);
  };

  const handleAddUser = () => {
    if (newUser.trim() !== "" && !userList.includes(newUser)) {
      onManageUsers([...userList, newUser]);
      setNewUser("");
      setShowModal(false);
    }
  };

  const handleDeleteUser = (user) => {
    if (userList.length > 1) {
      onManageUsers(userList.filter(u => u !== user));
    }
  };

  return (
    <div className="d-flex align-items-center mb-3">
      <Dropdown>
        <Dropdown.Toggle variant="primary">{selectedUser}</Dropdown.Toggle>
        <Dropdown.Menu>
          {userList.map((user) => (
            <Dropdown.Item key={user} onClick={() => handleSwitch(user)}>
              {user}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="outline-secondary" className="ms-2" onClick={() => setShowModal(true)}>
        Manage Users
      </Button>

      {/* ✅ 账户管理模态框 */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Add New User</Form.Label>
            <Form.Control
              type="text"
              value={newUser}
              onChange={(e) => setNewUser(e.target.value)}
              placeholder="Enter username"
            />
            <Button className="mt-2" onClick={handleAddUser}>Add User</Button>
          </Form.Group>

          <h5 className="mt-3">Existing Users</h5>
          {userList.map(user => (
            <div key={user} className="d-flex justify-content-between align-items-center mt-2">
              <span>{user}</span>
              <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user)}>Delete</Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
};

AccountSwitcher.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentUser: PropTypes.string.isRequired,
  onSwitch: PropTypes.func.isRequired,
  onManageUsers: PropTypes.func.isRequired,
};

export default AccountSwitcher;




