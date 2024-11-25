// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as d3 from 'd3';
// import { TreeNode, treemapData } from './data';

// // TreemapNode, D3'ün HierarchyRectangularNode tipine ek alanlar (ör. leafUid, clipUid) ekler.
// //  Bu alanlar her düğümün benzersiz kimlikleri için kullanılır.

// interface TreemapNode extends d3.HierarchyRectangularNode<TreeNode> {
//   leafUid?: { id: string; href: string };
//   clipUid?: { id: string; href: string };
// }

// @Component({
//   selector: 'app-treemap',
//   template: '<svg #treemap></svg>',
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//       height: 100%;
//     }
//     svg {
//       max-width: 100%;
//       height: auto;
//       font: 10px sans-serif;
//     }
//     .node-text {
//       font-family: Arial, sans-serif;
//       fill: #333;
//     }
//     .parent-node {
//       fill: #a8dadc;
//     }
//     .leaf-node {
//       fill: #457b9d;
//     }
//     .root-node {
//       fill: #f1faee;
//     }
//   `]
// })

// export class TreemapComponent implements OnInit {
//   @ViewChild('treemap', { static: true }) treemapRef!: ElementRef<SVGElement>;

//   private readonly width = 928;
//   private readonly height = 924;
//   //svg, group: D3 seçimleri. SVG ve altındaki g (grup) elemanları için kullanılır.
//   private svg!: d3.Selection<SVGElement, unknown, null, undefined>;
//   private group!: d3.Selection<SVGGElement, unknown, null, undefined>;
//   private x!: d3.ScaleLinear<number, number>;
//   private y!: d3.ScaleLinear<number, number>;
//   //format: Sayıları formatlamak için (örn. 1,000).
//   private format = d3.format(",d");

//   //Angular bileşeni yüklendiğinde initializeTreemap() çağrılır.
//   ngOnInit(): void {
//     this.initializeTreemap();
//   }

//   private initializeTreemap(): void {
//     this.x = d3.scaleLinear().rangeRound([0, this.width]);
//     this.y = d3.scaleLinear().rangeRound([0, this.height]);

//     //treemapRef: DOM'daki SVG elemanına erişmek için kullanılır.
//     this.svg = d3.select(this.treemapRef.nativeElement)
//       .attr("viewBox", [0.5, -30.5, this.width, this.height + 30])
//       .attr("width", this.width)
//       .attr("height", this.height + 30)
//       .attr("style", "max-width: 100%; height: auto;");

//     this.svg.append("defs").html(`
//         <symbol id="icon-link" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M10 17l-5-5 5-5v3h4V7l5 5-5 5v-3h-4v3z"/>
//         </symbol>
//         <symbol id="icon-info" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2v6h-2zm0-4h2v2h-2z"/>
//         </symbol>
//       `);

//     const tile = (node: d3.HierarchyRectangularNode<TreeNode>, x0: number, y0: number, x1: number, y1: number) => {
//       d3.treemapBinary(node, 0, 0, this.width, this.height);
//       for (const child of node.children || []) {
//         child.x0 = x0 + (child.x0 / this.width) * (x1 - x0);
//         child.x1 = x0 + (child.x1 / this.width) * (x1 - x0);
//         child.y0 = y0 + (child.y0 / this.height) * (y1 - y0);
//         child.y1 = y0 + (child.y1 / this.height) * (y1 - y0);
//       }
//     };

//     //hierarşi oluşturulur
//     const hierarchy = d3.hierarchy(treemapData)
//       .sum(d => d.value ?? 0)
//       .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

//     //treemap i uyguluyor
//     const root = d3.treemap<TreeNode>()
//       .tile(tile)(hierarchy) as TreemapNode;
//     this.group = this.svg.append("g");
//     this.render(this.group, root);
//   }

//   private getNodeColor(d: TreemapNode): string {
//     if (d.parent === null) return 'var(--root-color, #f1faee)';
//     if (d.children) return 'var(--parent-color, #a8dadc)';
//     return 'var(--leaf-color, #457b9d)';
//   }

