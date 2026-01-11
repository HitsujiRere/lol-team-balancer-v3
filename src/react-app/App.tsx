import { Button } from "@heroui/react";
import { useState } from "react";
import { client } from "./lib/hono";

function App() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState("unknown");

  return (
    <>
      <h1 className="text-2xl">Hello world!</h1>
      <Button
        onPress={() => setCount((count) => count + 1)}
        aria-label="increment"
      >
        count is {count}
      </Button>
      <Button
        onPress={() => {
          client.api.time
            .$get()
            // fetch("/api/time")
            .then((res) => res.json())
            .then(({ time }) => setTime(time));
        }}
        aria-label="get name"
      >
        Time from API is: {time}
      </Button>
    </>
  );
}

export default App;
