import React, { useEffect, useState } from "react";
import AirlineServices from "../Services/AirlineService";
import "primeicons/primeicons.css";
import { useFormik } from "formik";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

import * as Yup from "yup";

import moment from "react-moment";

const AirlineData = () => {
  const [data, setData] = useState([]);

  const fetchData = () => {
    var allData = AirlineServices.AirlineData();
    setData(allData);
  };
  console.log("user>>>", data);
  debugger;
  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      from: undefined,
      to: undefined,
    },
    onSubmit: function (values) {
      debugger;
      console.log("values===", JSON.stringify(values));
      console.info("onSubmit Called");

      debugger;
    },
    validationSchema: Yup.object({
      from: Yup.string().required(),
      to: Yup.string().required(),
    }),
  });

  const fromDate = (from) => {
    return moment(from).utc().format("YYYY-MM-DD");
  };

  // var time = "2023-01-29T15:40:00.000";
  // var date = moment(time, "HH:mm:ss").utc().format("MMMM Do YYYY, h:mm:ss a");
  // console.log("date>>>", date);
  // const data = airline.map((item) => item.data);
  // console.log("dataAirline>>>>>", data);

  return (
    <div className="container-fluid  background">
      <h1>flight-schedules</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="col-6">
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <span> From:</span>
            </label>

            <Calendar
              id="icon"
              value={formik.values.from}
              name="from"
              onChange={formik.handleChange}
              hourFormat="12"
              showIcon
            />
            <br />

            {formik.touched.from && formik.errors.from && (
              <span className="text-red-400">{formik.errors.from}</span>
            )}
          </div>
        </div>
        <div className="col-6">
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              <span> To:</span>
            </label>

            <Calendar
              id="icon"
              value={formik.values.to}
              name="to"
              onChange={formik.handleChange}
              hourFormat="12"
              showIcon
            />
            <br />
            {formik.touched.to && formik.errors.to && (
              <span className="text-red-400">{formik.errors.to}</span>
            )}
          </div>
        </div>
        <Button className="mr-5" label="search" disabled={!formik.isValid || formik.isSubmitting} />

        {data.map((item, index) => {
          return (
            <div key={index}>
              {moment(item.arrival.scheduledTime).isBetween(formik.values.from, formik.values.to)}
            </div>
          );
        })}
      </form>

      {/* 
      <div>
        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <input type="date" className="form-control" placeholder="From" aria-label="Username" />
          </div>
          <div className="col col-lg-2">
            <input type="date" className="form-control" placeholder="To" aria-label="Server" />
          </div>
        </div>

        <div className="row justify-content-md-center">
          <div className="col col-lg-2">
            <button type="button" class="btn btn-outline-primary">
              Primary
            </button>
          </div>
          <div className="col col-lg-2">
            <button
              type="button"
              className="btn btn-outline-primary dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false">
              Action
            </button>
            <ul className="dropdown-menu">
              <li>Action</li>
              <li>Another action</li>
              <li> Something else here</li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>Separated link</li>
            </ul>
          </div>
        </div> */}

      {/* <button type="button" class="btn btn-outline-primary">
          Primary
        </button>

        <div className="btn-group text-center">
          <button
            type="button"
            className="btn btn-outline-primary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Action
          </button>
          <ul className="dropdown-menu">
            <li>Action</li>
            <li>Another action</li>
            <li> Something else here</li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>Separated link</li>
          </ul>
        </div> */}
      {data.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.airline.name}</h1>
            <h1>{item.arrival.scheduledTime}</h1>
            <h1>{item.departure.scheduledTime}</h1>
            <h1>{item.flight.number}</h1>
          </div>
        );
      })}
    </div>
  );
};

export default AirlineData;
