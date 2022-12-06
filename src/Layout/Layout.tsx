import { Fragment, useState } from "react";
import { BrandDiscord, BrandGithub, BrandTwitter } from "tabler-icons-react";
import posterImage from "../assets/logos/subgraph-bridge.svg";

import { classNames } from "../lib/utils";
import { PersonIcon, TheGraphSVG } from "../SVG/SVG";

function AboutSection(props) {
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-300">
        <img className="w-4" src={posterImage} alt="" />

        <span className="ml-2.5">About</span>
      </h2>
      <p
        className={classNames(
          "mt-2 text-base leading-7 text-slate-300",
          !isExpanded && "lg:line-clamp-4"
        )}
      >
        We wanted to push the limits of what was possible with subgraphs.
        Subgraphs are the default source of rich blockchain data, but we think
        that they can also become the primary source of computed data for smart
        contracts. Our initial release of the Subgraph Bridge is a major first
        step in seeing that vision come to life.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  );
}

function LimitationSection(props) {
  let [isExpanded, setIsExpanded] = useState(false);

  return (
    <section {...props}>
      <h2 className="flex items-center font-mono text-sm font-medium leading-7 text-slate-300">
        <img className="w-4" src={posterImage} alt="" />

        <span className="ml-2.5">Limitations</span>
      </h2>
      <p
        className={classNames(
          "mt-2 text-base leading-7 text-slate-300",
          !isExpanded && "lg:line-clamp-4"
        )}
      >
        For the initial release of the Subgraph Bridge, there are a few
        limitations to be aware of. First, the Subgraph Bridge is only available
        on Goerli Testnet until we've ironed out any bugs. Second, the Subgraph
        Bridge only supports query results that are less than 256 blocks old due
        to Solidity's limitations when parsing block hashes. Finally, the
        Subgraph Bridge only supports GraphQL queries with single data field.
        Parsing JSON in Solidity is incredibly gas inefficient and unwieldy, so
        we recommend aggregating your data in the subgraph into a single Merkle
        Root, address, or scalar value before posting it on-chain. We will
        revisit these limitations in future releases.
      </p>
      {!isExpanded && (
        <button
          type="button"
          className="mt-2 hidden text-sm font-bold leading-6 text-sky-500 hover:text-sky-700 active:text-sky-900 lg:inline-block"
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </section>
  );
}

export function Layout({ children }) {
  let creators = ["Soulbound Labs", "The Graph Foundation"];
  let thinkers = ["Zac Burns", "Brandon Ramirez"];

  return (
    <>
      <header className="lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-112 lg:items-start lg:overflow-y-auto xl:w-120">
        <div className="hidden lg:sticky lg:top-0 h-full lg:flex lg:w-16 lg:flex-none lg:items-center lg:whitespace-nowrap lg:py-12 lg:text-sm lg:leading-7 lg:[writing-mode:vertical-rl]">
          <div className="flex justify-between items-center w-full h-full">
            <div className="flex lg:w-16 px-5">
              <span className="font-mono text-slate-300">Created by</span>
              <span className="mt-6 flex gap-6 font-bold text-slate-300">
                {creators.map((host, hostIndex) => (
                  <Fragment key={host}>
                    {hostIndex !== 0 && (
                      <span aria-hidden="true" className="text-slate-400">
                        /
                      </span>
                    )}
                    {host}
                  </Fragment>
                ))}
              </span>
            </div>

            <div className="flex lg:w-16 px-5">
              <span className="font-mono text-slate-300">
                Original concept by
              </span>
              <span className="mt-6 flex gap-6 font-bold text-slate-300">
                {thinkers.map((host, hostIndex) => (
                  <Fragment key={host}>
                    {hostIndex !== 0 && (
                      <span aria-hidden="true" className="text-slate-400">
                        /
                      </span>
                    )}
                    {host}
                  </Fragment>
                ))}
              </span>
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto px-4 pb-4 pt-10 sm:px-6 md:max-w-2xl md:px-4 lg:min-h-full lg:flex-auto lg:border-x lg:border-slate-500 lg:py-12 lg:px-8 xl:px-12">
          <a
            className="relative mx-auto block w-48 overflow-hidden rounded-lg bg-sky-900 p-16 shadow-xl  sm:w-64 sm:rounded-xl lg:w-auto lg:rounded-2xl"
            aria-label="Homepage"
          >
            <img className="w-full" src={posterImage} alt="" />
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-black/10 sm:rounded-xl lg:rounded-2xl" />
          </a>
          <div className="mt-10 text-center lg:mt-12 lg:text-left">
            <p className="text-xl font-bold text-slate-300">
              <a>
                Subgraph Bridge{" "}
                <span className="text-xs font-mono relative top-px mt-px">
                  v0.01
                </span>
              </a>
            </p>
            <p className="mt-3 text-lg font-medium leading-8 text-slate-300">
              Bridge your subgraph query results on-chain. Transform your
              subgraph into a read-oriented rollup.
            </p>
          </div>
          <AboutSection className="mt-12 hidden lg:block" />

          <LimitationSection className="mt-12 hidden lg:block" />
          <section className="mt-10 lg:mt-12">
            <h2 className="sr-only flex items-center font-mono text-sm font-medium leading-7 text-slate-900 lg:not-sr-only">
              <span className="ml-2.5">Listen</span>
            </h2>
            <div className="h-px bg-gradient-to-r from-slate-200/0 via-slate-200 to-slate-200/0 lg:hidden" />
            <ul
              role="list"
              className="mt-4 flex justify-center gap-10 text-base font-medium leading-7 text-slate-300 sm:gap-8 lg:flex-col lg:gap-4"
            >
              {[
                ["The Graph", TheGraphSVG, "https://thegraph.com"],
                ["Twitter", BrandTwitter, "https://twitter.com/soulboundlabs"],
                ["Discord", BrandDiscord, "https://discord.gg/BQYZhmvSWN"],
                ["GitHub", BrandGithub, "https://github.com/soulboundlabs"],
              ].map(([label, Icon, href]) => (
                <li key={label as string} className="flex">
                  <a
                    href={href as string}
                    target="_blank"
                    className="group flex items-center"
                  >
                    <Icon className="h-8 w-8 opacity-70 group-hover:opacity-100" />
                    <span className="hidden sm:ml-3 sm:block">{label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </header>
      <main className="border-t border-slate-500 lg:relative lg:mb-28 lg:ml-112 lg:border-t-0 xl:ml-120 h-screen overflow-auto">
        <div className="relative">{children}</div>
      </main>
      <footer className="border-t border-slate-500 bg-slate-50 py-10 pb-40 sm:py-16 sm:pb-32 lg:hidden">
        <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4">
          <AboutSection />
          <h2 className="mt-8 flex items-center font-mono text-sm font-medium leading-7 text-slate-900">
            <PersonIcon className="h-3 w-auto fill-slate-300" />
            <span className="ml-2.5">Created by</span>
          </h2>
          <div className="mt-2 flex gap-6 text-sm font-bold leading-7 text-slate-900">
            {creators.map((host, hostIndex) => (
              <Fragment key={host}>
                {hostIndex !== 0 && (
                  <span aria-hidden="true" className="text-slate-400">
                    /
                  </span>
                )}
                {host}
              </Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
