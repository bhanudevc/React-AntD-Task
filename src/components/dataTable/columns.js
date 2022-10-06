const columns = [
    {
        
    },
  {
    title: "First Name",
    dataIndex: "FirstName",
    key:"FirstName",
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Edward",
        value: "Edward",
      },
    ],

    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.FirstName.includes(value),
    sorter: (a, b) => a.FirstName.length - b.FirstName.length,
    sortDirections: ["descend"],
  },

  {
    title: "Last Name",
    dataIndex: "LastName",
    key:"LastName",
    sorter: (a, b) => a.LastName.length - b.LastName.length,
    sortDirections: ["descend"],
  },
  {
    title: "Date Of Birth",
    dataIndex: "DOB",
    key:"DOB",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.DOB.length - b.DOB.length,
  },
];

export default columns;
