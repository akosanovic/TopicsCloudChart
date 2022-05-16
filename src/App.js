// import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import InfoBoxEmptyPlaceholder from './InfoBoxEmptyPlaceholder';
import WordCloudChart from './WordCloudChart';
import data from './topics.json'

// const LOCAL_STORAGE_SELECTED_TOPIC = 'selectedTopic';

function App() {
  var chartData, selectedTopic; 
  var [selectedTopic, setSelectedTopic] = useState();

  const topics = data.topics;

  chartData = topics.map(topic => {
    return { name: topic.label, weight: topic.sentimentScore }
  })

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_SELECTED_TOPIC, JSON.stringify(selectedTopic));
    selectedTopic = selectedTopic ? selectedTopic : null;
  }, [selectedTopic])

  // // Only called once - on app load
  useEffect(() => {
    console.log('Todo: handle set chart data');
  //   selectedTopic = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SELECTED_TOPIC));
  }, [])



  function onTopicUpdate(selectedId) {
    setSelectedTopic(() => { return topics[selectedId] });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1> My Topics Challenge </h1>
      </header>

      {/* <div className='content' style={{ display: 'flex' }}> */}
      <div>

        <WordCloudChart className="chartContainer" onTopicUpdate={onTopicUpdate} chartData={chartData}></WordCloudChart>

        <div className='infoBox-container'>
          {selectedTopic ? <InfoBox selectedTopic={selectedTopic}></InfoBox> : <InfoBoxEmptyPlaceholder></InfoBoxEmptyPlaceholder>}
        </div>
      </div>
    </div>
  );
}

export default App;
