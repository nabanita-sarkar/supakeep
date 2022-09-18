import React from "react";

const alphaNumPos = (text: string | number) => {
  if (typeof text === "number") return text;
  else return text.charCodeAt(0) - 97;
};

const transform = (id: string, pos: number, deg: number) => {
  return `rotateZ(${Math.floor(alphaNumPos(id[pos]) * deg)}deg)`;
};

function Patern({ id }: { id: string }) {
  const color = "#" + id?.substring(4, 10);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        height: 50,
        background: color + "66", // 40% opacity -> 66 in hex
      }}
    >
      <div
        style={{
          height: 40,
          width: 40,
          borderLeft: `15px solid ${color}`,
          borderBottom: `15px solid ${color}`,
          transform: transform(id, 8, 230),
        }}
      />
      <div
        style={{
          height: 30,
          width: 40,
          borderRadius: "50%",
          background: color + "B3",
          transform: transform(id, 13, 50),
        }}
      />
      <div
        style={{
          height: 30,
          width: 30,
          clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          background: color + "EC",
          transform: transform(id, 17, 170),
        }}
      />
    </div>
  );
}

export default Patern;
