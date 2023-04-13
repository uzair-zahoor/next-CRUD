import React, { useEffect, useState, useCallback, useRef } from "react";
import SearchBox from "./map-component/searchbox";
import Maps from "./map-component/map";
import zIndex from "@mui/material/styles/zIndex";
interface UserLocProps {
  onChange: (selectPosition: any) => void;
  value: any;
}
function UserLoc({ onChange, value }: UserLocProps): JSX.Element {
  const [selectPosition, setSelectPosition] = useState(null);
  const onChangeMemoized = useCallback(onChange, []);
  const valueRef = useRef(value);

  useEffect(() => {
    if (valueRef.current) {
      setSelectPosition(valueRef.current);
    }
  }, []);

  useEffect(() => {
    onChangeMemoized(selectPosition);
  }, [onChangeMemoized, selectPosition]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "85vh",
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#D3D3D3',
        borderRadius: 10,
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div style={{ width: "35%", position: 'absolute', top: 0, right: 0, zIndex: 2 }}>
        <SearchBox
          selectPosition={selectPosition}
          setSelectPosition={setSelectPosition}
        />
      </div>
      <div style={{ width: "100%", height: "100%", position: 'relative', zIndex: 1 }}>
        <Maps selectPosition={selectPosition} />
      </div>
    </div>
  );
}

export default UserLoc;