

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
      .attr("viewBox", [0.5, -30.5, this.width, this.height])
      .attr("width", this.width)
      .attr("height", this.height)
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
  //node ları görselleştiren rect leri boyar
  private getNodeColor(d: TreemapNode): string {
    //rootun rengini burdan verdim
    if (d.parent === null) return 'var(--root-color, #d0e0ea)';
    if (d.children) return 'var(--parent-color, #b4cede)';
    return 'var(--leaf-color, #C6DAE6)';
  }

  private getName(d: TreemapNode): string {
    return d.ancestors().reverse().map(d => d.data.name).join("/");
  }

  private getIconPath(type: string): string {
    const iconMap: { [key: string]: string } = {
      'bundle--16': '/assets/icons/software.svg',
      'x-acs-subnet': '/assets/icons/x-acs-subnet.svg',
      'x-acs-device': '/assets/icons/x-acs-device.svg',
      'user-account': '/assets/icons/user-account.svg',
      'process': '/assets/icons/process.svg',
      'directory': '/assets/icons/directory.svg',
      'file': '/assets/icons/file.svg',
      'x-acs-credential': '/assets/icons/x-acs-credential.svg',
    };

    return iconMap[type] || '/assets/icons/default-icon.svg'; // Varsayılan ikon
  }

  private render(group: d3.Selection<SVGGElement, unknown, null, undefined>, root: TreemapNode): void {
    //Bu kod parçası, node öğelerini oluştururken kök düğümün (root) diğer düğümlerin altına yerleştirilmesini sağlar.
    // Bu sayede, kök düğüm çocuklarının üzerine yerleşmez ve çocuk düğümler daha görünür olur. 
    // Kodun amacı, görselleştirme üzerinde çocuk düğümlerin her zaman görünür olmasını sağlamak, böylece kök düğüm sadece arka planda yer alır.
    const node = group
      .selectAll<SVGGElement, TreemapNode>("g")
      .data(root.children ? root.children.concat(root) : [root])
      .join("g")
    //Parent düğümleri her zaman en alta yerleştirin,Bu sayede parent düğüm, çocuk düğümlerin altında yer alır ve çocuk düğümler görünür olur.
    node.filter(d => d === root).lower();

    //node.filter(d => d === root).selectAll("image").remove(); // Parent iconları kaldır

    // Bu kod, belirli node öğelerine tıklanabilir (cursor: pointer) özelliği ekler.
    // Kullanıcı bu düğümlere tıkladığında, eğer tıklanan düğüm kök düğümse zoomout fonksiyonu, diğer tüm düğümler için ise zoomin fonksiyonu çağrılır.
    // Bu, genellikle bir grafik üzerinde yakınlaştırma/uzaklaştırma işlevi sağlamak için kullanılan bir yaklaşımdır.
    node.filter(d => (d === root ? !!d.parent : !!d.children))
      .attr("cursor", "pointer")
      .on("click", (event, d) => d === root ? this.zoomout(d) : this.zoomin(d));

    //Kullanıcı fareyi bir node üzerine getirdiğinde, o düğümle ilgili açıklayıcı bir metin gösterilir.
    node.append("title")
      .text(d => `${this.getName(d)}\n${this.format(d.value || 0)}`);

    //herbir node u dörtgen hale getiriyoruz, sonra da rengini ve sitillerini burdan veriyoruz
    node.append("rect")
      .attr("id", d => {
        d.leafUid = { id: `leaf-${Math.random().toString(36).substr(2, 9)}`, href: `#leaf-${Math.random().toString(36).substr(2, 9)}` };
        return d.leafUid.id;
      })
      .attr("fill", d => this.getNodeColor(d))
      .attr("stroke", "#fff")
      .attr("stroke-width", 10)
      .attr("rx", 15) // Köşeleri yuvarlatmak için
      .attr("ry", 15);

    //herbir iconun arkasında backgrounc color ile rect yaptık, sitillerini verdik
    node.append("rect")
      .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2 - 15) // 10px padding için genişlik artırıldı
      .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 - 15) // 10px padding için yükseklik artırıldı
      .attr("width", 40) // 20px icon + 2 * 10px padding
      .attr("height", 40)
      .attr("fill", "white")
      .attr("rx", 5) // Köşeleri yuvarlatmak için
      .attr("ry", 5)
      .attr("stroke", "gray") // Kenarlık rengi
      .attr("stroke-width", 2) // Kenarlık kalınlığı
      .attr("stroke-dasharray", "4,2"); // Kesik çizgi

    // Bu kod, her node için benzersiz bir clipPath öğesi ekler. Her clipPath öğesinin id ve href değerleri, rastgele oluşturulan benzersiz dizelerle atanır.
    node.append("clipPath")
      .attr("id", d => {
        d.clipUid = { id: `clip-${Math.random().toString(36).substr(2, 9)}`, href: `#clip-${Math.random().toString(36).substr(2, 9)}` };
        return d.clipUid.id;
      })

    // const text = node.append("text")
    //   .attr("clip-path", d => d.clipUid ? `url(${d.clipUid.href})` : null)
    //   .attr("class", "node-text")
    //   .style("fill", "#000000")


    //iconun altındaki type verisi
    node.append("text")
      .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2 + 5)
      .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 40)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#666")
      .text(d => d.data.type || "")

    //iconun altındaki name2 verisi
    node.append("text")
      .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2)
      .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 50)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#666")
      .text(d => d.data.name2 || "")

    // iconun altındaki path verisi
    node.append("text")
      .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2) // Sağ kenardan 5px içeride
      .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 + 60)
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("fill", "#666")
      .text(d => d.data?.path || "");

    //Ekranın sol üst köşesindeki dörtgenin name ini kaldırdım
    // text.append("tspan")
    //   .attr("x", 3)
    //   .attr("y", "1.1em")
    //   .text(d => d.data.name || d.data.name2 || "");

    this.position(group, root);

    const marginX = 5; // Soldan mesafe
    const marginY = 5; // Üstten mesafe

    node.append("image")
      .attr("x", d => (this.x(d.x1) - this.x(d.x0)) / 2 - 5)
      .attr("y", d => (this.y(d.y1) - this.y(d.y0)) / 2 - 5)
      .attr("width", 20)
      .attr("height", 20)
      .attr("href", d => this.getIconPath(d.data.type || ''))
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("display", d => {
        // Eğer mevcut düğüm açık olan seviyedeyse (root) veya onun direkt alt düğümüyse, ikonu göster
        // return d === root || (root.children && root.children.includes(d)) ? 'block' : 'none';
        // Show icons for current level and its immediate children
        const isCurrentLevel = d === root;
        const isChild = root.children && root.children.includes(d);
        const isParent = d.parent === root;
        return (isCurrentLevel || isChild || isParent) ? 'block' : 'none';
      });
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

    // Mevcut grup için pointer-events devre dışı bırakılır
    const group0 = this.group.attr("pointer-events", "none");

    // Yeni grup oluşturulur ve parent düğüm için render edilir
    const group1 = this.group = this.svg.insert("g", "*")
      .call(g => this.render(g, d.parent as TreemapNode));

    // Zoom-out için domain güncellenir
    this.x.domain([d.parent.x0, d.parent.x1]);
    this.y.domain([d.parent.y0, d.parent.y1]);

    // Geçiş animasyonu
    const transition = d3.transition("zoomOutTransition") // Geçişin adını tanımlıyoruz
      .duration(750)
      .ease(d3.easeCubicInOut); // Daha yumuşak bir geçiş için easing fonksiyonu

    // İlk grup için geçiş (opacity azaltılır ve pozisyon güncellenir)
    group0.selectAll<SVGImageElement, TreemapNode>("image")
      .style("display", d => {
        const node = d as TreemapNode;
        return node === d.parent || (d.parent && d.parent.children && d.parent.children.includes(node)) ? 'block' : 'none';
      });
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

    group1.selectAll<SVGImageElement, TreemapNode>("image")
      .style("display", (node: TreemapNode) => {
        return node === d.parent || (d.parent && d.parent.children && d.parent.children.includes(node)) ? 'block' : 'none';
      });
  }




}



