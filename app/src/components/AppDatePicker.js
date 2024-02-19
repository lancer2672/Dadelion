import React from "react";
import DatePicker from "react-native-date-picker";
const AppDatePicker = (props) => {
  const {
    date,
    minDate,
    maxDate,
    onConfirm,
    onCancel,
    open,
    dateDefault = new Date(),
    ...otherProps
  } = props;
  return (
    <DatePicker
      modal
      open={open}
      maximumDate={maxDate || undefined}
      minimumDate={minDate || undefined}
      mode="date"
      //   androidVariant={'iosClone'}
      date={date || dateDefault}
      confirmText={"Xác nhận"}
      cancelText={"Hủy"}
      title={"Vui lòng chọn ngày"}
      onConfirm={onConfirm}
      onCancel={onCancel}
      {...otherProps}
    />
  );
};

export default AppDatePicker;
