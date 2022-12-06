import { StreamLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import parserGraphql from "prettier/parser-graphql";
import { format } from "prettier/standalone";

import { graphql } from "codemirror-graphql/cm6-legacy/mode";

export type CodeEditorProps = {
  value: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
  onBlur?: () => void;
};

export const formatGraphQL = (code) =>
  format(code, {
    parser: "graphql",
    plugins: [parserGraphql],
  });

export default function CodeEditor({
  readOnly,
  value,
  onChange,
  onBlur,
}: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      readOnly={readOnly}
      onBlur={() => {
        if (onBlur) onBlur();
        if (!readOnly) onChange(formatGraphQL(value));
      }}
      theme={"dark"}
      width="800px"
      height="120px"
      extensions={[StreamLanguage.define(graphql), EditorView.lineWrapping]}
      onChange={!readOnly && onChange}
      autoFocus
    />
  );
}
