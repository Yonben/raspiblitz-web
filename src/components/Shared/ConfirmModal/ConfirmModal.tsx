import { FC, useContext } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ModalDialog from "../../../container/ModalDialog/ModalDialog";
import { AppContext } from "../../../store/app-context";
import { instance } from "../../../util/interceptor";
import { MODAL_ROOT } from "../../../util/util";

export type Props = {
  confirmText: string;
  confirmEndpoint: string;
  onClose: () => void;
};

const btnClasses =
  "w-full xl:w-1/2 text-center h-10 m-2 bg-yellow-500 hover:bg-yellow-400 rounded text-white";

const ConfirmModal: FC<Props> = ({ confirmText, confirmEndpoint, onClose }) => {
  const { t } = useTranslation();
  const { setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const shutdownHandler = async () => {
    const resp = await instance.post(confirmEndpoint);
    if (resp.status === 200) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return createPortal(
    <ModalDialog close={onClose}>
      {confirmText}
      <div className="p-3 flex flex-col xl:flex-row">
        <button className={btnClasses} onClick={onClose}>
          {t("settings.cancel")}
        </button>
        <button className={btnClasses} onClick={shutdownHandler}>
          {t("settings.confirm")}
        </button>
      </div>
    </ModalDialog>,
    MODAL_ROOT
  );
};

export default ConfirmModal;
