import { useState, useEffect } from "react";

import "./index.css";

function App() {
  const getLocalStorage = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(localStorage.list);
    } else {
      return [];
    }
  };

  const [item, setItem] = useState({ id: "", name: "" });
  const [list, setList] = useState(getLocalStorage());
  const [editMode, setEditMode] = useState(false);
  getLocalStorage();

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleChange = (e) => {
    let id = new Date().getTime().toString();

    setItem((prev) => {
      return { ...prev, id: id, name: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.name.trim()) {
      setList((prev) => {
        return [...prev, item];
      });
      setItem({ id: "", name: "" });
      setEditMode(false);
    }
  };

  const handleDelete = (id) => {
    setList(
      list.filter((e) => {
        return e.id !== id;
      })
    );
  };
  const handleEdit = (ide) => {
    setEditMode(true);

    let x = list.find((e) => {
      return e.id === ide;
    });

    setItem({ id: x.id, name: x.name });

    setList(
      list.filter((e) => {
        return e.id !== ide;
      })
    );
  };
  return (
    <div className="container">
      <h2>FAMILY</h2>
      <form className="container__form" onSubmit={handleSubmit}>
        <input
          placeholder="Input Family Member..."
          onChange={handleChange}
          name="name"
          value={item.name}
        ></input>
        <button className="button-27">{editMode ? "EDIT" : "ADD"}</button>
      </form>
      {editMode && <p>{item.name} is part of the family.</p>}
      <div className="container__list">
        {!editMode &&
          list.map((e) => {
            return (
              <div className="container__list_item" key={e.id}>
                <h4 className="text">{e.name}</h4>
                <button
                  className="container__list_item_btn"
                  onClick={() => {
                    handleEdit(e.id);
                  }}
                >
                  DETAILS
                </button>
                <button
                  className="container__list_item_btn"
                  onClick={() => {
                    handleDelete(e.id);
                  }}
                >
                  DELETE
                </button>
              </div>
            );
          })}
        {/* {list.length > 0 && (
          <p className="remove-btn" onClick={removeAll}>
            Remove All
          </p>
        )} */}
      </div>
    </div>
  );
}

export default App;
