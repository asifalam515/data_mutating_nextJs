"use client";
import React from "react";
import { useFormStatus } from "react-dom";

const FormSubmit = () => {
  const status = useFormStatus();
  if (status.pending) {
    return <p>Creating Post.......</p>;
  }
  return (
    <div>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </div>
  );
};

export default FormSubmit;