//   private getName(d: TreemapNode): string {
//     return d.ancestors().reverse().map(d => d.data.name).join("/");
//   }

//   //Veriyi SVG içinde düğümler ve dikdörtgenler olarak çizer.Düğümler: rect ve text elemanlarından oluşur.
//   private render(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
//     const node = group
//       .selectAll<SVGGElement, TreemapNode>("g")
//       .data(root.children ? root.children.concat(root) : [root])
//       .join("g");

//     node.filter((d) => (d === root ? !!d.parent : !!d.children)) // undefined'ı boolean'a çeviriyoruz
//       .attr("cursor", "pointer")
//       .on("click", (event, d) => d === root ? this.zoomout(root) : this.zoomin(d));

//     node.append("title")
//       .text(d => `${this.getName(d)}\n${this.format(d.value || 0)}`);

//     node.append("rect")
//       .attr("id", d => {
//         d.leafUid = { id: `leaf-${Math.random().toString(36).substr(2, 9)}`, href: `#leaf-${Math.random().toString(36).substr(2, 9)}` };
//         return d.leafUid.id;
//       })
//       .attr("fill", d => this.getNodeColor(d))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 1);

//     node.append("clipPath")
//       .attr("id", d => {
//         d.clipUid = { id: `clip-${Math.random().toString(36).substr(2, 9)}`, href: `#clip-${Math.random().toString(36).substr(2, 9)}` };
//         return d.clipUid.id;
//       })
//       .append("use")
//       .attr("xlink:href", d => d.leafUid?.href || '');


//     // let targetDepth = 2; // Hedeflenen seviyeyi burada ayarlayabilirsiniz
//     // node.append("text")
//     //   .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2) // Ortalayarak hizalama
//     //   .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 20) // İkonun altına pozisyonlama
//     //   .attr("text-anchor", "middle") // Ortalamak için
//     //   .attr("font-size", 12)
//     //   .attr("fill", "#333")
//     //   .text(d => d.data.name && d.data.name !== "root" ? d.data.name : ""); // "root" yazısını kaldırıyoruz

// //açıklama ekleme

//     // node.append("use")
//     //   .attr("xlink:href", d => d.data.icon && (!d.children || d === root) ? `#${d.data.icon}` : null) // Sadece kök veya yaprak düğümler için ikon ekle
//     //   .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2 - 8) // Merkezi hizalamak için
//     //   .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 - 8)
//     //   .attr("width", 32)
//     //   .attr("height", 32)
//     //   .attr("fill", "#333")
//     //   .attr("cursor", d => d.data.link ? "pointer" : "default") // Sadece link varsa cursor değiştir
//     //   .attr("style", "background-color: white; padding: 20px;")
//     //   .on("click", (event, d) => {
//     //     if (d.data.link) window.open(d.data.link, "_blank"); // Link varsa yönlendir
//     //   });

//     // node.append("text")
//     //   .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2) // Ortalayarak hizalama
//     //   .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 20) // Icon'un altına pozisyonlama
//     //   .attr("text-anchor", "middle") // Ortalamak için
//     //   .attr("font-size", 12)
//     //   .attr("fill", "#333")
//     //   .text(d => d.data.name || "Unnamed File"); // Dosya adı

//     // node.append("text")
//     //   .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2)
//     //   .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 35)
//     //   .attr("text-anchor", "middle")
//     //   .attr("font-size", 10)
//     //   .attr("fill", "#666")
//     //   .text(d => d.data.desc || "No description available"); // Açıklama

//     const text = node.append("text")
//       .attr("clip-path", d => d.clipUid ? `url(${d.clipUid.href})` : null)
//       .attr("class", "node-text")
//       .attr("font-weight", d => d === root ? "bold" : null);

