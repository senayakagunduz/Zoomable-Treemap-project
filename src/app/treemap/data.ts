export interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}
 export const treemapData: TreeNode = {
   name: "root",
   value:100,
    children: [
      {
        name: "x-acs-subnet",
        value:100,
        children: [
          {
            name: "x-acs-device",
            children: [
              {
                name: "process",
                children: [
                  { name: "process--6c688576-4b95-4d7f-9971-f1441755bc55", value: 1 },
                  { name: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b", value: 1 }
                ]
              },
              {
                name: "user-account",
                value:100,
                children: [
                  { name: "user-account--3a26f287-6634-5ed3-84a6-4aa0aee917ad", value: 1 },
                  { name: "user-account--48fc48ef-fd2e-5efe-8a47-33cd897bba24", value: 1 }
                ]
              }
            ]
          }
        ]
      }
    ]
  //  name: "Process",
  // children: [
  //   {
  //     name: "Design",
  //     children: [
  //       {
  //         name: "CGI",
  //         children: [
  //           { name: "Photo 1", value: "cgi-1.jpg" },
  //           { name: "Photo 2", value: "cgi-2.jpg" },
  //           { name: "Photo 3", value: "cgi-3.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Photography",
  //         children: [
  //           { name: "Photo 1", value: "photo-1.jpg" },
  //           { name: "Photo 2", value: "photo-2.jpg" },
  //           { name: "Photo 3", value: "photo-3.jpg" },
  //           { name: "Photo 4", value: "photo-4.jpg" },
  //           { name: "Photo 5", value: "photo-5.jpg" }
  //         ]
  //       },
  //       {
  //         name: "EPCs",
  //         children: [
  //           { name: "Photo 1", value: "epc-1.jpg" },
  //           { name: "Photo 2", value: "epc-2.jpg" },
  //           { name: "Photo 3", value: "epc-3.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Floor Plans",
  //         children: [
  //           { name: "Photo 1", value: "floorplan-1.jpg" },
  //           { name: "Photo 3", value: "floorplan-2.jpg" }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: "Print",
  //     children: [
  //       {
  //         name: "Litho",
  //         children: [
  //           { name: "Photo 1", value: "litho-1.jpg" },
  //           { name: "Photo 2", value: "litho-2.jpg" },
  //           { name: "Photo 3", value: "litho-3.jpg" },
  //           { name: "Photo 4", value: "litho-4.jpg" },
  //           { name: "Photo 5", value: "litho-5.jpg" },
  //           { name: "Photo 6", value: "litho-6.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Digital",
  //         children: [
  //           { name: "Photo 1", value: "digital-1.jpg" },
  //           { name: "Photo 2", value: "digital-2.jpg" },
  //           { name: "Photo 3", value: "digital-3.jpg" },
  //           { name: "Photo 4", value: "digital-4.jpg" }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: "Finish",
  //     children: [
  //       {
  //         name: "Folding",
  //         children: [
  //           { name: "Photo 1", value: "folding-1.jpg" },
  //           { name: "Photo 2", value: "folding-2.jpg" },
  //           { name: "Photo 3", value: "folding-3.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Stitched",
  //         children: [
  //           { name: "Photo 1", value: "stitched-1.jpg" },
  //           { name: "Photo 2", value: "stitched-2.jpg" },
  //           { name: "Photo 3", value: "stitched-3.jpg" },
  //           { name: "Photo 4", value: "stitched-4.jpg" },
  //           { name: "Photo 5", value: "stitched-5.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Sewn",
  //         children: [
  //           { name: "Photo 1", value: "sewn-1.jpg" },
  //           { name: "Photo 2", value: "sewn-2.jpg" },
  //           { name: "Photo 3", value: "sewn-3.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Softback",
  //         children: [
  //           { name: "Photo 1", value: "softback-1.jpg" },
  //           { name: "Photo 3", value: "softback-2.jpg" }
  //         ]
  //       },
  //       {
  //         name: "Hardback",
  //         children: [
  //           { name: "Photo 1", value: "hardback-1.jpg" },
  //           { name: "Photo 2", value: "hardback-2.jpg" },
  //           { name: "Photo 3", value: "hardback-3.jpg" },
  //           { name: "Photo 4", value: "hardback-4.jpg" }
  //         ]
  //       }
  //     ]
  //   }
  // ]
    
  }
 
  //};