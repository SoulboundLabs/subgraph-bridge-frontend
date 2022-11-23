import gnosisModule from "@web3-onboard/gnosis";
import injectedModule from "@web3-onboard/injected-wallets";
import keepkeyModule from "@web3-onboard/keepkey";
import keystoneModule from "@web3-onboard/keystone";
import ledgerModule from "@web3-onboard/ledger";
import { init } from "@web3-onboard/react";
import torusModule from "@web3-onboard/torus";
import walletConnectModule from "@web3-onboard/walletconnect";
import walletLinkModule from "@web3-onboard/walletlink";
import soulboundIcon from "../assets/logos/soulbound-s.svg";
import soulboundLogo from "../assets/logos/soulbound-studio-black.svg";

const alchemyKey = import.meta.env.VITE_ALCHEMY_KEY;

const injected = injectedModule({
  custom: [
    // include custom injected wallet modules here
  ],
  filter: {
    // mapping of wallet labels to filter here
  },
});

const walletLink = walletLinkModule();

const walletConnect = walletConnectModule();

const torus = torusModule();
const ledger = ledgerModule();
const keepkey = keepkeyModule();
const keystone = keystoneModule();
const gnosis = gnosisModule();

export const initWeb3Onboard = () =>
  init({
    // An array of wallet modules that you would like to be presented to the user to select from when connecting a wallet.
    wallets: [
      injected,
      ledger,
      walletConnect,
      keepkey,
      keystone,
      walletLink,
      torus,
      gnosis,
    ],
    // An array of Chains that your app supports
    chains: [
      // {
      //   id: "0x1",
      //   namespace: "evm",
      //   token: "ETH",
      //   label: "Ethereum Mainnet",
      //   rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`,
      // },
      {
        id: "0x5",
        namespace: "evm",
        token: "ETH",
        label: "Goerli Testnet",
        rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${alchemyKey}`,
      },
    ],

    accountCenter: {
      desktop: {
        enabled: false,
      },
    },
    appMetadata: {
      // The name of your dApp
      name: "Blocknative",
      // SVG icon string, with height or width (whichever is lgr) set to 100% or a valid image URL
      icon: soulboundIcon,
      // Optional wide format logo (ie icon and text) to be displayed in the sidebar of connect modal. Defaults to icon if not provided
      logo: soulboundLogo,

      // The description of your app
      description: "Demo app for Onboard V2",
      // The url to a getting started guide for app
      gettingStartedGuide: "http://mydapp.io/getting-started",
      // url that points to more information about app
      explore: "http://mydapp.io/about",
      // if your app only supports injected wallets and when no injected wallets detected, recommend the user to install some
      recommendedInjectedWallets: [
        {
          // display name
          name: "MetaMask",
          // link to download wallet
          url: "https://metamask.io",
        },
        { name: "Coinbase", url: "https://wallet.coinbase.com/" },
      ],
      // Optional - but allows for dapps to require users to agree to TOS and privacy policy before connecting a wallet
      // agreement: {
      //   version: '1.0.0',
      //   termsUrl: 'https://www.blocknative.com/terms-conditions',
      //   privacyUrl: 'https://www.blocknative.com/privacy-policy'
      // }
    },
    // example customising copy
    // i18n: {
    //   en: {
    //     connect: {
    //       selectingWallet: {
    //         header: 'custom text header'
    //       }
    //     }
    //   }
    // }
  });
