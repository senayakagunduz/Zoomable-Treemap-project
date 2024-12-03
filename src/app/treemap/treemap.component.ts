


import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TreeNode, treemapData } from './exmp';

@Component({
  //selector: Defines the component to be used with the <app-treemap> tag in HTML
  selector: 'app-treemap',
  //template: Defines a div that contains the SVG element. Treemap will be drawn inside the SVG
  template: `<div class="w-full h-full">
  <button class="pb-4" (click)="addNode()">add node </button>
      <svg #treemapSvg class="w-full h-auto"></svg>
    </div>`,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    svg {
      max-width: 100%;
      height: auto;
      font: 10px sans-serif;
    }
    .node-text {
      font-family: Arial, sans-serif;
      fill: #333;
    }
    .node {
      stroke: #fff;
      stroke-width: 1px;
    }
    .leaf-node {
      fill: #457b9d;
    }
    .parent-node {
      fill: #a8dadc;
    }
    .root-node {
      fill: #f1faee;
    }
      
  `]
})
export class TreemapComponent implements OnInit {
  //@ViewChild('treemapSvg'): Used to access the SVG element in the template
  @ViewChild('treemapSvg', { static: true }) svgRef!: ElementRef<SVGSVGElement>;

  private width = 928;
  private height = 924;

  private svg!: d3.Selection<SVGElement, unknown, null, undefined>;
  private x = d3.scaleLinear().range([0, this.width]);
  private y = d3.scaleLinear().range([0, this.height]);
  //Current root node in the Treemap.
  private currentRoot!: TreeNode;

  ngOnInit() { }

  //ngAfterViewInit: createTreemap is called after the visual DOM is loaded. SVG is populated at this stage.
  ngAfterViewInit() {
    this.createTreemap();
  }

  public treemapData: TreeNode = treemapData;
  addNode() {
    const newNode: TreeNode = {
      id: this.generateRandomId(),
      name: "foo",
      type: "file",
      children: []
    };
    this.addNodeToLeaf(newNode);
  }

  private generateRandomId(): string {
    return `node-${Math.random().toString(36).substr(2, 9)}`;
  }

  private addNodeToLeaf(newNode: TreeNode) {
    const leafNodes: TreeNode[] = [];

    const collectLeafNodes = (node: TreeNode) => {
      if (!node.children || node.children.length === 0) {
        leafNodes.push(node);
      } else {
        node.children.forEach((child) => collectLeafNodes(child));
      }
    };

    collectLeafNodes(this.treemapData);

    if (leafNodes.length === 0) {
      console.error("No leaf nodes found to add a new node.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * leafNodes.length);
    const randomLeafNode = leafNodes[randomIndex];

    randomLeafNode.children = randomLeafNode.children || [];
    randomLeafNode.children.push(newNode);

    // shows where leafnode is added
    alert(`Node added under: ${randomLeafNode.name}`);

    this.createTreemap();
  }
 
  private createTreemap() {
    //select SVG and adjust size settings.
    const svg = d3.select(this.svgRef.nativeElement)
      .attr("viewBox", [0.5, -30.5, this.width, this.height])
      .style("max-width", "100%")
      .style("height", "auto");

    // Clear existing content
    svg.selectAll("*").remove();

    const x = d3.scaleLinear().rangeRound([0, this.width]);
    const y = d3.scaleLinear().rangeRound([0, this.height]);

    //Decides nodes color.
    const getNodeColor = (d: any) => {
      if (!d.parent) return '#d0e0ea';
      if (d.children) return '#b4cede';
      return '#C6DAE6';
    };
    //Returns icon according to type of node.
    const getIconPath = (type: string) => {
      const iconMap: { [key: string]: string } = {
        'bundle--16': '/assets/icons/software.svg',
        'x-acs-subnet': '/assets/icons/x-acs-subnet.svg',
        'x-acs-device': '/assets/icons/x-acs-device.svg',
        'user-account': '/assets/icons/user-account.svg',
        'process': '/assets/icons/process.svg',
        'directory': '/assets/icons/directory.svg',
        'file': '/assets/icons/file.svg',
        'x-acs-credential': '/assets/icons/x-acs-credential.svg'
      };
      return iconMap[type] || '/assets/icons/default-icon.svg';
    };
    // Calculate node's placement coordinates.
    const tile = (node: any, x0: number, y0: number, x1: number, y1: number) => {
      d3.treemapBinary(node, 0, 0, this.width, this.height);
      for (const child of node.children || []) {
        child.x0 = x0 + (child.x0 / this.width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / this.width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / this.height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / this.height) * (y1 - y0);
      }
    };
    //Calculate node position in SVG.
    const position = (group: any, root: any) => {
      group.selectAll("g")
        .attr("transform", (d: any) => {
          return d === root ?
            `translate(0,-30)` :
            `translate(${x(d.x0)},${y(d.y0)})`;
        });

      group.selectAll("rect.node-rect")
        .attr("width", (d: any) => {
          return d === root ? this.width : x(d.x1) - x(d.x0);
        })
        .attr("height", (d: any) => {
          return d === root ? 30 : y(d.y1) - y(d.y0);
        })

      group.selectAll("g.icon-group")
        .attr("transform", (d: any) => {
          if (d === root) return "";
          const nodeWidth = x(d.x1) - x(d.x0);
          const nodeHeight = y(d.y1) - y(d.y0);
          return `translate(${nodeWidth / 2},${nodeHeight / 2})`;
        });
    };

    const zoomin = (event: any, d: any) => {
      const group0 = group.attr("pointer-events", "none");
      const group1 = group = svg.append("g").call((g: any) => render(g, d));

      x.domain([d.x0, d.x1]);
      y.domain([d.y0, d.y1]);

      svg.transition()
        .duration(750)
        .call((t: any) => group0.transition(t)
          .remove()
          .call((g: any) => position(g, d.parent)))
        .call((t: any) => group1.transition(t)
          .attrTween("opacity", () => {
            const interpolator = d3.interpolate(0, 1);
            return (t: number) => interpolator(t).toString(); // convert "number" to "string"
          })
          .call((g: any) => position(g, d)));
    };

    const zoomout = (event: any, d: any) => {
      const group0 = group;
      const group1 = group = svg.insert("g", "*")
        .call((g: any) => render(g, d.parent));

      x.domain([d.parent.x0, d.parent.x1]);
      y.domain([d.parent.y0, d.parent.y1]);

      svg.transition()
        .duration(750)
        .call((t: any) => group0.transition(t)
          .remove()
          .attrTween("opacity", () => {
            const interpolator = d3.interpolate(1, 0);
            return (t: number) => interpolator(t).toString(); // convert "number" to "string"
          })
          .call((g: any) => position(g, d)))
        .call((t: any) => group1.transition(t)
          .call((g: any) => position(g, d.parent)));
    };
   
    const render = (group: any, root: any) => {
      const node = group
        .selectAll("g")
        .data(root.children ? root.children.concat(root) : [root])
        .join("g");

      node.filter((d: any) => (d === root ? d.parent : d.children))
        .attr("cursor", "pointer")
        .on("click", (event: any, d: any) => (d === root ? zoomout(event, d) : zoomin(event, d)));

      node.append("rect")
        .attr("class", "node-rect")
        .attr("fill", (d: any) => getNodeColor(d))
        .attr("stroke", "#fff")
        .attr("stroke-width", 4)
        .attr("rx", 15)
        .attr("ry", 15);

      const iconGroup = node.append("g")
        .attr("class", "icon-group")
        .attr("transform", (d: any) => {
          if (d === root) {
            return "translate(-10, 0)"; // shift left for root node
          }
          return ""; // Do not affect other nodes
        });

      // Rectangle in Root
      iconGroup.append("rect")
        .attr("width", (d: any) => (d === root ? 20 : 40))
        .attr("height", (d: any) => (d === root ? 20 : 40))
        .attr("fill", "white")
        .attr("rx", (d: any) => (d === root ? 0 : 5))
        .attr("ry", (d: any) => (d === root ? 0 : 5))
        .attr("stroke", "gray")
        .attr("stroke-width", 2)
        .attr("x", (d: any) => (d === root ? 12 : -20))
        .attr("y", (d: any) => (d === root ? 2 : -20))
        .attr("stroke-dasharray", "4,2");

      // An image on Root
      iconGroup.append("image")
        .attr("width", (d: any) => (d === root ? 15 : 20))
        .attr("height", (d: any) => (d === root ? 15 : 20))
        .attr("href", (d: any) => getIconPath(d.data.type))
        .attr("x", (d: any) => (d === root ? 15 : -10))
        .attr("y", (d: any) => (d === root ? 2 : -10))
        .attr("preserveAspectRatio", "xMidYMid meet");

      // Add Text on rectangles(Root and children)
      iconGroup.append("text")
        .attr("x", (d: any) => (d === root ? 30 : ""))
        .attr("y", (d: any) => (d === root ? 30 : 30))
        .attr("text-anchor", "middle")
        .attr("font-size", "10px")
        .attr("fill", "#666")
        .text((d: any) => d.data.type || "");

      position(group, root);
    };


    // Initialize visualization
    const hierarchy = d3.hierarchy(treemapData)
      .sum(() => 1);

    const root = d3.treemap<TreeNode>()
      .tile(tile)(hierarchy);

    let group = svg.append("g");
    render(group, root);
  }

}


