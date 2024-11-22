
// export interface TreeNode {
//   id: string; // Node'un benzersiz kimliği
//   type: string; // Node türü (bundle, x-acs-subnet, user-account vb.)
//   children?: TreeNode[]; // Alt düğümler
//   name?: string; // Düğüm ismi (örneğin, "root", "employee", vb.)
//   user_id?: string; // Kullanıcı ID'si (örneğin, "0", "1000")
//   account_login?: string; // Hesap girişi (örneğin, "root", "employee")
//   display_name?: string; // Görüntülenen isim (örneğin, "root", "employee")
//   is_privileged?: boolean; // Yetkilendirilmiş kullanıcı (true/false)
//   pid?: number; // Süreç ID'si (process için)
//   cwd?: string; // Geçerli çalışma dizini (process için)
//   command_line?: string; // Komut satırı (process için)
//   path?: string; // Dosya veya dizin yolu (directory veya file için)
// }
// export const treemapData: TreeNode = {
 
//   id: "bundle--16ab2337-7f5e-44e0-8da4-899865af67a4",
//   type: "bundle",
//   children: [
//     {
//       id: "x-acs-subnet--b02d68a5-12ab-4e53-b57f-7b02700aad24",
//       type: "x-acs-subnet",
//       children: [
//         {
//           id: "x-acs-device--d1ae3fd1-704c-5b3f-aaf2-c0e10755b09a",
//           type: "x-acs-device",
//           children: [
//             {
//               id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
//               type: "user-account",
//               children: [],
//               user_id: "0",
//               account_login: "root",
//               display_name: "root",
//               is_privileged: true
//             },
//             {
//               id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
//               type: "user-account",
//               children: [],
//               user_id: "1000",
//               account_login: "employee",
//               display_name: "employee"
//             },
//             {
//               id: "process--6c688576-4b95-4d7f-9971-f1441755bc55",
//               type: "process",
//               children: [],
//               name: "main-static",
//               pid: 1,
//               cwd: "/home/employee",
//               command_line: "main-static"
//             },
//             {
//               id: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b",
//               type: "process",
//               children: [],
//               name: "sshd",
//               pid: 2,
//               command_line: "sshd"
//             },
//             {
//               id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",
//               type: "directory",
//               children: [],
//               path: "/etc"
//             },
//             {
//               id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",
//               type: "directory",
//               children: [
//                 {
//                   id: "file--c8349ee8-2524-58ed-b8e5-14db73856575",
//                   type: "file",
//                   children: [
//                     {
//                       id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
//                       type: "user-account",
//                       children: [],
//                       user_id: "0",
//                       account_login: "root",
//                       display_name: "root",
//                       is_privileged: true
//                     },
//                     {
//                       id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
//                       type: "user-account",
//                       children: [],
//                       user_id: "1000",
//                       account_login: "employee",
//                       display_name: "employee"
//                     }
//                   ],
//                   name: "passwd",
//                   path: "/etc/passwd"
//                 },
//                 {
//                   id: "file--baa72a2e-85f6-5abc-98f8-54b9617e5e43",
//                   type: "file",
//                   children: [
//                     {
//                       id: "x-acs-credential--75002b61-cf33-56a6-b697-8171cc3282ac",
//                       type: "x-acs-credential",
//                       children: []
//                     },
//                     {
//                       id: "x-acs-credential--5c59f6bc-989f-59e9-8445-b173a7034cdc",
//                       type: "x-acs-credential",
//                       children: []
//                     }
//                   ],
//                   name: "shadow",
//                   path: "/etc/shadow"
//                 }
//               ],
//               path: "/etc"
//             },
//             {
//               id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",
//               type: "directory",
//               children: [],
//               path: "/bin"
//             },
//             {
//               id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",
//               type: "directory",
//               children: [
//                 {
//                   id: "file--6389832b-fd61-5041-a76f-7bc932de546d",
//                   type: "file",
//                   children: [],
//                   name: "ash",
//                   path: "/bin/ash"
//                 },
//                 {
//                   id: "file--343bd74d-c703-5dd9-8200-1b741542af58",
//                   type: "file",
//                   children: [],
//                   name: "find",
//                   path: "/bin/find"
//                 },
//                 {
//                   id: "file--e9519962-109d-5bd8-bec5-64012b2c31df",
//                   type: "file",
//                   children: [],
//                   name: "micro",
//                   path: "/bin/micro"
//                 },
//                 {
//                   id: "file--da43ff8a-6c9f-5126-91fc-4f1086fcc079",
//                   type: "file",
//                   children: [],
//                   name: "su",
//                   path: "/bin/su"
//                 },
//                 {
//                   id: "file--19733450-09a3-5672-ae39-dc8f727dee21",
//                   type: "file",
//                   children: [],
//                   name: "sshd",
//                   path: "/bin/sshd"
//                 },
//                 {
//                   id: "file--89060d39-4f09-569e-8c15-8f41b48b81ac",
//                   type: "file",
//                   children: [],
//                   name: "sh",
//                   path: "sh"
//                 },
//                 {
//                   id: "file--47381d90-ce1e-5df4-b450-3423098258eb",
//                   type: "file",
//                   children: [],
//                   name: "cp",
//                   path: "/bin/cp"
//                 },
//                 {
//                   id: "file--f9d55f66-078d-5322-aba7-ad05409ec874",
//                   type: "file",
//                   children: [],
//                   name: "sudo",
//                   path: "/bin/sudo"
//                 }
//               ],
//               path: "/bin"
//             },
//             {
//               id: "directory--ff245550-2193-55c2-a6f2-da711d07926a",
//               type: "directory",
//               children: [],
//               path: "/home/employee"
//             },
//             {
//               id: "directory--ff245550-2193-55c2-a6f2-da711d07926a",
//               type: "directory",
//               children: [
//                 {
//                   id: "directory--661bdc12-34de-5967-9126-5e5740a12ddf",
//                   type: "directory",
//                   children: [
//                     {
//                       id: "file--f5db77b5-d705-5a02-a094-7e6c11ebf0f5",
//                       type: "file",
//                       children: [
//                         {
//                           id: "x-acs-credential--7c07e98e-cd07-5d27-af6d-09828146f01b",
//                           type: "x-acs-credential",
//                           children: []
//                         }
//                       ],
//                       name: "authorized_keys",
//                       path: "/home/employee/.ssh/authorized_keys"
//                     }
//                   ],
//                   path: "/home/employee/.ssh"
//                 },
//                 {
//                   id: "file--e53ff81f-e264-5785-8b8c-09c4d0dcd5e4",
//                   type: "file",
//                   children: [
//                     {
//                       id: "x-acs-credential--85f22f40-b199-400a-b7dc-d433736b55ea",
//                       type: "x-acs-credential",
//                       children: []
//                     }
//                   ],
//                   name: ".ash_history",
//                   path: "/home/employee/.ash_history"
//                 },
//                 {
//                   id: "file--ea579643-1874-5fa2-b2ae-c2aa9651c6ba",
//                   type: "file",
//                   children: [],
//                   name: "main-static",
//                   path: "/home/employee/main-static"
//                 }
//               ],
//               path: "/home/employee"
//             },
//             {
//               id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",
//               type: "directory",
//               children: [],
//               path: "/root"
//             },
//             {
//               id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",
//               type: "directory",
//               children: [
//                 {
//                   id: "file--d7285d04-ca01-5364-923d-6063ea988841",
//                   type: "file",
//                   children: [],
//                   name: "flag.txt",
//                   path: "/root/flag.txt"
//                 }
//               ],
//               path: "/root"
//             }
//           ]
//         }
//       ]
//     }
//   ]
// }

//eski interface
export interface TreeNode {
  name: string;
  value?: number;
  icon?:string;
  link?:string;
  desc?:string;
  children?: TreeNode[];
}

export const treemapData: TreeNode = { 
 name: "root",
  children: [
    {
      name: "x-acs-subnet",
      icon: "icon-link", // İkonun tanımlayıcısı
      link: "https://example.com/node1", // Bağlantı URL'si
      desc: "This is a subnet node",
      children: [
        {
          name: "x-acs-device",
          icon: "icon-info",
          link: "https://example.com/node2",
          desc: "This is a device node",
          children: [
            {
              name: "process",
              icon: "icon-info",
              link: "https://example.com/node3",
              desc: "Process details",
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
}



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
 
