import React from "react";
import { EditorButtonEvent } from "./EditorButtonEvent/EditorButtonEvent";
import { EditorButtonRotate } from "./EditorButtonRotate/EditorButtonRotate";

export const EditorTools = () => {
  return (
    <>
      <EditorButtonEvent/>
      <EditorButtonRotate/>
    </>
  );
};
