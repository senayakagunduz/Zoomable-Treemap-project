export interface TreeNode {
    id: string; // Node'un benzersiz kimliği
    type: string; // Node türü (bundle, x-acs-subnet, user-account vb.)
    children?: TreeNode[]; // Alt düğümler
    name?: string; // Düğüm ismi (örneğin, "root", "employee", vb.)
    name2?: string;
    user_id?: string; // Kullanıcı ID'si (örneğin, "0", "1000")
    account_login?: string; // Hesap girişi (örneğin, "root", "employee")
    display_name?: string; // Görüntülenen isim (örneğin, "root", "employee")
    is_privileged?: boolean; // Yetkilendirilmiş kullanıcı (true/false)
    pid?: number; // Süreç ID'si (process için)
    cwd?: string; // Geçerli çalışma dizini (process için)
    command_line?: string; // Komut satırı (process için)
    path?: string; // Dosya veya dizin yolu (directory veya file için)
    value?: number;
}

export const treemapData: TreeNode = {

    id: "bundle--16ab2337-7f5e-44e0-8da4-899865af67a4",
    type: "bundle--16",
    name: "bundle",
    children: [
        {
            id: "x-acs-subnet--b02d68a5-12ab-4e53-b57f-7b02700aad24",
            type: "x-acs-subnet",
            name: "x-acs-subnet--b02d68a5-12ab",
            children: [
                {
                    id: "x-acs-device--d1ae3fd1-704c-5b3f-aaf2-c0e10755b09a",
                    type: "x-acs-device",
                    name: "x-acs-device--d1ae3fd1-704c-5b3f",
                    children: [
                        {
                            id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
                            type: "user-account",
                            name: "user-account--c628c9d7-46b3-5653",
                            children: [],
                            user_id: "0",
                            account_login: "root",
                            display_name: "root",
                            is_privileged: true,
                        },
                        {
                            id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
                            type: "user-account",
                            name: "user-account--bd68268a-4405",
                            children: [],
                            user_id: "1000",
                            account_login: "employee",
                            display_name: "employee",
                        },
                        {
                            id: "process--6c688576-4b95-4d7f-9971-f1441755bc55",
                            type: "process",
                            name: "process--6c688576-4b95-4d7f",
                            children: [],
                            name2: "main-static",
                            pid: 1,
                            cwd: "/home/employee",
                            command_line: "main-static",
                        },
                        {
                            id: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b",
                            type: "process",
                            name: "process--ad",
                            children: [],
                            name2: "sshd",
                            pid: 2,
                            command_line: "sshd",
                        },

                        {
                            id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",//bunun id sine 1 ekledim, üstteki ile aynıydı çünkü
                            type: "directory",
                            name: "directory--c1",
                            path: "/etc",
                            children: [
                                {
                                    id: "file--c8349ee8-2524-58ed-b8e5-14db73856575",
                                    type: "file",
                                    name: "file--c8",
                                    name2: "passwd",
                                    path: "/etc/passwd",
                                    children: [
                                        {
                                            id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
                                            type: "user-account",
                                            name: "user-account--c6",
                                            children: [],
                                            user_id: "0",
                                            account_login: "root",
                                            display_name: "root",
                                            is_privileged: true
                                        },
                                        {
                                            id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
                                            type: "user-account",
                                            name: "user-account--bd6",
                                            children: [],
                                            user_id: "1000",
                                            account_login: "employee",
                                            display_name: "employee",

                                        }
                                    ],

                                },
                                {
                                    id: "file--baa72a2e-85f6-5abc-98f8-54b9617e5e43",
                                    type: "file",
                                    name: "file--baa72a2e",
                                    name2: "shadow",
                                    path: "/etc/shadow",
                                    children: [
                                        {
                                            id: "x-acs-credential--75002b61-cf33-56a6-b697-8171cc3282ac",
                                            type: "x-acs-credential",
                                            name: "x-acs-credential--7",
                                            children: [],
                                        },
                                        {
                                            id: "x-acs-credential--5c59f6bc-989f-59e9-8445-b173a7034cdc",
                                            type: "x-acs-credential",
                                            children: [],
                                            name: "x-acs-credential--5c",
                                        }
                                    ],

                                }
                            ],

                        },

                        {
                            id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",//** */
                            type: "directory",
                            name: "directory--c9729dd5-e",
                            path: "/bin",
                            children: [
                                {
                                    id: "file--6389832b-fd61-5041-a76f-7bc932de546d",
                                    type: "file",
                                    name: "file--6389832b-fd61",
                                    children: [],
                                    name2: "ash",
                                    path: "/bin/ash",

                                },
                                {
                                    id: "file--343bd74d-c703-5dd9-8200-1b741542af58",
                                    type: "file",
                                    name: "file--343bd74d-c703",
                                    children: [],
                                    name2: "find",
                                },
                                {
                                    id: "file--e9519962-109d-5bd8-bec5-64012b2c31df",
                                    type: "file",
                                    name: "file--e9519962-109d",
                                    children: [],
                                    name2: "micro",
                                    path: "/bin/micro",
                                },
                                {
                                    id: "file--da43ff8a-6c9f-5126-91fc-4f1086fcc079",
                                    type: "file",
                                    name: "file--da43ff8a-6c9f",
                                    children: [],
                                    name2: "su",
                                    path: "/bin/su",

                                },
                                {
                                    id: "file--19733450-09a3-5672-ae39-dc8f727dee21",
                                    type: "file",
                                    name: "file--19733450-09a3",
                                    children: [],
                                    name2: "sshd",
                                    path: "/bin/sshd",

                                },
                                {
                                    id: "file--89060d39-4f09-569e-8c15-8f41b48b81ac",
                                    type: "file",
                                    name: "file--89060d39-4f09",
                                    children: [],
                                    name2: "sh",
                                    path: "sh",

                                },
                                {
                                    id: "file--47381d90-ce1e-5df4-b450-3423098258eb",
                                    type: "file",
                                    name: "file--47381d90-ce1e",
                                    children: [],
                                    name2: "cp",
                                    path: "/bin/cp",
                                },
                                {
                                    id: "file--f9d55f66-078d-5322-aba7-ad05409ec874",
                                    type: "file",
                                    name: "file--f9d55f66-078d",
                                    children: [],
                                    name2: "sudo",
                                    path: "/bin/sudo",
                                }
                            ],

                        },

                        {
                            id: "directory--ff245550-2193-55c2-a6f2-da711d07926a2",//** */
                            type: "directory",
                            name: "directory--ff24",
                            path: "/home/employee",
                            children: [
                                {
                                    id: "directory--661bdc12-34de-5967-9126-5e5740a12ddf",
                                    type: "directory",
                                    name: "directory--661bdc",
                                    path: "/home/employee/.ssh",
                                    children: [
                                        {
                                            id: "file--f5db77b5-d705-5a02-a094-7e6c11ebf0f5",
                                            type: "file",
                                            name: "file--f5db77b5",
                                            name2: "authorized_keys",
                                            path: "/home/employee/.ssh/authorized_keys",
                                            children: [
                                                {
                                                    id: "x-acs-credential--7c07e98e-cd07-5d27-af6d-09828146f01b",
                                                    type: "x-acs-credential",
                                                    name: "x-acs-credential--7c07e98e",
                                                    children: [],
                                                }
                                            ],

                                        }
                                    ],
                                },
                                {
                                    id: "file--e53ff81f-e264-5785-8b8c-09c4d0dcd5e4",
                                    type: "file",
                                    name: "file--e53ff81f-e264",
                                    name2: ".ash_history",
                                    children: [
                                        {
                                            id: "x-acs-credential--85f22f40-b199-400a-b7dc-d433736b55ea",
                                            type: "x-acs-credential",
                                            name: "x-acs-credential--85f22f40",
                                            children: [],
                                        }
                                    ],

                                },
                                {
                                    id: "file--ea579643-1874-5fa2-b2ae-c2aa9651c6ba",
                                    type: "file",
                                    name: "file--ea579643",
                                    children: [],
                                    name2: "main-static",
                                    path: "/home/employee/main-static",
                                }
                            ],

                        },

                        {
                            id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",//** */
                            type: "directory",
                            name: "directory--cbca4731-63",
                            path: "/root",
                            children: [
                                {
                                    id: "file--d7285d04-ca01-5364-923d-6063ea988841",//** */
                                    type: "file",
                                    name: "file--d7285d04-c",
                                    children: [],
                                    name2: "flag.txt",
                                    path: "/root/flag.txt",

                                }
                            ],

                        }
                    ]
                },
                // {
                //     id: "x-acs-device--d1ae3fd1-704c-5b3f-aaf2-c0e10755b09a",
                //     type: "x-acs-device",
                //     name: "x-acs-device--d1ae3fd1-704c-5b3f",
                //     children: [
                //         {
                //             id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
                //             type: "user-account",
                //             name: "user-account--c628c9d7-46b3-5653",
                //             children: [],
                //             user_id: "0",
                //             account_login: "root",
                //             display_name: "root",
                //             is_privileged: true,
                //         },
                //         {
                //             id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
                //             type: "user-account",
                //             name: "user-account--bd68268a-4405",
                //             children: [],
                //             user_id: "1000",
                //             account_login: "employee",
                //             display_name: "employee",
                //         },
                //         {
                //             id: "process--6c688576-4b95-4d7f-9971-f1441755bc55",
                //             type: "process",
                //             name: "process--6c688576-4b95-4d7f",
                //             children: [],
                //             name2: "main-static",
                //             pid: 1,
                //             cwd: "/home/employee",
                //             command_line: "main-static",
                //         },
                //         {
                //             id: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b",
                //             type: "process",
                //             name: "process--ad",
                //             children: [],
                //             name2: "sshd",
                //             pid: 2,
                //             command_line: "sshd",
                //         },

                //         {
                //             id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",//bunun id sine 1 ekledim, üstteki ile aynıydı çünkü
                //             type: "directory",
                //             name: "directory--c1",
                //             path: "/etc",
                //             children: [
                //                 {
                //                     id: "file--c8349ee8-2524-58ed-b8e5-14db73856575",
                //                     type: "file",
                //                     name: "file--c8",
                //                     name2: "passwd",
                //                     path: "/etc/passwd",
                //                     children: [
                //                         {
                //                             id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
                //                             type: "user-account",
                //                             name: "user-account--c6",
                //                             children: [],
                //                             user_id: "0",
                //                             account_login: "root",
                //                             display_name: "root",
                //                             is_privileged: true
                //                         },
                //                         {
                //                             id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
                //                             type: "user-account",
                //                             name:"user-account--bd6",
                //                             children: [],
                //                             user_id: "1000",
                //                             account_login: "employee",
                //                             display_name: "employee",

                //                         }
                //                     ],

                //                 },
                //                 {
                //                     id: "file--baa72a2e-85f6-5abc-98f8-54b9617e5e43",
                //                     type: "file",
                //                     name: "file--baa72a2e",
                //                     name2: "shadow",
                //                     path: "/etc/shadow",
                //                     children: [
                //                         {
                //                             id: "x-acs-credential--75002b61-cf33-56a6-b697-8171cc3282ac",
                //                             type: "x-acs-credential",
                //                             name:"x-acs-credential--7",
                //                             children: [],
                //                         },
                //                         {
                //                             id: "x-acs-credential--5c59f6bc-989f-59e9-8445-b173a7034cdc",
                //                             type: "x-acs-credential",
                //                             children: [],
                //                             name:"x-acs-credential--5c",
                //                         }
                //                     ],

                //                 }
                //             ],

                //         },

                //         {
                //             id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",//** */
                //             type: "directory",
                //             name: "directory--c9729dd5-e",
                //             path: "/bin",
                //             children: [
                //                 {
                //                     id: "file--6389832b-fd61-5041-a76f-7bc932de546d",
                //                     type: "file",
                //                     name:"file--6389832b-fd61",
                //                     children: [],
                //                     name2: "ash",
                //                     path: "/bin/ash",

                //                 },
                //                 {
                //                     id: "file--343bd74d-c703-5dd9-8200-1b741542af58",
                //                     type: "file",
                //                     name:"file--343bd74d-c703",
                //                     children: [],
                //                     name2: "find",
                //                 },
                //                 {
                //                     id: "file--e9519962-109d-5bd8-bec5-64012b2c31df",
                //                     type: "file",
                //                     name:"file--e9519962-109d",
                //                     children: [],
                //                     name2: "micro",
                //                     path: "/bin/micro",
                //                 },
                //                 {
                //                     id: "file--da43ff8a-6c9f-5126-91fc-4f1086fcc079",
                //                     type: "file",
                //                     name:"file--da43ff8a-6c9f",
                //                     children: [],
                //                     name2: "su",
                //                     path: "/bin/su",

                //                 },
                //                 {
                //                     id: "file--19733450-09a3-5672-ae39-dc8f727dee21",
                //                     type: "file",
                //                     name:"file--19733450-09a3",
                //                     children: [],
                //                     name2: "sshd",
                //                     path: "/bin/sshd",

                //                 },
                //                 {
                //                     id: "file--89060d39-4f09-569e-8c15-8f41b48b81ac",
                //                     type: "file",
                //                     name:"file--89060d39-4f09",
                //                     children: [],
                //                     name2: "sh",
                //                     path: "sh",

                //                 },
                //                 {
                //                     id: "file--47381d90-ce1e-5df4-b450-3423098258eb",
                //                     type: "file",
                //                     name:"file--47381d90-ce1e",
                //                     children: [],
                //                     name2: "cp",
                //                     path: "/bin/cp",
                //                 },
                //                 {
                //                     id: "file--f9d55f66-078d-5322-aba7-ad05409ec874",
                //                     type: "file",
                //                     name:"file--f9d55f66-078d",
                //                     children: [],
                //                     name2: "sudo",
                //                     path: "/bin/sudo",
                //                 }
                //             ],

                //         },

                //         {
                //             id: "directory--ff245550-2193-55c2-a6f2-da711d07926a2",//** */
                //             type: "directory",
                //             name:"directory--ff24",
                //             path: "/home/employee",
                //             children: [
                //                 {
                //                     id: "directory--661bdc12-34de-5967-9126-5e5740a12ddf",
                //                     type: "directory",
                //                     name:"directory--661bdc",
                //                     path: "/home/employee/.ssh",
                //                     children: [
                //                         {
                //                             id: "file--f5db77b5-d705-5a02-a094-7e6c11ebf0f5",
                //                             type: "file",
                //                             name: "file--f5db77b5",
                //                             name2: "authorized_keys",
                //                             path: "/home/employee/.ssh/authorized_keys",
                //                             children: [
                //                                 {
                //                                     id: "x-acs-credential--7c07e98e-cd07-5d27-af6d-09828146f01b",
                //                                     type: "x-acs-credential",
                //                                     name:"x-acs-credential--7c07e98e",
                //                                     children: [],
                //                                 }
                //                             ],

                //                         }
                //                     ],     
                //                 },
                //                 {
                //                     id: "file--e53ff81f-e264-5785-8b8c-09c4d0dcd5e4",
                //                     type: "file",
                //                     name: "file--e53ff81f-e264",
                //                     name2: ".ash_history",
                //                     children: [
                //                         {
                //                             id: "x-acs-credential--85f22f40-b199-400a-b7dc-d433736b55ea",
                //                             type: "x-acs-credential",
                //                             name:"x-acs-credential--85f22f40",
                //                             children: [],
                //                         }
                //                     ],

                //                 },
                //                 {
                //                     id: "file--ea579643-1874-5fa2-b2ae-c2aa9651c6ba",
                //                     type: "file",
                //                     name:"file--ea579643",
                //                     children: [],
                //                     name2: "main-static",
                //                     path: "/home/employee/main-static",
                //                 }
                //             ],

                //         },

                //         {
                //             id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",//** */
                //             type: "directory",
                //             name:"directory--cbca4731-63",
                //             path: "/root",
                //             children: [
                //                 {
                //                     id: "file--d7285d04-ca01-5364-923d-6063ea988841",//** */
                //                     type: "file",
                //                     name:"file--d7285d04-c",
                //                     children: [],
                //                     name2: "flag.txt",
                //                     path: "/root/flag.txt",

                //                 },
                //                 {
                //                     id: "file--d7285d04-ca01-5364-923d-6063ea988841",//** */
                //                     type: "file",
                //                     name:"file--d7285d04-c",
                //                     children: [
                //                         {
                //                             id: "file--d7285d04-ca01-5364-923d-6063ea988841",//** */
                //                             type: "file",
                //                             name:"file--d7285d04-c",
                //                             children: [],
                //                             name2: "flag.txt",
                //                             path: "/root/flag.txt",

                //                         }
                //                     ],
                //                     name2: "flag.txt",
                //                     path: "/root/flag.txt",

                //                 }
                //             ],

                //         }
                //     ]
                // }
            ]
        }
    ]
}
