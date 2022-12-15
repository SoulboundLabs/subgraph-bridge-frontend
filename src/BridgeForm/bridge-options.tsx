import { parseEther } from "ethers/lib/utils.js";

export const minimumSlashableGRTOptions = [
  {
    label: (
      <div>
        <div>Low Security</div>
        <div className="text-xs">100k Self-Staked GRT</div>
      </div>
    ),
    value: parseEther(String(100000)),
  },
  {
    label: (
      <div>
        <div>Basic Security</div>
        <div className="text-xs">300k Self-Staked GRT</div>
      </div>
    ),
    value: parseEther(String(300000)),
  },
  {
    label: (
      <div>
        <div>Medium Security</div>
        <div className="text-xs">750k Self-Staked GRT</div>
      </div>
    ),
    value: parseEther(String(750000)),
  },
  {
    label: (
      <div>
        <div>Strong Security</div>
        <div className="text-xs">2M Self-Staked GRT</div>
      </div>
    ),
    value: parseEther(String(2000000)),
  },
  {
    label: (
      <div>
        <div>Max Security</div>
        <div className="text-xs">5M Self-Staked GRT</div>
      </div>
    ),
    value: parseEther(String(5000000)),
  },
];

export const proposalFreezePeriodOptions = [
  {
    label: (
      <div>
        <div>Immediate Finality</div>
        <div className="text-xs">0 Blocks</div>
      </div>
    ),
    value: 0,
  },
  {
    label: (
      <div>
        <div>Quick Finality</div>
        <div className="text-xs">100 Blocks</div>
      </div>
    ),
    value: 100,
  },
  {
    label: (
      <div>
        <div>Medium Finality</div>
        <div className="text-xs">1,000 Blocks</div>
      </div>
    ),
    value: 1000,
  },
  {
    label: (
      <div>
        <div>Long Finality</div>
        <div className="text-xs">5,000 Blocks</div>
      </div>
    ),
    value: 5000,
  },
  {
    label: (
      <div>
        <div>Extended Finality</div>
        <div className="text-xs">25,000 Blocks</div>
      </div>
    ),
    value: 25000,
  },
];
