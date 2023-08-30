import React from "react";
import { Link } from "react-router-dom";

function DropdownMenu() {

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand" href="#">
          
          </a>
          <div className="dropdown btn-group">
            <button
              type="button"
              className="btn btn-primary dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Menu
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li key={ 1 }>
                <Link to={ "/login" }>
                  <button className="dropdown-item" type="button">
                    { "Login" }
                  </button>
                </Link>
              </li>
              <li key={ 2 }>
                <Link to={ "/myorders" }>
                  <button className="dropdown-item" type="button">
                    { "Orders" }
                  </button>
                </Link>
              </li>
              <li key={ 3 }>
                <Link to={ "/login" }>
                  <button className="dropdown-item" type="button">
                    { "Logout" }
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default DropdownMenu;