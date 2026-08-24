import PropTypes from "prop-types";
import SegmentedToggle from "./../../elements/SegmentedToggle";

const DetailedIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 5h16v3H4V5Zm0 5.5h16v3H4v-3ZM4 16h16v3H4v-3Z" />
  </svg>
);

const CompactIcon = () => (
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" opacity="0.5" />
    <path d="M4 6h16v2H4V6Z" />
  </svg>
);

const OPTIONS = [
  { value: "detailed", label: "Vista detallada", icon: <DetailedIcon /> },
  { value: "compact", label: "Vista compacta", icon: <CompactIcon /> },
];

const ViewModeToggle = ({ mode, onChange }) => (
  <SegmentedToggle value={mode} onChange={onChange} options={OPTIONS} groupLabel="Vista de movimientos" />
);

ViewModeToggle.propTypes = {
  mode: PropTypes.oneOf(["detailed", "compact"]).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ViewModeToggle;
