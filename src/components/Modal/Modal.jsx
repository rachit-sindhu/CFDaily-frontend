import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Modal.module.css";

import { ModalAction } from "../../store/reducers/modal";

const Modal = ({ children }) => {
  const showModal = useSelector((state) => state.modal.showCalQuestion);
  const dispatch = useDispatch();

  return (
    <div className={[styles.Modal, showModal && styles.show].join(" ")}>
      <div
        className={[styles.Backdrop, styles.BackdropShow].join(" ")}
        onClick={() => dispatch(ModalAction.hideCalenderModal())}
      ></div>
      {children}
    </div>
  );
};

export default Modal;
