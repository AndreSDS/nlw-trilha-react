import React, { ReactNode, useState } from "react";

interface ButtonProps {
  number?: number;
  text?: string;
  children?: ReactNode;
}

export function Button({ text, children, number = 0}: ButtonProps) {
  const [counter, setCounter] = useState(number);

  const increment = () => setCounter(counter + 1);


  return <button style={{margin: '10px', backgroundColor: 'orange'}} onClick={increment}>{text || children || counter}</button>;
}
