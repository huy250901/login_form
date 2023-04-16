import React, { useState } from "react";
import { LoginParams } from "../../../models/auth";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../img/logo.png";
import "./loginform.css";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      <img
        style={{ maxWidth: "250px", margin: "128px auto", display: "block" }}
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
        <div style={{ textAlign: "left", marginBottom: "6px" }}>
          Địa chỉ email
        </div>
        <input
          className="form-control"
          {...register("email", { validate: emailValidation })}
          placeholder="Enter your email"
        />
        <small
          className="text-danger"
          style={{ textAlign: "left", margin: "4px 0 6px 0" }}
        >
          {errors.email && errors.email?.message}
        </small>
        <div style={{ textAlign: "left", margin: "8px 0 6px 0" }}>Mật khẩu</div>
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
          style={{ textAlign: "left", margin: "4px 0 6px 0" }}
        >
          {errors.password?.message}
        </small>

        <label style={{ textAlign: "left", margin: "8px 0" }}>
          <input type="checkbox" />
          Lưu thông tin đăng nhập
        </label>
        <div>
          <input
            className="btn"
            style={{ margin: "12px 0", borderRadius: "5px", cursor: "pointer" }}
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
