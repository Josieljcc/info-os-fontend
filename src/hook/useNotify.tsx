import { toast } from "react-toastify";
import { notifyPositionMap, notifyType } from "../types";

const useNotify = () => {
  const notify = (
    message: string,
    position: notifyPositionMap,
    type: notifyType
  ) => {
    switch (type) {
      case notifyType.success:
        toast.success(message, {
          position: position,
        });
        break;
      case notifyType.error:
        toast.error(message, {
          position: position,
        });
        break;
      case notifyType.warn:
        toast.warn(message, {
          position: position,
        });
        break;
      case notifyType.info:
        toast.info(message, {
          position: position,
        });
        break;
    }
  };

  return notify;
};

export default useNotify;
