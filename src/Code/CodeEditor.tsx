import { StreamLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";

import { graphql } from "codemirror-graphql/cm6-legacy/mode";

export type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function CodeEditor({ value, onChange }: CodeEditorProps) {
  return (
    <CodeMirror
      value={value}
      theme={"dark"}
      extensions={[StreamLanguage.define(graphql), EditorView.lineWrapping]}
      onChange={onChange}
      height="200px"
      autoFocus
    />
  );
}
