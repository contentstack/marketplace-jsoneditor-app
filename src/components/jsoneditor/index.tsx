import React, { useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import "./index.css";
import { TypeJsonProps } from "../../common/types";

function JsonEditorComponent({ value = {}, onChange }: TypeJsonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<JSONEditor | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      editorRef.current = new JSONEditor(containerRef.current, {
        mode: "code",
        modes: ["code", "form", "text", "tree", "view"],
        onChange: () => {
          try {
            const updated = editorRef.current?.get();
            if (onChange) onChange(updated);
          } catch (e) {
            // Ignore parse errors
          }
        },
      });
      editorRef.current.set(value);
    }
    return () => {
      editorRef.current?.destroy();
      editorRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.update(value);
    }
  }, [value]);

  return <div ref={containerRef} style={{ width: "100%", height: 300 }} />;
}

export default JsonEditorComponent;
