import { StreamLanguage } from "@codemirror/language";
import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { graphql } from "codemirror-graphql/cm6-legacy/mode";
import parserGraphql from "prettier/parser-graphql";
import { useMemo } from "react";
// import { createLanguageManifest } from "~/lib/meta";
import usePrettier from "../lib/use-prettier";
import CodeEditor from "./CodeEditor";

export type FormatterFunction = (text: string) => string;

export const meta: MetaFunction = () => {
  return {
    title: "GraphQL code formatter",
  };
};

type CodeFormatterType = {
  code: string;
  handleChange: (val: string) => void;
  setFormatter: (handler: FormatterFunction) => void;
};

export function useFormatterOptions() {
  return useOutletContext<CodeFormatterType>();
}

// export let links: LinksFunction = () => createLanguageManifest("gql");

export default function CodeGQL() {
  const { handleChange, code } = useFormatterOptions();
  const language = useMemo(() => StreamLanguage.define(graphql), []);
  const isReady = usePrettier({
    parser: "graphql",
    plugins: [parserGraphql],
  });

  if (!isReady) return null;

  return (
    <CodeEditor value={code} language={language} onChange={handleChange} />
  );
}
