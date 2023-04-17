import { FC } from "react";
import { Control, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classNames from "classnames";
import dayjs from "dayjs";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  dateFormat?: string;
}

export const ControlledDatePicker: FC<Props> = ({
  control,
  name,
  dateFormat,
}) => (
  <Controller
    control={control}
    name={name}
    render={({ field }) => (
      <DatePicker
        showTimeSelect
        className={classNames("border-0 w-64 bg-card outline-none", {
          "text-red-600": dayjs(field.value).isBefore(dayjs()),
          "text-lightgreen": dayjs(field.value).isAfter(dayjs()),
        })}
        placeholderText="click here to pick date (future only)"
        onChange={(date) => field.onChange(date)}
        selected={field.value}
        dateFormat={dateFormat || "d MMMM yyyy hh:mm"}
      />
    )}
  />
);
