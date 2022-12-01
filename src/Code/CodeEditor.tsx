import { StreamLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import parserGraphql from "prettier/parser-graphql";
import { format } from "prettier/standalone";

import { graphql } from "codemirror-graphql/cm6-legacy/mode";

export type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const formatGraphQL = (code) =>
  format(code, {
    parser: "graphql",
    plugins: [parserGraphql],
  });

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      onBlur={() => onChange(formatGraphQL(value))}
      theme={"dark"}
      className="w-full"
      height="120px"
      extensions={[StreamLanguage.define(graphql), EditorView.lineWrapping]}
      onChange={onChange}
      autoFocus
    />
  );
}
