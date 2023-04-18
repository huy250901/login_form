import React from "react";

import { useTranslation } from "react-i18next";

const Nav = () => {
  const { i18n } = useTranslation();

  const changLanguage = (lng: "en" | "vi") => {
    i18n.changeLanguage(lng);
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "10px 10px",
        position: "fixed",
        top: 26,
        right: 0,
      }}
    >
      {" "}
      <button onClick={() => changLanguage("vi")}>
        Tiếng việt
      </button>{" "}
      <button onClick={() => changLanguage("en")}>
        English
      </button>{" "}
    </div>
  );
};

export default Nav;
