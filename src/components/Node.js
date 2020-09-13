import React, {useState} from 'react'

const MainNode = (props) => {
  const [subNodes, setSubNodes] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  const getSubNodes = (index) => {
    //get subnodes after clicking on another subnode
    props.setSelectedNode(index)
    fetch(`/nodes/${index}`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data[0].connections)
        setSubNodes(data[0].connections);

      props.setContent(data[0].content)
    });
  }

  return (
    <div className="Node-Wrapper">
      <div
        className={`Node ${(props.clickIndex === props.selectedNode) && 'selected'}`}
        style={{
          paddingLeft: `${props.level * 16}px`
        }}
        onClick={()=>getSubNodes(props.clickIndex)}>
        {props.title}
      </div>
      {
        (props.clickIndex === props.selectedNode) &&
            subNodes.map((node, index) => {
              return <MainNode
                        allNodes={props.allNodes}
                        title={props.allNodes[node - 1].title}
                        clickIndex={node}
                        key={`level${props.level}node${index}`}
                        level={props.level+1}
                        setContent={(content)=>props.setContent(content)}
                        selectedNode={selectedNode}
                        setSelectedNode={(id)=>setSelectedNode(id)}
                      />
            })
      }
    </div>

  )
}

export default MainNode;