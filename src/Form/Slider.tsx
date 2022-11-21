import ReactSlider from "react-slider";

import styled from "@emotion/styled";

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 10px;
`;

const StyledThumb = styled.div`
  height: 12px;
  width: 12px;
  line-height: 12px;
  margin-top: -1px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  background-color: rgb(2 132 199);
  color: #fff;
  border-radius: 50%;
  cursor: grab;
`;

const Thumb = (props, state) => <StyledThumb {...props}></StyledThumb>;

const StyledTrack = styled.div`
  top: 0;
  bottom: 0;
  background: rgb(51 65 85 / 0.5);
  border-radius: 4px;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

export const Slider = ({
  value = 0,
  label = "",
  onChange,
  marks = 10000,
  min = 0,
  max = 100,
  format = (val) => val,
}) => {
  return (
    <div className="flex items-center gap-4">
      <StyledSlider
        value={value}
        onChange={onChange}
        min={min}
        marks={marks}
        max={max}
        renderTrack={Track}
        renderThumb={Thumb}
      />
      <div className="w-40 font-semibold">
        {format(value)} {label}
      </div>
    </div>
  );
};