//     text.selectAll("tspan")
//       .data(d => {
//         const name = d === root ? this.getName(d) : d.data.name;
//         return name.split(/(?=[A-Z][^A-Z])/g).concat(this.format(d.value || 0));
//       })
//       .join("tspan")
//       .attr("x", 3)
//       .attr("y", (d, i, nodes) => `${(i === nodes.length - 1 ? 0.3 : 0) + 1.1 + i * 0.9}em`)
//       .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
//       .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
//       .text(d => d);

//     this.position(group, root);
//   }
//   //Düğümleri x ve y koordinatlarına göre pozisyonlar.
//   private position(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
//     group.selectAll("g")
//       .attr("transform", d => {
//         const node = d as TreemapNode;
//         return node === root ?
//           `translate(0,-30)` :
//           `translate(${this.x(node.x0)},${this.y(node.y0)})`;
//       })
//       .select("rect")
//       .attr("width", d => {
//         const node = d as TreemapNode;
//         return node === root ?
//           this.width :
//           this.x(node.x1) - this.x(node.x0);
//       })
//       .attr("height", d => {
//         const node = d as TreemapNode;
//         return node === root ?
//           30 :
//           this.y(node.y1) - this.y(node.y0);
//       });
//   }

//   //Yakınlaştırma
//   private zoomin(d: TreemapNode): void {
//     const group0 = this.group.attr("pointer-events", "none");
//     const group1 = this.group = this.svg.append("g").call(g => this.render(g, d));

//     this.x.domain([d.x0, d.x1]);
//     this.y.domain([d.y0, d.y1]);

//     this.svg.transition()
//       .duration(750)
//       .call(t => group0.transition(t as any).remove()
//         .call(g => this.position(g.selection(), d.parent as TreemapNode)))
//       .call(t => group1.transition(t as any)
//         //.attrTween("opacity", () => d3.interpolate(0, 1))
//         .call(g => this.position(g.selection(), d)));
//   }

//   //Uzaklaştırma:
//   private zoomout(d: TreemapNode): void {
//     if (!d.parent) return;

//     const group0 = this.group.attr("pointer-events", "none");
//     const group1 = this.group = this.svg.insert("g", "*")
//       .call(g => this.render(g, d.parent as TreemapNode));

//     this.x.domain([d.parent.x0, d.parent.x1]);
//     this.y.domain([d.parent.y0, d.parent.y1]);

//     this.svg.transition()
//       .duration(750)
//       .call(t => group0.transition(t as any).remove()
//         //.attrTween("opacity", () => d3.interpolate(1, 0))
//         .call(g => this.position(g.selection(), d)))
//       .call(t => group1.transition(t as any)
//         .call(g => this.position(g.selection(), d.parent as TreemapNode)));
//   }
// }


