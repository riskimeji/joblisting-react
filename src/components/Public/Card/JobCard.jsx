import React from "react";
import { NavLink } from "react-router-dom";

const JobCard = () => {
  return (
    <div className="container p-5">
      <div className="title has-text-centered">Lowongan Pekerjaan</div>
      <div className="columns is-multiline">
        <div className="column is-one-quarter">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="title">
                  “There are two hard things in computer science”
                </p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <NavLink href="#">@bulmaio</NavLink>.{" "}
                <NavLink href="#">#css</NavLink>{" "}
                <NavLink href="#">#responsive</NavLink>
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="title">
                  “There are two hard things in computer science”
                </p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <NavLink href="#">@bulmaio</NavLink>.{" "}
                <NavLink href="#">#css</NavLink>{" "}
                <NavLink href="#">#responsive</NavLink>
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="title">
                  “There are two hard things in computer science”
                </p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <NavLink href="#">@bulmaio</NavLink>.{" "}
                <NavLink href="#">#css</NavLink>{" "}
                <NavLink href="#">#responsive</NavLink>
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
        <div className="column is-one-quarter">
          <div className="card">
            <div className="card-content">
              <div className="content">
                <p className="title">
                  “There are two hard things in computer science.”
                </p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris.
                <NavLink href="#">@bulmaio</NavLink>.{" "}
                <NavLink href="#">#css</NavLink>{" "}
                <NavLink href="#">#responsive</NavLink>
                <br />
                <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
