import React, { useState, useEffect } from "react";
import {
  IGenderParams,
  LocationParams,
  LoginParams,
  RegionParams,
  RegisterParams,
} from "../../../models/auth";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../../img/logo.png";
import "../../auth/components/loginform.css";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useTranslation } from "react-i18next";

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .required("Password is required")
//     .min(6, "Password must be at least 6 characters"),
//   confirmPassword: Yup.string()
//     .required("Confirm Password is required")
//     .oneOf([Yup.ref("password")], "Passwords must match"),
// });
// const formOptions = {
//   resolver: yupResolver(validationSchema),
// };

interface IFormInputs {
  email: string;
  password: string;
  passwordConfirm: string;
}

const schema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
  passwordConfirm: Yup.string().required(),
});

// Hiện toast message
const Register = () => {
  const notify = () => toast(`Login thành công`);

  // Multi L emailanguage
  const { t } = useTranslation();

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterParams>({
    resolver: yupResolver(schema),
  });

  //Validate Email
  const emailValidation = (value: string) => {
    let error;
    if (!value) {
      error = "Vui lòng nhập email";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      error = "Email không hợp lệ";
    }
    return error;
  };

  // Validate Password
  const passwordValidation = (value: string) => {
    if (/\s/.test(value)) {
      return "Mật khẩu không được chứa dấu cách";
    }
    return true;
  };

  // Chuyển trang
  let navigate = useNavigate();

  const handleClick = () => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  };

  const genderOptions: IGenderParams[] = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const [selectedGender, setSelectedGender] = useState<
    IGenderParams[]
  >([]);

  const handleGender = (option: any) => {
    setSelectedGender(option);
    console.log(selectedGender);
  };

  const [regions, setRegions] = useState<RegionParams[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://api.training.div3.pgtest.co/api/v1/location"
        );
        const data = await response.json();
        setRegions(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const region = Object.values(regions);

  const options = region.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  const [regionn, setRegionn] = useState();

  const handleChange = (event: any) => {
    setRegionn(event.value);
    const idRegion = event.value;
    console.log("id region", regionn);
  };

  const [state, setState] = useState<LocationParams[]>([]);

  const city = Object.values(state);

  const optionsCity = state.map((location) => ({
    label: location.name,
    value: location.id,
  }));

  useEffect(() => {
    const idCity = regionn;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://api.training.div3.pgtest.co/api/v1/location?pid=${idCity}`
        );
        const data = await response.json();
        console.log("idCity", idCity);
        setState(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [regionn]);

  const onSubmit = () => {
    alert("submit");
  };
  //---------------------------

  // const onSubmit = (data: RegisterParams) => {
  //   fetch(
  //     "http://api.training.div3.pgtest.co/api/v1/auth/register",
  //     {
  //       method: "POST",

  //       body: JSON.stringify({
  //         email: data.email,

  //         password: data.password,

  //         repeatPassword: data.repeatPassword,

  //         name: data.name,

  //         gender: data.gender,

  //         region: data.region,

  //         state: data.state,
  //       }),

  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   )
  //     .then((response) => response.json())

  //     .then((data) => {
  //       if (data.code === 200) {
  //         notify();

  //         notify();

  //         setTimeout(() => navigate("/home"), 1000);
  //       } else {
  //         notify();
  //       }
  //     });
  // };

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
        onSubmit={
          handleSubmit(onSubmit)
          // handleSubmit((data) => {
          // console.log(data);
          // notify();
          // handleClick();
          // })
        }
      >
        <div
          style={{ textAlign: "left", marginBottom: "6px" }}
        >
          {t("email")}
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
        {t("password")}
        <input
          type="password"
          // onChange={handleChange}
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
        />{" "}
        <small
          className="text-danger"
          style={{
            textAlign: "left",
            margin: "4px 0 6px 0",
          }}
        >
          {errors.password && errors.password?.message}
        </small>
        <div
          style={{
            textAlign: "left",
            margin: "8px 0 6px 0",
          }}
        >
          {t("repeatPassword")}
        </div>
        <input
          type="password"
          className="form-control"
          {...register("repeatPassword", {
            required: "Vui lòng nhập mật khẩu",
            minLength: {
              value: 6,
              message: "Mật khẩu tối thiểu 6 kí tự",
            },
            validate: passwordValidation,
          })}
          placeholder="RepeatPassword"
        />
        <small
          className="text-danger"
          style={{
            textAlign: "left",
            margin: "4px 0 6px 0",
          }}
        >
          {errors.password && errors.password?.message}
        </small>
        <div
          style={{
            textAlign: "left",
            margin: "8px 0 6px 0",
          }}
        >
          {t("name")}
        </div>
        <input
          className="form-control"
          {...register("name", {
            required: "Nhập tên",
            minLength: {
              value: 6,
              message: "Mật khẩu tối thiểu 6 kí tự",
            },
            // validate: passwordValidation,
          })}
          placeholder="Họ và tên"
        />
        <div
          style={{
            textAlign: "left",
            margin: "8px 0 6px 0",
          }}
        ></div>
        <div>
          <label>{t("gender")}</label>{" "}
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                required={true}
                options={genderOptions}
                value={selectedGender}
                onChange={handleGender}
                placeholder="Select gender"
              />
            )}
          />
        </div>
        <small
          className="text-danger"
          style={{
            textAlign: "left",
            margin: "4px 0 6px 0",
          }}
        >
          {errors.gender?.message}
        </small>
        <div style={{ margin: "8px 0 6px 0" }}>
          <label>{t("region")}</label>
          <Controller
            name="region"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                options={options}
                required={true}
                // value={options}
                placeholder="Select region"
                onChange={(options) =>
                  handleChange(options)
                }
              />
            )}
          />
        </div>
        <div style={{ margin: "8px 0 6px 0" }}>
          <label>{t("state")} </label>
          <Controller
            name="state"
            control={control}
            defaultValue=""
            rules={{ required: true, validate: {} }}
            render={({ field }) => (
              <Select
                required={true}
                options={optionsCity}
                placeholder="Select region"
                onChange={(options) =>
                  handleChange(options)
                }
              />
            )}
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
            onClick={() => {
              navigate("/login");
            }}
            className="btn"
            type="submit"
            style={{
              margin: "12px 0",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          />
          <input
            className="btn"
            style={{
              margin: "12px 0",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            // onClick={onSubmit}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default Register;
