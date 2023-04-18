import React, { useState, useEffect } from "react";
import {
  LoginParams,
  RegisterParams,
} from "../../../models/auth";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../img/logo.png";
import "./loginform.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm: React.FC = () => {
  const notify = () => toast(`Login thành công`);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParams>();

  const emailValidation = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Email không hợp lệ";
    }
    return error;
  };

  const passwordValidation = (value: string) => {
    if (/\s/.test(value)) {
      return "Mật khẩu không được chứa dấu cách";
    }
    return true;
  };

  let navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const [location, setLocations] = useState([]);

  useEffect(() => {
    axios
      .get(
        "http://api.training.div3.pgtest.co/api/v1/location"
      )
      .then((response) => {
        setLocations(response.data);
        console.log(response.data.id);
        // console.log(response.data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onSubmit = (data: RegisterParams) => {
    fetch(
      "http://api.training.div3.pgtest.co/api/v1/auth/register",
      {
        method: "POST",

        body: JSON.stringify({
          email: data.email,

          password: data.password,

          repeatPassword: data.repeatPassword,

          name: data.name,

          gender: data.gender,

          region: data.region,

          state: data.state,
        }),

        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())

      .then((data) => {
        if (data.code === 200) {
          notify();

          notify();

          setTimeout(() => navigate("/home"), 1000);
        } else {
          notify();
        }
      });
  };

  return (
    <>
      <img
        style={{
          maxWidth: "250px",
          margin: "128px auto",
          display: "block",
        }}
        src={Logo}
        alt=""
      />
      <form
        className="form"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          notify();
          handleClick();
        })}
      >
        <div
          style={{ textAlign: "left", marginBottom: "6px" }}
        >
          Địa chỉ email
        </div>
        <input
          className="form-control"
          {...register("email", {
            validate: emailValidation,
          })}
          placeholder="Enter your email"
        />
        <small
          className="text-danger"
          style={{
            textAlign: "left",
            margin: "4px 0 6px 0",
          }}
        >
          {errors.email && errors.email?.message}
        </small>
        <div
          style={{
            textAlign: "left",
            margin: "8px 0 6px 0",
          }}
        >
          Mật khẩu
        </div>
        <input
          className="form-control"
          {...register("password", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu tối thiểu 6 kí tự",
            },
            validate: passwordValidation,
          })}
          placeholder="Password"
        />
        <small
          className="text-danger"
          style={{
            textAlign: "left",
            margin: "4px 0 6px 0",
          }}
        >
          {errors.password?.message}
        </small>

        {/* <Controller
        name="firstName"
        control={control}
        render={({ field }) => <Input {...field} />}
      />
      <Controller
        name="select"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={[
            { value: "chocolate", label: "Chocolate" },
            { value: "strawberry", label: "Strawberry" },
            { value: "vanilla", label: "Vanilla" }
          ]} 
        />}
      /> */}

        <label
          style={{ textAlign: "left", margin: "8px 0" }}
        >
          <input type="checkbox" />
          Lưu thông tin đăng nhập
        </label>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <input
            className="btn"
            style={{
              margin: "12px 0",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="submit"
          />
          <input
            onClick={() => {
              navigate("/register");
            }}
            className="btn"
            style={{
              margin: "12px 0",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            type="submit"
          />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          rtl={false}
          theme="light"
        />
      </form>
    </>
  );
};

export default LoginForm;
