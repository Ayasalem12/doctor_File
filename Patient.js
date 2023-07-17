import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import Header from "components/Headers/Header.js";

const Patient = () => {
  const [seizure, setSeizure] = useState({
    id: "",
    name: "",
   test: "",
  });

  const [seizures, setSeizures] = useState([
    {
      id: "1",
    name: "ahmad",
     test: "",
    },
    
  
  ]);

  const [view, setView] = useState("data");

  const [editMode, setEditMode] = useState(false);

  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeizure((prevSeizure) => ({
      ...prevSeizure,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      const updatedSeizures = seizures.map((item) =>
        item.id === editId ? { ...item, ...seizure } : item
      );
      setSeizures(updatedSeizures);
      setEditMode(false);
      setEditId(null);
    } else {
      const newSeizure = {
        id: seizures.length + 1,
        ...seizure
      };
      setSeizures([...seizures, newSeizure]);
    }
    setSeizure({
      id: "",
    name: "",
   test : "",
    });
  };

  const handleDelete = (id) => {
    const updatedSeizures = seizures.filter((item) => item.id !== id);
    setSeizures(updatedSeizures);
  };

  const handleEdit = (id) => {
    const seizureToEdit = seizures.find((item) => item.id === id);
    setSeizure(seizureToEdit);
    setEditMode(true);
    setEditId(id);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <Col>
            <Card className="shadow">
              <div className="d-flex justify-content-between align-items-center p-3">
                <h3 className="mb-0">Medical</h3>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-light"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleViewChange("data")}
                    >
                      View Data
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={() => handleViewChange("form")}
                    >
                      Enter Information
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </div>
              {view === "data" && (
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col" width="15%">
                        ID
                      </th>
                      <th scope="col" width="20%">
                        Name 
                      </th>
                      <th scope="col" width="75%">
                        eeg test
                      </th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {seizures.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.image}</td>
                       
                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              href="#pablo"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu
                              className="dropdown-menu-arrow"
                              right
                            >
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleEdit(item.id)}
                              >
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={() => handleDelete(item.id)}
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
              {view === "form" && (
                <Form onSubmit={handleSubmit} className="p-3">
                  <FormGroup>
                    <Label for="date">Id</Label>
                    <Input
                      type="date"
                      name="date"
                      id="date"
                      value={seizure.date}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="time">Nmme</Label>
                    <Input
                      type="time"
                      name="time"
                      id="time"
                      value={seizure.time}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="duration">Image</Label>
                    <Input
                      type="text"
                      name="duration"
                      id="duration"
                      value={seizure.duration}
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                 

                  <div className="text-center">
                    <Button color="primary" type="submit">
                      {editMode ? "Update Seizure" : "Add Seizure"}
                    </Button>
                  </div>
                </Form>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Patient;