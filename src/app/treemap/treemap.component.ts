import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TreeNode, treemapData } from './data';

// TreemapNode, D3'ün HierarchyRectangularNode tipine ek alanlar (ör. leafUid, clipUid) ekler.
//  Bu alanlar her düğümün benzersiz kimlikleri için kullanılır.

interface TreemapNode extends d3.HierarchyRectangularNode<TreeNode> {
  leafUid?: { id: string; href: string };
  clipUid?: { id: string; href: string };
}

@Component({
  selector: 'app-treemap',
  template: '<svg #treemap></svg>',
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
    .parent-node {
      fill: #a8dadc;
    }
    .leaf-node {
      fill: #457b9d;
    }
    .root-node {
      fill: #f1faee;
    }
  `]
})

export class TreemapComponent implements OnInit {
  @ViewChild('treemap', { static: true }) treemapRef!: ElementRef<SVGElement>;

  private readonly width = 928;
  private readonly height = 924;
  //svg, group: D3 seçimleri. SVG ve altındaki g (grup) elemanları için kullanılır.
  private svg!: d3.Selection<SVGElement, unknown, null, undefined>;
  private group!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private x!: d3.ScaleLinear<number, number>;
  private y!: d3.ScaleLinear<number, number>;
  //format: Sayıları formatlamak için (örn. 1,000).
  private format = d3.format(",d");

  //Angular bileşeni yüklendiğinde initializeTreemap() çağrılır.
  ngOnInit(): void {
    this.initializeTreemap();
  }

  private initializeTreemap(): void {
    this.x = d3.scaleLinear().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([0, this.height]);

    //treemapRef: DOM'daki SVG elemanına erişmek için kullanılır.
    this.svg = d3.select(this.treemapRef.nativeElement)
      .attr("viewBox", [0.5, -30.5, this.width, this.height + 30])
      .attr("width", this.width)
      .attr("height", this.height + 30)
      .attr("style", "max-width: 100%; height: auto;");

    const tile = (node: d3.HierarchyRectangularNode<TreeNode>, x0: number, y0: number, x1: number, y1: number) => {
      d3.treemapBinary(node, 0, 0, this.width, this.height);
      for (const child of node.children || []) {
        child.x0 = x0 + (child.x0 / this.width) * (x1 - x0);
        child.x1 = x0 + (child.x1 / this.width) * (x1 - x0);
        child.y0 = y0 + (child.y0 / this.height) * (y1 - y0);
        child.y1 = y0 + (child.y1 / this.height) * (y1 - y0);
      }
    };

    //Use imported treemapData
    // const hierarchy = d3.hierarchy(treemapData)
    //   .sum(d => d.value || 0)
    //   .sort((a, b) => (b.value || 0) - (a.value || 0));

    //hierarşi oluşturulur
    const hierarchy = d3.hierarchy(treemapData)
      .sum(d => d.value ?? 0)
      .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

    //treemap i uyguluyor
    const root = d3.treemap<TreeNode>()
      .tile(tile)(hierarchy) as TreemapNode;
    this.group = this.svg.append("g");
    this.render(this.group, root);
  }

  private getNodeColor(d: TreemapNode): string {
    if (d.parent === null) return 'var(--root-color, #f1faee)';
    if (d.children) return 'var(--parent-color, #a8dadc)';
    return 'var(--leaf-color, #457b9d)';
  }

  private getName(d: TreemapNode): string {
    return d.ancestors().reverse().map(d => d.data.name).join("/");
  }

  //Veriyi SVG içinde düğümler ve dikdörtgenler olarak çizer.Düğümler: rect ve text elemanlarından oluşur.
  private render(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
    const node = group
      .selectAll<SVGGElement, TreemapNode>("g")
      .data(root.children ? root.children.concat(root) : [root])
      .join("g");

    node.filter((d) => (d === root ? !!d.parent : !!d.children)) // undefined'ı boolean'a çeviriyoruz
      .attr("cursor", "pointer")
      .on("click", (event, d) => d === root ? this.zoomout(root) : this.zoomin(d));

    node.append("title")
      .text(d => `${this.getName(d)}\n${this.format(d.value || 0)}`);

    node.append("rect")
      .attr("id", d => {
        d.leafUid = { id: `leaf-${Math.random().toString(36).substr(2, 9)}`, href: `#leaf-${Math.random().toString(36).substr(2, 9)}` };
        return d.leafUid.id;
      })
      .attr("fill", d => this.getNodeColor(d))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1);

    node.append("clipPath")
      .attr("id", d => {
        d.clipUid = { id: `clip-${Math.random().toString(36).substr(2, 9)}`, href: `#clip-${Math.random().toString(36).substr(2, 9)}` };
        return d.clipUid.id;
      })
      .append("use")
      .attr("xlink:href", d => d.leafUid?.href || '');

    const text = node.append("text")
      .attr("clip-path", d => d.clipUid ? `url(${d.clipUid.href})` : null)
      .attr("class", "node-text")
      .attr("font-weight", d => d === root ? "bold" : null);

    text.selectAll("tspan")
      .data(d => {
        const name = d === root ? this.getName(d) : d.data.name;
        return name.split(/(?=[A-Z][^A-Z])/g).concat(this.format(d.value || 0));
      })
      .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i, nodes) => `${(i === nodes.length - 1 ? 0.3 : 0) + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
      .text(d => d);

    this.position(group, root);
  }
  //Düğümleri x ve y koordinatlarına göre pozisyonlar.
  private position(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
    group.selectAll("g")
      .attr("transform", d => {
        const node = d as TreemapNode;
        return node === root ?
          `translate(0,-30)` :
          `translate(${this.x(node.x0)},${this.y(node.y0)})`;
      })
      .select("rect")
      .attr("width", d => {
        const node = d as TreemapNode;
        return node === root ?
          this.width :
          this.x(node.x1) - this.x(node.x0);
      })
      .attr("height", d => {
        const node = d as TreemapNode;
        return node === root ?
          30 :
          this.y(node.y1) - this.y(node.y0);
      });
  }

  //Yakınlaştırma
  private zoomin(d: TreemapNode): void {
    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.append("g").call(g => this.render(g, d));

    this.x.domain([d.x0, d.x1]);
    this.y.domain([d.y0, d.y1]);

    this.svg.transition()
      .duration(750)
      .call(t => group0.transition(t as any).remove()
        .call(g => this.position(g.selection(), d.parent as TreemapNode)))
      .call(t => group1.transition(t as any)
        //.attrTween("opacity", () => d3.interpolate(0, 1))
        .call(g => this.position(g.selection(), d)));
  }

  //Uzaklaştırma:
  private zoomout(d: TreemapNode): void {
    if (!d.parent) return;

    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.insert("g", "*")
      .call(g => this.render(g, d.parent as TreemapNode));

    this.x.domain([d.parent.x0, d.parent.x1]);
    this.y.domain([d.parent.y0, d.parent.y1]);

    this.svg.transition()
      .duration(750)
      .call(t => group0.transition(t as any).remove()
        //.attrTween("opacity", () => d3.interpolate(1, 0))
        .call(g => this.position(g.selection(), d)))
      .call(t => group1.transition(t as any)
        .call(g => this.position(g.selection(), d.parent as TreemapNode)));
  }
}





