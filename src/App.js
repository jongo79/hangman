import React from 'react';
import './App.css'; // Import CSS file
import Game from './Game'; // Import your Game component
// Import any other components or libraries you need

function App() {
  return (
    <div className="App">
      
      <main>
        <Game /> {/* Render your Game component here */}
      </main>
      
    </div>
  );
}

export default App;