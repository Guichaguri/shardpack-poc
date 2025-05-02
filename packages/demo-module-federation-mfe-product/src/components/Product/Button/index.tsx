"use client";

import { type ReactElement, useState } from 'react';

export function Button(): ReactElement {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      {count === 0 ? "Click me" : `You have clicked ${count} times`}
    </button>
  );
}
