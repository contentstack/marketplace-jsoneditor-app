import React, { useRef, useEffect } from "react";
import { JsonEditor } from "jsoneditor-react";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";
import "jsoneditor-react/es/editor.min.css";
import "./index.css";
import { TypeJsonProps } from "../../common/types";

const JSONEditor: React.FC<TypeJsonProps> = function ({
  value = {},
  onChange,
}) {
  const jsonEditorRef = useRef<JsonEditor | null>(null);

  useEffect(() => {
    jsonEditorRef?.current?.set(value);
  }, [value]);

  const setRef = (instance: any) => {
    jsonEditorRef.current = instance?.jsonEditor;
  };

  return (
    <JsonEditor
      ref={setRef}
      value={value}
      onChange={onChange}
      ace={ace}
      mode="code"
      allowedModes={["code", "form", "text", "tree", "view"]}
      schema={{}}
    />
  );
};

export default JSONEditor;
