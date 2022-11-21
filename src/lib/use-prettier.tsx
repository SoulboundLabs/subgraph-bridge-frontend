import { Options } from "prettier";
import { format } from "prettier/standalone";
import { useCallback, useEffect, useState } from "react";
import { useFormatterOptions } from "~/routes/lang";

export default function usePrettier(options: Options) {
  const [mounted, setMounted] = useState(false);
  const { setFormatter } = useFormatterOptions();
  const formatter = useCallback(
    (code: string) => format(code, options),
    [options]
  );
  useEffect(() => {
    setFormatter(formatter);
    setMounted(true);
  }, [setFormatter, formatter, options]);

  return mounted;
}
