import React, { ChangeEvent } from "react";

type GroupFieldProps = {
  label: string;
  id: string;
  name: string;
  type: "text" | "email" | "textarea" | "select" | "file" | "radio" | "date";
  placeholder?: string;
  value?: string ;
  options?: { label: string; value: string }[];
  onChange?: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
  onChange2?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const GroupField: React.FC<GroupFieldProps> = ({
  label,
  id,
  name,
  type = "text",
  placeholder,
  value,
  options,
  onChange,
  onChange2,
}) => {
  return (
    <>
      <div className="flex flex-col gap-2 ">
        <label htmlFor={id} className="labels">
          {label}
        </label>
        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="inputs"
          ></textarea>
        ) : type === "radio" && options ? (
          <div className="flex gap-4">
            {options.map((option) => (
              <label key={option.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={id}
                  id={`${id}-${option.value}`}
                  value={option.value}
                  checked={value === option.value}
                  onChange={onChange}
                />
                {option.label}
              </label>
            ))}
          </div>
        ) : type === "file" ? (
          <input
            type="file"
            id={id}
            name={name}
            onChange={onChange2}
            className="inputs"
            accept="image/*"
          />
        ) : type === "date" ? (
          <input
            type="date"
            id={id}
            name={name}
            value={value}
            onChange={onChange2}
            className="inputs"
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="inputs"
          />
        )}
      </div>
    </>
  );
};

export default GroupField;
