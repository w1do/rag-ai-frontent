import React, { useState } from "react";
export default function Test() {
    const [c] = useState(1);
    return <div>Test {c}</div>;
}