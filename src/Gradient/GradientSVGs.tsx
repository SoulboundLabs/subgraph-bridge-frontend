import styled from "@emotion/styled";
import {
  AlertTriangle,
  Aperture,
  Apps,
  ArrowRight,
  Atom2,
  Check,
  Rocket,
  Terminal2,
} from "tabler-icons-react";

const AppsWrapper = styled(Apps)`
  rect,
  line {
    fill: url("#radial-blue");
    stroke: url("#radial-blue");
  }
`;
const ArrowRightWrapper = styled(ArrowRight)`
  rect,
  line {
    fill: url("#radial-blue");
    stroke: url("#radial-blue");
  }
`;

const RocketWrapper = styled(Rocket)`
  path + path,
  circle {
    stroke: url("#radial-blue");
  }
`;

const Atom2Wrapper = styled(Atom2)`
  rect,
  circle,
  line {
    fill: url("#radial-blue");
    stroke: url("#radial-blue");
  }
  line + path,
  path + path {
    stroke: url("#radial-blue");
  }
`;

const ApertureWrapper = styled(Aperture)`
  rect,
  circle,
  line {
    stroke: url("#radial-blue");
  }
`;

const AlertWrapper = styled(AlertTriangle)`
  circle,
  line,
  path + path {
    stroke: url("#radial-orange");
  }
`;

const AlertFailure = styled(AlertTriangle)`
  circle,
  line,
  path + path {
    stroke: url("#radial-red");
  }
`;

const CheckOrangeWrapper = styled(Check)`
  path + path {
    stroke: url("#radial-orange");
  }
`;

const TerminalWrapper = styled(Terminal2)`
  path + path,
  rect,
  line {
    stroke: url("#radial-blue");
  }
`;

export const AppsGradient = (props) => <AppsWrapper {...props} />;

export const ArrowRightGradient = (props) => <ArrowRightWrapper {...props} />;

export const Atom2Gradient = (props) => <Atom2Wrapper {...props} />;

export const ApertureGradient = (props) => <ApertureWrapper {...props} />;

export const RocketGradient = (props) => <RocketWrapper {...props} />;

export const AlertGradient = (props) => <AlertWrapper {...props} />;

export const TerminalGradient = (props) => <TerminalWrapper {...props} />;

export const CheckOrangeGradient = (props) => <CheckOrangeWrapper {...props} />;

export const AlertFailureGradient = (props) => <AlertFailure {...props} />;
