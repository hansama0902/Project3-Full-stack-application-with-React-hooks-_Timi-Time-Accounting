import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form, ListGroup, Alert } from "react-bootstrap";
import { fetchUsers, createUser, deleteUser } from "../utils/api"; // 连接 API

const UserManagement = ({ show, onClose, onUserChange, currentUser }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // ✅ 加载用户列表
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData.map((user) => user.userName));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (show) loadUsers();
  }, [show]);

  // ✅ 显示成功消息（自动隐藏）
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2000); // 2 秒后隐藏
  };

  // ✅ 添加新用户
  const handleAddUser = async () => {
    if (newUser.trim() === "" || users.includes(newUser)) return;
    try {
      await createUser(newUser);
      
      // 重新拉取最新用户数据
      const updatedUsersData = await fetchUsers();
      const updatedUsers = updatedUsersData.map((u) => u.userName);
      setUsers(updatedUsers);
      
      showSuccessMessage(`User "${newUser}" added successfully!`);
      setNewUser("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // ✅ 删除用户
  const handleDeleteUser = async (user) => {
    try {
      await deleteUser(user);
      
      // 重新拉取最新用户数据
      const updatedUsersData = await fetchUsers();
      const updatedUsers = updatedUsersData.map((u) => u.userName);
      setUsers(updatedUsers);
      
      showSuccessMessage(`User "${user}" deleted successfully!`);

      // ✅ 如果当前删除的是选中的用户
      if (user === currentUser) {
        // ✅ 选择下一个用户，如果没有用户，则重置为空
        onUserChange(updatedUsers.length > 0 ? updatedUsers[0] : "");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Manage Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ✅ 成功消息提示 */}
        {successMessage && <Alert variant="success">{successMessage}</Alert>}

        {/* ✅ 添加新用户 */}
        <Form.Group>
          <Form.Label>Add New User</Form.Label>
          <Form.Control
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Enter username"
          />
          <Button className="mt-2" onClick={handleAddUser} variant="success">
            Add User
          </Button>
        </Form.Group>

        {/* ✅ 用户列表 */}
        <h5 className="mt-3">Existing Users</h5>
        <ListGroup>
          {users.length > 0 ? (
            users.map((user) => (
              <ListGroup.Item key={user} className="d-flex justify-content-between align-items-center">
                <span>{user}</span>
                <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user)}>
                  Delete
                </Button>
              </ListGroup.Item>
            ))
          ) : (
            <p className="text-muted text-center mt-2">🚀 Please create a new user.</p>
          )}
        </ListGroup>
      </Modal.Body>
    </Modal>
  );
};

UserManagement.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUserChange: PropTypes.func.isRequired,
  currentUser: PropTypes.string.isRequired,
};

export default UserManagement;


