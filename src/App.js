import { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e, isButton = false) => {
    // Prevent default form submission
    e.preventDefault();
    
    // Only proceed if it's a button click or Enter key press, and input is not empty
    if ((isButton || e.key === 'Enter') && input.trim()) {
      setLoading(true);
      try {
        const res = await fetch('https://flask-3-9pei.onrender.com/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type'
          },
          body: JSON.stringify({ question: input.trim() }),
        });
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        setResponse(data.answer);
      } catch (error) {
        console.error('Error:', error);
        setResponse('An error occurred while fetching the response.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>AI Assistant</h1>
      </header>
      <div className="container">
        <div className="chat-container">
          {response && !loading && (
            <div className="response-bubble">
              {response}
            </div>
          )}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
            placeholder="Type your question here..."
            className="input-field"
            disabled={loading}
          />
          <button 
            onClick={(e) => handleSubmit(e, true)}
            className="submit-button"
            disabled={loading}
          >
            {loading ? <span className="loading-dots">...</span> : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
