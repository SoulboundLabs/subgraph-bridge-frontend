// Load any languages you want to use from `refractor`
import Highlight, { defaultProps, Language } from 'prism-react-renderer'

interface Props {
  code: string
  language?: Language
}
export const CodeBlock = ({ code, language = 'typescript' }: Props) => {
  return (
    <div className="relative z-50">
      <Highlight {...defaultProps} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={{ ...style, background: 'transparent' }}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
