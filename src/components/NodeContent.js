import React, {useEffect, useState} from 'react'

const NodeContent = (props) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    //fetch all variables
    fetch('/variables', {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setVariables(data)
    });
  }, [])

  const parseBodyContent = (content) => {
    let result = [];
    //check content to find if there is a string linteral within it by checking the first character of each word
    content.split(/[ ,]+/).forEach((content) => {
      if (content[0] === '{') {
        let contentOptions = content.substring(1, content.length - 1).split('|')
        let foundVariable = variables.filter(variable => variable.id === contentOptions[0])
        result.push((foundVariable.length > 0) ? foundVariable[0].name : contentOptions[1]);
      } else {
        result.push(content)
      }
    })
    return result.join(' ')
  }

  return (
    <div className="Content-Wrapper">
      {
        props.allContent.map((content, index) => {
          return (
            <div
              key={`content${index}`}
              className="Node-Content">
                {(content.type === 'image') ?
                  <img src={content.url} alt="FROM Express API"/> :
                  parseBodyContent(content.body)
                }
            </div>
          )
        })
      }
    </div>
  )
}

export default NodeContent;