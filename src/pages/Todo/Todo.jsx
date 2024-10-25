import { useEffect, useRef, useState } from "react";
import { fetchTodos } from "../../data/todos";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Todo.css";
import { Form } from "react-bootstrap";

const initItemsPerPage = 5;
const initOnlyWaiting = false;

function Todo() {
  //todosRaw
  const [todosRaw, setTodosRaw] = useState([]);

  //todos
  const [todos, setTodos] = useState([]);
  //filter
  const [onlyWaiting, setOnlyWaiting] = useState(false);

  //pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);

  //display
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(2);

  const itemsPerPageRef = useRef();
  const onlyWaitingRef = useRef();
  useEffect(() => {
    console.log(itemsPerPage);
    setNumPages(Math.ceil(todos.length / itemsPerPage));
    setCurPage(1);
  }, [itemsPerPage, todos.length]);

  useEffect(() => {
    console.log(onlyWaiting);
  }, [onlyWaiting]);

  useEffect(() => {
    setTodosRaw(fetchTodos());
    setOnlyWaiting(initOnlyWaiting);
    itemsPerPageRef.current.value = initItemsPerPage;
    setItemsPerPage(initItemsPerPage);
    onlyWaitingRef.current.checked = initOnlyWaiting;
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      //show only waiting (completed=false)
      setTodos(
        todosRaw.filter((todo) => {
          return todo.completed === false;
        })
      );
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  function deleteClick(id) {
    const todoSelected = todosRaw.filter((todo) => todo.id !== id);
    setTodosRaw(todoSelected);
  }

  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => {
      return todo.id === id;
    });

    todoSelected.completed = true;
    setTodosRaw([...todosRaw]);
  }

  function addClick(id, title) {
    const newTodo = { userId: 1, id: id, title: title, completed: false };
    setTodosRaw([...todosRaw, newTodo]);
  }

  //modals handle
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const newIdRef = useRef();
  const newTitleRef = useRef();
  return (
    <div>
      {/* modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg"></span>
            Add todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                value={
                  Number(
                    todosRaw.reduce((prev, todo) => {
                      return todo.id > prev ? todo.id : prev;
                    }, 0)
                  ) + 1
                }
                disabled
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp;Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("Title is empty");
                newTitleRef.current.value = "";
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <span className="bi bi-plus-lg">&nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>
      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onClick={(e) => {
              setOnlyWaiting(e.target.checked);
            }}
            ref={onlyWaitingRef}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only waiting
            <button className="btn btn-warning">
              warning&nbsp;
              <span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
          ref={itemsPerPageRef}
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={50}>50 items per page</option>
          <option value={100}>100 items per page</option>
        </select>
      </div>
      {/* table */}
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th style={{ textAlign: "center", width: "10%" }} valign="middle">
              ID
            </th>
            <th style={{ textAlign: "center" }} valign="middle">
              Title
            </th>
            <th style={{ textAlign: "right", width: "20%" }}>
              Completed&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <span className="bi bi-plus-lg"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage;
              return index >= min && index < max;
            })
            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td style={{ textAlign: "center" }} valign="middle">
                    <span className="badge text-bg-secondary">{todo.id}</span>
                  </td>
                  <td valign="middle">{todo.title}</td>
                  {/* <td style={{ textAlign: "right" }}>
                  <button
                    className={
                      "btn " + (todo.completed ? "btn-success" : "btn-warning")
                    }
                  >
                    <span>
                      {todo.completed ? "done" : "waiting"}&nbsp;
                      <span
                        className={
                          "bi " + (todo.completed ? "bi-check" : "bi-clock")
                        }
                      ></span>
                    </span>
                  </button>
                  &nbsp;
                  <button className="btn btn-danger">
                    <span className="bi bi-trash"></span>
                  </button>
                </td> */}
                  <td valign="middle">
                    {todo.completed ? (
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          todo.completed = false;
                          setTodos([...todos]);
                        }}
                      >
                        done
                        <span className="bi bi-check"></span>
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        warning
                        <span className="bi bi-clock"></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {/* page control*/}
      <div>
        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => setCurPage(1)}
        >
          First
        </button>
        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => curPage > 1 && setCurPage(curPage - 1)}
          disabled={curPage === 1}
        >
          Previous
        </button>
        {curPage}&nbsp;/&nbsp;{numPages}
        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => curPage < numPages && setCurPage(curPage + 1)}
          disabled={curPage === numPages}
        >
          Next
        </button>
        <button
          className="btn btn-outline-primary todo-spacing"
          onClick={() => setCurPage(numPages)}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
