function loadView(view) {
  return () => import(`@/views/${view}`);
}

export const routers = [
  {
    name: 'index',
    path: '',
    redirect: { name: 'ProductList' },
    meta: {
      title: 'Home'
    },
    component: () => import('@/components/layout'),
    children: [
      { // Products
        name: 'ProductList',
        path: '/products',
        component: loadView('products/List'),
        meta: {
          title: 'Products',
          breadcrumb: [
            { label: 'products' }
          ]
        }
      },
      {
        name: 'ProductImport',
        path: '/products/import',
        component: loadView('products/Import'),
        meta: {
          title: 'Import',
          breadcrumb: [
            {
              label: 'products',
              route: {
                name: 'ProductList'
              }
            },
            { label: 'import' }
          ]
        }
      },
      {
        name: 'ProductExport',
        path: '/products/export',
        component: loadView('products/Export'),
        meta: {
          title: 'Export',
          breadcrumb: [
            {
              label: 'products',
              route: {
                name: 'ProductList'
              }
            },
            { label: 'export' }
          ]
        }
      },
      {
        name: 'ProductCreateManually',
        path: '/products/create-manually',
        component: loadView('products/CreateManually'),
        meta: {
          title: 'Create Manually',
          breadcrumb: [
            {
              label: 'products',
              route: {
                name: 'productList'
              }
            },
            { label: 'createManually' }
          ]
        }
      },
      {
        name: 'ProductExportLog',
        path: '/products/export-log',
        component: loadView('products/ExportLog'),
        meta: {
          title: 'Export Log',
          breadcrumb: [
            {
              label: 'products',
              route: {
                name: 'ProductList'
              }
            },
            { label: 'exportLog' }
          ]
        }
      },
      {
        name: 'ProductEditing',
        path: '/products/:oid',
        component: loadView('products/Editing'),
        meta: {
          title: 'Editing',
          breadcrumb: [
            {
              label: 'products',
              route: {
                name: 'ProductList'
              }
            },
            { label: params => params.oid || 'undefined' }
          ]
        }
      }, // end Products
      { // Katool
        name: 'KKdictionary',
        path: '/katool/kkdictionary',
        component: loadView('katool/KKdictionary'),
        meta: {
          title: 'KK Dictionary',
          breadcrumb: [
            {
              label: 'katool'
            },
            {
              label: 'kkdictionary'
            }
          ]
        }
      },
      {
        name: 'KKglossary',
        path: '/katool/KKglossary',
        component: loadView('katool/KKglossary'),
        meta: {
          title: 'KK Glossary',
          breadcrumb: [
            {
              label: 'katool'
            },
            {
              label: 'kkglossary'
            }
          ]
        }
      }, // end Katool
      { // Case
        name: 'CaseList',
        path: '/case/case-list',
        component: loadView('case/CaseList'),
        meta: {
          title: 'Case List',
          breadcrumb: [
            {
              label: 'case'
            },
            {
              label: 'caseList'
            }
          ]
        }
      },
      {
        name: 'CaseAssignment',
        path: '/case/case-assignment',
        component: loadView('case/CaseAssignment'),
        meta: {
          title: 'Case Assignment',
          breadcrumb: [
            {
              label: 'case'
            },
            {
              label: 'caseAssignment'
            }
          ]
        }
      }, // end Case
      { // Summary
        name: 'Summary',
        path: '/summary',
        component: loadView('Summary'),
        meta: {
          title: 'Summary',
          breadcrumb: [
            {
              label: 'summary'
            }
          ]
        }
      }, // end Summary
      { // System Setting
        name: 'AccountSetting',
        path: '/system-setting/account-setting',
        component: loadView('system-setting/AccountSetting'),
        meta: {
          title: 'Account Setting',
          breadcrumb: [
            {
              label: 'systemSetting'
            },
            {
              label: 'accountSetting'
            }
          ]
        }
      },
      {
        name: 'APISetting',
        path: '/system-setting/api-setting',
        component: loadView('system-setting/APISetting'),
        meta: {
          title: 'API Setting',
          breadcrumb: [
            {
              label: 'systemSetting'
            },
            {
              label: 'apiSetting'
            }
          ]
        }
      }, // end System Setting
      {
        name: 'MyAccount',
        path: '/my-account',
        component: loadView('MyAccount'),
        meta: {
          title: 'My Account',
          breadcrumb: [
            { label: 'myAccount' }
          ]
        }
      },
      {
        name: 'Table',
        path: '/prototype/table',
        component: loadView('prototype/Table'),
        meta: {
          title: 'Table',
          breadcrumb: [
            { label: 'prototype' },
            { label: 'table' }
          ]
        }
      },
      {
        name: 'Button',
        path: '/prototype/Button',
        component: loadView('prototype/Button'),
        meta: {
          title: 'Button',
          breadcrumb: [
            { label: 'prototype' },
            { label: 'button' }
          ]
        }
      },
      {
        name: 'Not Found',
        path: '/404',
        hidden: true,
        meta: {
          title: 'Not Found'
        },
        component: loadView('exception/404')
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: 'Login'
    },
    component: loadView('user/Login')
  },
  {
    path: '*',
    redirect: '/404'
  }
];
