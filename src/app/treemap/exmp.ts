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
    value: 3,
    children: [
        {
            id: "x-acs-subnet--b02d68a5-12ab-4e53-b57f-7b02700aad24",
            type: "x-acs-subnet",
            name: "x-acs-subnet--b",
            value: 1,
            children: [
                {
                    id: "x-acs-device--d1ae3fd1-704c-5b3f-aaf2-c0e10755b09a",
                    type: "x-acs-device",
                    name: "x-acs-device--d1",
                    children: [
                        {
                            id: "user-account--c628c9d7-46b3-5653-9e16-d474ec3b1311",
                            type: "user-account",
                            name: "user-account--c6",
                            children: [],
                            user_id: "0",
                            account_login: "root",
                            display_name: "root",
                            is_privileged: true,
                            value: 2,
                        },
                        {
                            id: "user-account--bd68268a-4405-5d3c-bfa8-1101038a104c",
                            type: "user-account",
                            name: "user-account--bd",
                            children: [],
                            user_id: "1000",
                            account_login: "employee",
                            display_name: "employee",
                            value: 2,
                        },
                        {
                            id: "process--6c688576-4b95-4d7f-9971-f1441755bc55",
                            type: "process",
                            name: "process--6c",
                            children: [],
                            name2: "main-static",
                            pid: 1,
                            cwd: "/home/employee",
                            command_line: "main-static",
                            value: 2,
                        },
                        {
                            id: "process--ad747851-2f2e-4720-a3c2-4e033498cb1b",
                            type: "process",
                            name: "process--ad",
                            children: [],
                            name2: "sshd",
                            pid: 2,
                            command_line: "sshd",
                            value: 2,
                        },
                        {
                            id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",
                            type: "directory",
                            name: "directory--c1e",
                            children: [],
                            path: "/etc"
                        },
                        {
                            id: "directory--c11a3267-8e4e-5d97-9182-981a345fad09",
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
                                            children: [],
                                            user_id: "1000",
                                            account_login: "employee",
                                            display_name: "employee"
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
                                            children: []
                                        },
                                        {
                                            id: "x-acs-credential--5c59f6bc-989f-59e9-8445-b173a7034cdc",
                                            type: "x-acs-credential",
                                            children: []
                                        }
                                    ],

                                }
                            ],

                        },
                        {
                            id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",
                            name: "directory--c9729dd5",
                            type: "directory",
                            children: [],
                            path: "/bin"
                        },
                        {
                            id: "directory--c9729dd5-e253-5e1a-9865-db3750601b70",
                            type: "directory",
                            name: "directory--c9729dd5-e",
                            path: "/bin",
                            children: [
                                {
                                    id: "file--6389832b-fd61-5041-a76f-7bc932de546d",
                                    type: "file",
                                    children: [],
                                    name: "ash",
                                    path: "/bin/ash"
                                },
                                {
                                    id: "file--343bd74d-c703-5dd9-8200-1b741542af58",
                                    type: "file",
                                    children: [],
                                    name: "find",
                                    path: "/bin/find",
                                    value: 1,
                                },
                                {
                                    id: "file--e9519962-109d-5bd8-bec5-64012b2c31df",
                                    type: "file",
                                    children: [],
                                    name: "micro",
                                    path: "/bin/micro",
                                    value: 1,
                                },
                                {
                                    id: "file--da43ff8a-6c9f-5126-91fc-4f1086fcc079",
                                    type: "file",
                                    children: [],
                                    name: "su",
                                    path: "/bin/su"
                                },
                                {
                                    id: "file--19733450-09a3-5672-ae39-dc8f727dee21",
                                    type: "file",
                                    children: [],
                                    name: "sshd",
                                    path: "/bin/sshd",
                                    value: 1,
                                },
                                {
                                    id: "file--89060d39-4f09-569e-8c15-8f41b48b81ac",
                                    type: "file",
                                    children: [],
                                    name: "sh",
                                    path: "sh",
                                    value: 1,
                                },
                                {
                                    id: "file--47381d90-ce1e-5df4-b450-3423098258eb",
                                    type: "file",
                                    children: [],
                                    name: "cp",
                                    path: "/bin/cp",
                                    value: 1,
                                },
                                {
                                    id: "file--f9d55f66-078d-5322-aba7-ad05409ec874",
                                    type: "file",
                                    children: [],
                                    name: "sudo",
                                    path: "/bin/sudo",
                                    value: 1,
                                }
                            ],

                        },
                        {
                            id: "directory--ff245550-2193-55c2-a6f2-da711d07926a",
                            type: "directory",
                            children: [],
                            path: "/home/employee"
                        },
                        {
                            id: "directory--ff245550-2193-55c2-a6f2-da711d07926a",
                            type: "directory",
                            path: "/home/employee",
                            children: [
                                {
                                    id: "directory--661bdc12-34de-5967-9126-5e5740a12ddf",
                                    type: "directory",
                                    path: "/home/employee/.ssh",
                                    children: [
                                        {
                                            id: "file--f5db77b5-d705-5a02-a094-7e6c11ebf0f5",
                                            type: "file",
                                            name: "file",
                                            name2: "authorized_keys",
                                            path: "/home/employee/.ssh/authorized_keys",
                                            children: [
                                                {
                                                    id: "x-acs-credential--7c07e98e-cd07-5d27-af6d-09828146f01b",
                                                    type: "x-acs-credential",
                                                    children: []
                                                }
                                            ],

                                        }
                                    ],     
                                },
                                {
                                    id: "file--e53ff81f-e264-5785-8b8c-09c4d0dcd5e4",
                                    type: "file",
                                    name: "file",
                                    name2: ".ash_history",
                                    path: "/home/employee/.ash_history",
                                    children: [
                                        {
                                            id: "x-acs-credential--85f22f40-b199-400a-b7dc-d433736b55ea",
                                            type: "x-acs-credential",
                                            children: []
                                        }
                                    ],
                                    
                                },
                                {
                                    id: "file--ea579643-1874-5fa2-b2ae-c2aa9651c6ba",
                                    type: "file",
                                    children: [],
                                    name2: "main-static",
                                    path: "/home/employee/main-static",
                                    value: 1,
                                }
                            ],
                            
                        },
                        {
                            id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",
                            type: "directory",
                            name: "directory",
                            children: [],
                            path: "/root"
                        },
                        {
                            id: "directory--cbca4731-6300-543c-9f48-b2e43627413e",
                            type: "directory",
                            path: "/root",
                            children: [
                                {
                                    id: "file--d7285d04-ca01-5364-923d-6063ea988841",
                                    type: "file",
                                    children: [],
                                    name2: "flag.txt",
                                    path: "/root/flag.txt"
                                }
                            ],
                            
                        }
                    ]
                }
            ]
        }
    ]
}
