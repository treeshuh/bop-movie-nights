import React from 'react';
import '../external/omdb';
import '../external/firebase';

interface State {
}

export default () => (
    <div className="PollsDebug">
        <button onClick={() => { }}>Create Poll</button>
        <button onClick={() => { }} disabled={true}>Add option</button>
        <button onClick={() => { }} disabled={true}>Add vote</button>
        <ul>
            {}
        </ul>
    </div>

)