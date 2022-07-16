import { Input, Textarea } from "@chakra-ui/react";
import { useState } from "react";

export const ControllInput = ({ OnUpdate, type, title }: any) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    OnUpdate(e.target.value);
  };

  return (
    <Input
      placeholder={title}
      autoComplete="off"
      _placeholder={{ color: "gray.500" }}
      type={type}
      value={value}
      onChange={handleChange}
    />
  );
};

export const TextAreaInput = ({ OnUpdate }: any) => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    OnUpdate(e.target.value);
  };

  return (
    <Textarea
      placeholder="Description"
      _placeholder={{ color: "gray.500" }}
      value={value}
      onChange={handleChange}
    />
  );
};

export const ImageInput = ({ OnUpdate, imageCloud }: any) => {
  const handleChange = (e: any) => {
    const [file] = e.target.files;
    imageCloud(URL.createObjectURL(file));
    OnUpdate(file);
  };

  return (
    <Input
      type="file"
      display="none"
      id="file_upload"
      name="file-upload"
      onChange={handleChange}
    ></Input>
  );
};
