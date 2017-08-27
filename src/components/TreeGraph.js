import React from "react";
var d3 = require('d3');

export default class TreeGraph extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: `chart-${this.props.id}`
    };
  }
  renderTreeMap(el) {
    const width = 500;
    const height = 200;

    const nest = d3.nest()
      .key((d) => d.Type)
      .key((d) => d.Amount)
      .rollup((d) => d3.sum(d, (d) => d.Volume ));

    const treemap = d3.treemap()
      .size([width, height])
      .valueOf((d)=> d.size);

    let dataItems = this.props.data.toJS()[0].Items;
    dataItems.push({
      "Type": "Empty Space",
      "Amount": 0,
      "Mass": 0,
      "Volume": this.props.data.toJS()[0].MaxVolume -  this.props.data.toJS()[0].CurrentVolume
    });

    debugger;
    const root = d3.hierarchy({values: nest.entries(dataItems)}, (d)=> d.values)
      .sum((d)=> d.value)
      .sort((a, b)=> b.value - a.value);

      treemap(root);

    const node = d3.select(el)
      .selectAll(".node")
      .data(root.leaves())
      .enter().append("div")
      .attr("class", "node")
      .style("left", (d) => d.x0 + "px")
      .style("top", (d) => d.y0 + "px")
      .style("width", (d) => d.x1 - d.x0 + "px" )
      .style("height", (d) => d.y1 - d.y0 + "px")
      .style("background-color", '#ccc')
      .style("border", '1px solid #000')
      .style("position", "absolute");

      node.append("div")
        .attr("class", "node-label")
        .text((d) => d.parent.data.key  + ' x ' + d.data.key);
  }

  componentDidMount() {
    const el = `#${this.state.id}`;
    this.renderTreeMap(el)
  }

  render() {
    return (
      <div id={this.state.id} className="tree-graph--MAIN"></div>
    );
  }
}
