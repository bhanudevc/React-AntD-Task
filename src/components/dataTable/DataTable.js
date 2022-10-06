import { useRef, useState } from "react";
import "antd/dist/antd.min.css";
import { CSVLink } from "react-csv";
import ReactToPrint from "react-to-print";
import {
  DownloadOutlined,
  PrinterTwoTone,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Table } from "antd";
import columns from "../dataTable/columns";
import useGetData from "../../hooks/useGetData";
import { map, get } from "lodash";
import "./style.scss";

const Search = Input.Search;

const DataTable = () => {
  const componentRef = useRef();
  const data = useGetData();
  const [searchText, setSearchText] = useState("");
  const [dataSet, setDataSet] = useState(data);
  const suffix = searchText ? (
    <CloseCircleOutlined
      onClick={() => {
        setSearchText('');
        setDataSet(data);
      }}
    />
  ) : <span/>;
  const onSearch = (value) => {
    const reg = new RegExp(value, "gi");
    const filteredData = map(data, (record) => {
      const nameMatch = get(record, "FirstName").match(reg);
      const LastNameMatch = get(record, "LastName").match(reg);
      const DOBNameMatch = get(record, "DOB").match(reg);
      if (!nameMatch && !LastNameMatch && !DOBNameMatch) {
        return null;
      }
      return record;
    }).filter((record) => !!record);
    setSearchText(value);
    setDataSet(value ? filteredData : data);
  };
  return (
    <div>
      <div className="btn-wrapper">
        <ReactToPrint
          trigger={() => (
            <Button
              type="primary"
              shape="round"
              icon={<PrinterTwoTone />}
              size={"large"}
            >
              Print
            </Button>
          )}
          onAfterPrint={() => {
            componentRef.current.style.display = "none";
          }}
          content={() => {
            componentRef.current.style.display = "block";
            return componentRef.current;
          }}
        />
        <CSVLink filename={"TableData.csv"} data={data.map(({key, ...rest}) => rest)}>
          <span style={{ float: "right" }}>
            <Button
              type="primary"
              shape="round"
              icon={<DownloadOutlined />}
              size={"large"}
            >
              Download
            </Button>
          </span>
        </CSVLink>
      </div>
      <Search
        size="large"
        suffix={suffix}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search Records"
        value={searchText}
        onPressEnter={onSearch}
      />
      <Table
        columns={columns}
        dataSource={dataSet}
        pagination={{ pageSize: 20 }}
      />

      <div ref={componentRef} style={{ display: "none" }}>
        <Table columns={columns} dataSource={dataSet} pagination={false} />
      </div>
    </div>
  );
};

export default DataTable;
