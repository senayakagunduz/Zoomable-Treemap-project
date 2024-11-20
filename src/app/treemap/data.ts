export interface TreeNode {
  name: string;
  value?: number;
  children?: TreeNode[];
}
export const treemapData: TreeNode = {
  name: "root",
  children: [
    {
      name: "x-acs-subnet",
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
              children: [
                { name: "user-account--3a26f287-6634-5ed3-84a6-4aa0aee917ad", value: 1 },
                { name: "user-account--48fc48ef-fd2e-5efe-8a47-33cd897bba24", value: 1 }
              ]
            },
            {
              name: "directory",
              children: [
                {
                  name: "directory--8e8eb595-edf0-52de-a464-f5ddb4629416",
                  children: [
                    { name: "$file--file-1", value: 1 },
                    { name: "$file--file-2", value: 1 }
                  ]
                },
                {
                  name: "directory--6cc401f6-0d91-50ed-b3c1-61aad0a56ebd",
                  children: [
                    { name: "$file--file-3", value: 1 },
                    { name: "$file--file-4", value: 1 }
                  ]
                }
              ]
            },
            { name: "ipv4-addr", value: 1 },
            { name: "network-traffic", value: 1 }
          ]
        },
        { name: "x-acs-service", value: 1 },
        { name: "ipv4-addr", value: 1 },
        { name: "network-traffic", value: 1 }
      ]
    },
    {
      name: "file",
      children: [
        {
          name: "file--7ec6c7fa-11a1-5014-9e4f-1dc809952f2c",
          children: [
            { name: "x-acs-unix-file-permission-ext", value: 2 },
            { name: "parent_directory_ref", value: 2 },
            {
              name: "contains_refs",
              children: [
                { name: "user-account--3a26f287-6634-5ed3-84a6-4aa0aee917ad", value: 1 },
                { name: "user-account--48fc48ef-fd2e-5efe-8a47-33cd897bba24", value: 1 }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "threat-actor",
      children: [
        {
          name: "threat-actor--604708e5-e806-4d35-adb1-7f0ee6e07812",
          children: [
            { name: "name", value: 3 },
            { name: "threat_actor_types", value:3 },
            { name: "roles", value: 2 },
            { name: "sophistication", value: 1 },
            { name: "primary_motivation", value: 3 },
            { name: "secondary_motivations", value: 6 }
          ]
        }
      ]
    },
    {
      name: "ipv4-addr",
      children: [
        {
          name: "ipv4-addr--78d21449-607f-56bd-a955-677ed5443f55",
          value: 1
        }
      ]
    },
    {
      name: "x-acs-procedure",
      children: [
        {
          name: "x-acs-procedure--a6662e85-5958-4f5a-a885-677d8dd0d321",
          children: [
            { name: "name", value: 2 },
            {
              name: "requires",
              value:5
            }
          ]
        }
      ]
    },
    {
      name: "directory",
      children: [
        {
          name: "directory--48ace355-bbd2-53fb-a763-556649e9cca8",
          children: [
            { name: "path", value: 3 },
            {
              name: "extensions",
              children: [
                { name: "owner", value: 3 },
                { name: "group", value: 1 },
                { name: "permission", value: 7 }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "process",
      children: [
        {
          name: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b",
          children: [
            { name: "name", value: 4 },
            { name: "pid", value: 2 },
            { name: "command_line", value: 5 }
          ]
        }
      ]
    }
  ]
};





//  export const treemapData: TreeNode = {
//    name: "root",
//    value:100,
//     children: [
//       {
//         name: "x-acs-subnet",
//         value:100,
//         children: [
//           {
//             name: "x-acs-device",
//             children: [
//               {
//                 name: "process",
//                 children: [
//                   { name: "process--6c688576-4b95-4d7f-9971-f1441755bc55", value: 1 },
//                   { name: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b", value: 1 }
//                 ]
//               },
//               {
//                 name: "user-account",
                
//                 children: [
//                   { name: "user-account--3a26f287-6634-5ed3-84a6-4aa0aee917ad", value: 1 },
//                   { name: "user-account--48fc48ef-fd2e-5efe-8a47-33cd897bba24", value: 1 }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   //  name: "Process",
//   // children: [
//   //   {
//   //     name: "Design",
//   //     children: [
//   //       {
//   //         name: "CGI",
//   //         children: [
//   //           { name: "Photo 1", value: "cgi-1.jpg" },
//   //           { name: "Photo 2", value: "cgi-2.jpg" },
//   //           { name: "Photo 3", value: "cgi-3.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Photography",
//   //         children: [
//   //           { name: "Photo 1", value: "photo-1.jpg" },
//   //           { name: "Photo 2", value: "photo-2.jpg" },
//   //           { name: "Photo 3", value: "photo-3.jpg" },
//   //           { name: "Photo 4", value: "photo-4.jpg" },
//   //           { name: "Photo 5", value: "photo-5.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "EPCs",
//   //         children: [
//   //           { name: "Photo 1", value: "epc-1.jpg" },
//   //           { name: "Photo 2", value: "epc-2.jpg" },
//   //           { name: "Photo 3", value: "epc-3.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Floor Plans",
//   //         children: [
//   //           { name: "Photo 1", value: "floorplan-1.jpg" },
//   //           { name: "Photo 3", value: "floorplan-2.jpg" }
//   //         ]
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     name: "Print",
//   //     children: [
//   //       {
//   //         name: "Litho",
//   //         children: [
//   //           { name: "Photo 1", value: "litho-1.jpg" },
//   //           { name: "Photo 2", value: "litho-2.jpg" },
//   //           { name: "Photo 3", value: "litho-3.jpg" },
//   //           { name: "Photo 4", value: "litho-4.jpg" },
//   //           { name: "Photo 5", value: "litho-5.jpg" },
//   //           { name: "Photo 6", value: "litho-6.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Digital",
//   //         children: [
//   //           { name: "Photo 1", value: "digital-1.jpg" },
//   //           { name: "Photo 2", value: "digital-2.jpg" },
//   //           { name: "Photo 3", value: "digital-3.jpg" },
//   //           { name: "Photo 4", value: "digital-4.jpg" }
//   //         ]
//   //       }
//   //     ]
//   //   },
//   //   {
//   //     name: "Finish",
//   //     children: [
//   //       {
//   //         name: "Folding",
//   //         children: [
//   //           { name: "Photo 1", value: "folding-1.jpg" },
//   //           { name: "Photo 2", value: "folding-2.jpg" },
//   //           { name: "Photo 3", value: "folding-3.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Stitched",
//   //         children: [
//   //           { name: "Photo 1", value: "stitched-1.jpg" },
//   //           { name: "Photo 2", value: "stitched-2.jpg" },
//   //           { name: "Photo 3", value: "stitched-3.jpg" },
//   //           { name: "Photo 4", value: "stitched-4.jpg" },
//   //           { name: "Photo 5", value: "stitched-5.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Sewn",
//   //         children: [
//   //           { name: "Photo 1", value: "sewn-1.jpg" },
//   //           { name: "Photo 2", value: "sewn-2.jpg" },
//   //           { name: "Photo 3", value: "sewn-3.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Softback",
//   //         children: [
//   //           { name: "Photo 1", value: "softback-1.jpg" },
//   //           { name: "Photo 3", value: "softback-2.jpg" }
//   //         ]
//   //       },
//   //       {
//   //         name: "Hardback",
//   //         children: [
//   //           { name: "Photo 1", value: "hardback-1.jpg" },
//   //           { name: "Photo 2", value: "hardback-2.jpg" },
//   //           { name: "Photo 3", value: "hardback-3.jpg" },
//   //           { name: "Photo 4", value: "hardback-4.jpg" }
//   //         ]
//   //       }
//   //     ]
//   //   }
//   // ]
    
//   }
 
