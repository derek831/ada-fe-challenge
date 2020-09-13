import React, { useEffect, useState } from 'react';
import './App.scss';
import SearchBar from "material-ui-search-bar";
import Node from './components/Node';
import NodeContent from './components/NodeContent';

function App() {
  const [mainNodes, setMainNodes] = useState([]);
  const [allNodes, setAllNodes] = useState([]);
  const [content, setContent] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    //fetch main nodes
    fetch('/nodes', {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setAllNodes(data)
      setMainNodes(data)
    });
  }, [])

  const requestSearch = () => {
    //update nodes after search bar request
    fetch('/nodes/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          "query": searchString
        }
      )
    }).then((response) => {
      return response.json();
    }).then((data) => {
      setMainNodes(data)
    });
  }

  return (
    <div className="App">
      <aside>
        <div className="Search-Bar-Wrapper">
        <SearchBar
          className="Node-Search-Bar"
          value={searchString}
          onChange={(newValue) => setSearchString(newValue)}
          onCancelSearch={()=>setMainNodes(allNodes)}
          onRequestSearch={() => requestSearch()}
        />
        </div>
        {
          mainNodes.map((node, index) =>
            <Node
              allNodes={allNodes}
              title={node.title}
              clickIndex={node.id}
              key={`mainNode${index}`}
              level={1}
              setContent={(content)=>setContent(content)}
              selectedNode={selectedNode}
              setSelectedNode={(id)=>setSelectedNode(id)}
            />
          )
        }
      </aside>
      <main>
        <NodeContent
          allContent={content}
        />
      </main>
    </div>
  );
}

export default App;