//son verilen data için kullandığım kod
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { TreeNode, treemapData } from './exmp';

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
   
    .parent .node-text {
      fill: #000000;
    }
    .node {
      stroke: #fff;
      stroke-width: 1px;
    }
    .node-bundle { fill: #2c3e50; }
    .node-x-acs-subnet { fill: #3498db; }
    .node-x-acs-device { fill: #e74c3c; }
    .node-user-account { fill: #27ae60; }
    .node-process { fill: #f39c12; }
    .node-directory { fill: #8e44ad; }
    .node-file { fill: #16a085; }
    .node-text {
      font-family: Arial, sans-serif;
      fill: white;
}
  `]
})
export class TreemapComponent implements OnInit {
  @ViewChild('treemap', { static: true }) treemapRef!: ElementRef<SVGElement>;

  private readonly width = 928;
  private readonly height = 924;
  private svg!: d3.Selection<SVGElement, unknown, null, undefined>;
  private group!: d3.Selection<SVGGElement, unknown, null, undefined>;
  private x!: d3.ScaleLinear<number, number>;
  private y!: d3.ScaleLinear<number, number>;
  private format = d3.format(",d");
  private tooltip!: d3.Selection<HTMLDivElement, unknown, null, undefined>;

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

    const hierarchy = d3.hierarchy(treemapData)
      .sum(d => 1); // Her düğümün varsayılan değeri 1, value attribute u datada olmadan hiyerarşiyi bu şekilde oluşturuyorum 

    //treemap i uyguluyor
    const root = d3.treemap<TreeNode>()
      .tile(tile)(hierarchy) as TreemapNode;

    this.group = this.svg.append("g");
    this.render(this.group, root);
  }

  private getNodeColor(d: TreemapNode): string {
    //rootun rengini burdan verdim
    if (d.parent === null) return 'var(--root-color, #d0e0ea)';
    if (d.children) return 'var(--parent-color, #b4cede)';
    return 'var(--leaf-color, #99bcd2)';
  }

  private getName(d: TreemapNode): string {
    return d.ancestors().reverse().map(d => d.data.name).join("/");
  }

  private render(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
    const node = group
      .selectAll<SVGGElement, TreemapNode>("g")
      .data(root.children ? root.children.concat(root) : [root])
      .join("g");

    node.filter(d => (d === root ? !!d.parent : !!d.children))
      .attr("cursor", "pointer")
      .on("click", (event, d) => d === root ? this.zoomout(d) : this.zoomin(d));

    node.append("title")
      .text(d => `${this.getName(d)}\n${this.format(d.value || 0)}`);

    //dörtgenlerin rengini burdan veriyoruz
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
    //şuan link yok, ondan kaldırdım
    //.append("use")
    //.attr("xlink:href", d => d.leafUid?.href || '');

    const text = node.append("text")
      .attr("clip-path", d => d.clipUid ? `url(${d.clipUid.href})` : null)
      .attr("class", "node-text")
      .style("fill", "#000000")

    //açıklama yapılacak olan yer
    // node.append("text")
    //   .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2)
    //   .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 35)
    //   .attr("text-anchor", "middle")
    //   .attr("font-size", 10)
    //   .attr("fill", "#666")
    //   .text(d => d.data.type || "No description available"); 

    text.append("tspan")
      .attr("x", 3)
      .attr("y", "1.1em")
      .text(d => d.data.name || d.data.name2 || "");

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

  private zoomin(d: TreemapNode): void {
    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.append("g").call(g => this.render(g, d));

    this.x.domain([d.x0, d.x1]);
    this.y.domain([d.y0, d.y1]);

    // Geçiş animasyonu
    const transition = this.svg.transition()
      .duration(750)
      .ease(d3.easeCubicInOut); // Daha yumuşak bir geçiş için easing fonksiyonu

    // İlk grup için geçiş (opacity azaltılır ve pozisyon güncellenir)
    group0
      .transition(transition as any)
      .style("opacity", 0)
      .call(g => this.position(g.selection(), d.parent as TreemapNode))
      .remove(); // Eski grup silinir

    // Yeni grup için geçiş (opacity artırılır ve pozisyon güncellenir)
    group1
      .style("opacity", 0)
      .transition(transition as any)
      .style("opacity", 1)
      .call(g => this.position(g.selection(), d));
  }
  private zoomout(d: TreemapNode): void {
    if (!d.parent) return;

    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.insert("g", "*")
      .call(g => this.render(g, d.parent as TreemapNode));

    this.x.domain([d.parent.x0, d.parent.x1]);
    this.y.domain([d.parent.y0, d.parent.y1]);

    // Geçiş animasyonu
    const transition = d3.transition("zoomOutTransition") // Geçişin adını tanımlıyoruz
      .duration(750)
      .ease(d3.easeCubicInOut); // Daha yumuşak bir geçiş için easing fonksiyonu

    // İlk grup için geçiş (opacity azaltılır ve pozisyon güncellenir)
    group0
      .transition(transition as any) // TypeScript'teki tür uyumsuzluğunu aşmak için `as any` kullanıyoruz
      .style("opacity", 0)
      .call(g => this.position(g.selection(), d))
      .remove(); // Eski grup silinir

    // Yeni grup için geçiş (opacity artırılır ve pozisyon güncellenir)
    group1
      .style("opacity", 0)
      .transition(transition as any)
      .style("opacity", 1)
      .call(g => this.position(g.selection(), d.parent as TreemapNode));
}
}
























// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import * as d3 from 'd3';
// import { treemapData, TreeNode } from './exmp';


// interface TreemapNode extends d3.HierarchyRectangularNode<TreeNode> {
//   leafUid?: { id: string; href: string };
//   clipUid?: { id: string; href: string };
// }

// @Component({
//   selector: 'app-treemap',
//   template: '<svg #treemap></svg>',
//   styles: [`
//     :host {
//       display: block;
//       width: 100%;
//       height: 100%;
//     }
//     svg {
//       max-width: 100%;
//       height: auto;
//       font: 10px sans-serif;
//     }
//     .node-text {
//       font-family: Arial, sans-serif;
//       fill: #333;
//     }
//     .parent-node {
//       fill: #a8dadc;
//     }
//     .leaf-node {
//       fill: #457b9d;
//     }
//     .root-node {
//       fill: #f1faee;
//     }
//   `]
// })

// export class TreemapComponent implements OnInit {
//   @ViewChild('treemap', { static: true }) treemapRef!: ElementRef<SVGElement>;

//   private readonly width = 928;
//   private readonly height = 924;
//   private svg!: d3.Selection<SVGElement, unknown, null, undefined>;
//   private group!: d3.Selection<SVGGElement, unknown, null, undefined>;
//   private x!: d3.ScaleLinear<number, number>;
//   private y!: d3.ScaleLinear<number, number>;
//   private format = d3.format(",d");

//   ngOnInit(): void {
//     this.initializeTreemap();
//   }

//   private initializeTreemap(): void {
//     this.x = d3.scaleLinear().rangeRound([0, this.width]);
//     this.y = d3.scaleLinear().rangeRound([0, this.height]);

//     this.svg = d3.select(this.treemapRef.nativeElement)
//       .attr("viewBox", [0.5, -30.5, this.width, this.height + 30])
//       .attr("width", this.width)
//       .attr("height", this.height + 30)
//       .attr("style", "max-width: 100%; height: auto;");

//     this.svg.append("defs").html(`
//         <symbol id="icon-link" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M10 17l-5-5 5-5v3h4V7l5 5-5 5v-3h-4v3z"/>
//         </symbol>
//         <symbol id="icon-info" viewBox="0 0 24 24" fill="currentColor">
//           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-10h2v6h-2zm0-4h2v2h-2z"/>
//         </symbol>
//       `);

//     const tile = (node: d3.HierarchyRectangularNode<TreeNode>, x0: number, y0: number, x1: number, y1: number) => {
//       d3.treemapBinary(node, 0, 0, this.width, this.height);
//       for (const child of node.children || []) {
//         child.x0 = x0 + (child.x0 / this.width) * (x1 - x0);
//         child.x1 = x0 + (child.x1 / this.width) * (x1 - x0);
//         child.y0 = y0 + (child.y0 / this.height) * (y1 - y0);
//         child.y1 = y0 + (child.y1 / this.height) * (y1 - y0);
//       }
//     };

//     const hierarchy = d3.hierarchy(treemapData)
//       .sum(d => d.value ?? 0)
//       .sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

//     const root = d3.treemap<TreeNode>()
//       .tile(tile)(hierarchy) as TreemapNode;
//     this.group = this.svg.append("g");
//     this.render(this.group, root);
//   }

//   private getNodeColor(d: TreemapNode): string {
//     if (d.parent === null) return 'var(--root-color, #f1faee)';
//     if (d.children) return 'var(--parent-color, #a8dadc)';
//     return 'var(--leaf-color, #457b9d)';
//   }

//   private getName(d: TreemapNode): string {
//     return d.ancestors().reverse().map(d => d.data.name).join("/");
//   }

//   private render(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
//     const node = group
//       .selectAll<SVGGElement, TreemapNode>("g")
//       .data(root.children ? root.children.concat(root) : [root])
//       .join("g");

//     node.filter((d) => (d === root ? !!d.parent : !!d.children))
//       .attr("cursor", "pointer")
//       .on("click", (event, d) => d === root ? this.zoomout(root) : this.zoomin(d));

//     node.append("title")
//       .text(d => `${this.getName(d)}\n${this.format(d.value || 0)}`);

//     node.append("rect")
//       .attr("id", d => {
//         d.leafUid = { id: `leaf-${Math.random().toString(36).substr(2, 9)}`, href: `#leaf-${Math.random().toString(36).substr(2, 9)}` };
//         return d.leafUid.id;
//       })
//       .attr("fill", d => this.getNodeColor(d))
//       .attr("stroke", "#fff")
//       .attr("stroke-width", 1);

//     node.append("clipPath")
//       .attr("id", d => {
//         d.clipUid = { id: `clip-${Math.random().toString(36).substr(2, 9)}`, href: `#clip-${Math.random().toString(36).substr(2, 9)}` };
//         return d.clipUid.id;
//       })
//       .append("use")
//       .attr("xlink:href", d => d.leafUid?.href || '');

//     const text = node.append("text")
//       .attr("clip-path", d => d.clipUid ? `url(${d.clipUid.href})` : null)
//       .attr("class", "node-text")
//       .attr("font-weight", d => d === root ? "bold" : null);

//     text.selectAll("tspan")
//       .data(d => {
//         const name = d === root ? this.getName(d) : d.data.type;
//         return name.split(/(?=[A-Z][^A-Z])/g).concat(this.format(d.value || 0));
//       })
//       .join("tspan")
//       .attr("x", 3)
//       .attr("y", (d, i, nodes) => `${(i === nodes.length - 1 ? 0.3 : 0) + 1.1 + i * 0.9}em`)
//       .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
//       .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
//       .text(d => d);

//     this.position(group, root);
//   }

//   private position(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
//     group.selectAll("g")
//       .attr("transform", (d) => `translate(${d.x0},${d.y0})`)
//       .select("rect")
//       .attr("width", d => d.x1 - d.x0)
//       .attr("height", d => d.y1 - d.y0);
//   }

//   private zoomin(d: TreemapNode): void {
//     const transition = this.svg.transition().duration(750);
//     this.x.domain([d.x0, d.x1]);
//     this.y.domain([d.y0, d.y1]);

//     this.render(this.group, d);
//     this.position(this.group, d);

//     transition.selectAll("rect")
//       .attr("x", (d) => this.x(d.x0))
//       .attr("y", (d) => this.y(d.y0))
//       .attr("width", (d) => this.x(d.x1) - this.x(d.x0))
//       .attr("height", (d) => this.y(d.y1) - this.y(d.y0));

//     transition.selectAll("text")
//       .attr("x", (d) => this.x(d.x0) + 3)
//       .attr("y", (d) => this.y(d.y0) + 13);
//   }

//   private zoomout(root: TreemapNode): void {
//     const transition = this.svg.transition().duration(750);
//     this.x.domain([0, this.width]);
//     this.y.domain([0, this.height]);

//     this.render(this.group, root);
//     this.position(this.group, root);

//     transition.selectAll("rect")
//       .attr("x", (d) => this.x(d.x0))
//       .attr("y", (d) => this.y(d.y0))
//       .attr("width", (d) => this.x(d.x1) - this.x(d.x0))
//       .attr("height", (d) => this.y(d.y1) - this.y(d.y0));

//     transition.selectAll("text")
//       .attr("x", (d) => this.x(d.x0) + 3)
//       .attr("y", (d) => this.y(d.y0) + 13);
//   }
// }
