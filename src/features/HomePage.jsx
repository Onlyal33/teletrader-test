import { Table } from 'react-bootstrap';

const renderRow = (el, id) => (
  <tr key={id}>
    <td>1</td>
    <td>Mark</td>
    <td>Otto</td>
    <td>@mdo</td>
  </tr>
);

const HomePage = ({ symbols = [0, 1] }) => (
  <Table striped bordered hover size="sm">
    <thead>
      <tr>
        <th>Name</th>
        <th>Last</th>
        <th>Change</th>
        <th>Change percent</th>
        <th>High</th>
        <th>Low</th>
      </tr>
    </thead>
    <tbody>
      {symbols.map((el, id) => renderRow(el, id))}
    </tbody>
  </Table>
);

export default HomePage;
