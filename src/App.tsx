import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import styled from "styled-components";
import { Button } from "./components/Button";
import { Link } from "react-router-dom";
import tw from "twin.macro";

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div tw="grid grid-cols-1 gap-10 max-w-lg p-10 m-auto">
      <div tw="grid grid-cols-2 gap-4 content-center justify-items-center">
        <Link to={"https://vitejs.dev"}>
          <img src={viteLogo} alt="Vite logo" />
        </Link>
        <Link to={"https://reactjs.org"}>
          <img src={reactLogo} alt="React logo" />
        </Link>
      </div>

      <Title>Vite + React</Title>

      <Button
        label={`count is ${count}`}
        onClick={() => setCount((count) => count + 1)}
      />
    </div>
  );
};
