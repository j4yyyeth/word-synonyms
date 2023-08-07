import { useState } from "react";
import axios from "axios";

const App = () => {

  interface synonymArr {
    word: string;
    score: number;
  }

  const [ word, setWord ] = useState<string>("");
  const [ data, setData ] = useState<synonymArr[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.datamuse.com/words?rel_syn=${word}`);
      console.log(response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
    setWord("");
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Word</label>
        <input type="text" value={word} onChange={(e)=>{setWord(e.target.value)}}></input>
        <button type="submit">Find Synonyms</button>
      </form>
      {
        data.length ?
          data.map(element => <h1 key={element.score}>{element.word}</h1>)
        :
          <h1>No Synonyms</h1>
      }
    </div>
  );
}

export default App;
