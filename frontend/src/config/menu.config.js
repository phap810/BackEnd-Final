// structure of side bar
const menuMap = [
  {
    label: 'products',
    index: 1,
    icon: 'gold',
    children: [
      {
        label: 'list',
        route: { name: 'ProductList' }
      },
      {
        label: 'import',
        route: { name: 'ProductImport' }
      },
      {
        label: 'export',
        route: { name: 'ProductExport' }
      },
      {
        label: 'createManually',
        route: { name: 'ProductCreateManually' }
      },
      {
        label: 'exportLog',
        route: { name: 'ProductExportLog' }
      }
    ]
  },
  {
    label: 'katool',
    index: 2,
    icon: 'tool',
    children: [
      {
        label: 'kkdictionary',
        route: { name: 'KKdictionary' }
      },
      {
        label: 'kkglossary',
        route: { name: 'KKglossary' }
      }
    ]
  },
  {
    label: 'case',
    index: 3,
    icon: 'flag',
    children: [
      {
        label: 'caseList',
        route: { name: 'CaseList' }
      },
      {
        label: 'caseAssignment',
        route: { name: 'CaseAssignment' }
      }
    ]
  },
  {
    label: 'summary',
    index: 4,
    icon: 'audit',
    route: { name: 'Summary' }
  },
  {
    label: 'systemSetting',
    index: 5,
    icon: 'setting',
    children: [
      {
        label: 'accountSetting',
        route: { name: 'AccountSetting' }
      },
      {
        label: 'apiSetting',
        route: { name: 'APISetting' }
      }
    ]
  },
  {
    label: 'myAccount',
    index: 6,
    icon: 'user',
    route: { name: 'MyAccount' }
  },
  {
    label: 'prototype',
    index: 7,
    icon: 'tool',
    children: [
      {
        label: 'button',
        route: { name: 'Button' }
      },
      {
        label: 'table',
        route: { name: 'Table' }
      }
    ]
  }
];
export default menuMap;
