/**
*  Used React to implment a tree component.
*  A tree will be rendered and interactable. The tree component will called this 
*  way <Tree node={root}/>

demo https://imgur.com/a/AtjjUPM
*/

let root = {
    label: "Root",
    state: "open",
    children: [
      {
        label: "Node1",
        children: [
          {
            label: "Sub Node1"
          },
          {
            label: "Sub Node2"
          }
        ]
      },
      {
        label: "Node2",
        children: [
          {
            label: "Sub Node3"
          },
          {
            label: "Sub Node4"
          }
        ]
      }
    ]
  };
  
  class Tree extends React.Component{
    constructor(props){
      super(props);
      
      this.state = {isOpen: false};
    }
    
    componentDidMount() {
      const {node} = this.props;
      const {state} = node;
      if (state !== undefined) {
        //we only want to do this for the root node
        if (state === 'open') {
          this.setState({isOpen: true});
        } else {
          this.setState({isOpen: false});
        }
      }
    }
  
    onClick = () => {
      const {isOpen} = this.state;
      this.setState({isOpen: !isOpen});
    }
    
    renderSpace(level) {
      let space = "";
      for (let i = 0; i < level; i++) {
        space += "....";
      }
      return (
        <span>{space}</span>
      )
    }
  
    //For simplicity, I displayed "v" before an open label and ">" before a closed one
    renderLeadingMark = () => {
      const {isOpen} = this.state;
      const mark = isOpen ? "v" : ">";
      return (
        <span>{mark}</span>
      )
    }
    
    render(){
      let {node, level} = this.props;
      level = level === undefined ? 0 : level;
      
      const {label, children} = node;  
      const {isOpen} = this.state;
      const isLeaf = children === undefined;
  
      return (
        <div>
          <div onClick={this.onClick}>
            {this.renderSpace(level)}
            {isLeaf ? null : this.renderLeadingMark()}     
            {label}
          </div>
          <div>
            {isLeaf 
              ? null 
              : isOpen 
                ? <div>
                    {children.map(child => {
                      return <Tree node={child} level={level+1}/>;
                    })}
                  </div>
                : null
             }
          </div>
        </div>
      );
    }
  }
  
  ReactDOM.render(
    <Tree node={root}/>,
    document.getElementById("interview")
  )