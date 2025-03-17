import PropTypes from "prop-types";
import { Card, Container, Row, Col } from "react-bootstrap";

const Dashboard = ({ totalIncome, totalExpenses }) => {
  const balance = totalIncome - totalExpenses;

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card className="text-center p-3">
            <Card.Title>Total Income</Card.Title>
            <Card.Text className="text-success">${totalIncome.toFixed(2)}</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <Card.Title>Total Expenses</Card.Title>
            <Card.Text className="text-danger">${totalExpenses.toFixed(2)}</Card.Text>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center p-3">
            <Card.Title>Balance</Card.Title>
            <Card.Text className={balance >= 0 ? "text-primary" : "text-danger"}>
              ${balance.toFixed(2)}
            </Card.Text>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Dashboard.propTypes = {
  totalIncome: PropTypes.number.isRequired,
  totalExpenses: PropTypes.number.isRequired,
};

export default Dashboard;
