import { mockData } from "./mockData.js";
import "./index.scss";
export const TableRender = {
  name: "TableRender",
  functional: true,
  props: {
    tables: {
      type: Array,
      default: () => [],
    },
  },
  render(h, ctx) {
    console.log("render", ctx);
    // const tablesData = ctx.props.tables;
    //TODO: 测试
    const tablesData = mockData;
    //element=>单个表格
    const tables = tablesData.map((element) => {
      const headerFields = element.fields;
      const data = element.tableData;
      const keys = headerFields.map((_field) => _field.key);
      const tName = [
        h(
          "div",
          {
            attrs: {
              id: `anchor-${element.key}`,
            },
            style: {
              width: "fit-content",
              margin: "20px 0",
              padding: "10px 10px",
              textAlign: "left",
              // borderTop: "1px dashed #333",
              // borderBottom: "1px dashed #333"
              border: "1px solid gray",
              borderLeft: "4px solid #0099ff",
            },
            // class:"borderImage"
          },
          element.label
        ),
      ];
      const ths = headerFields.map((_header) => {
        return h(
          "th",
          {
            style: {
              borderTop: "1px dashed #333",
            },
          },
          _header.label
        );
      });
      const units = headerFields.map((_header) => {
        return h(
          "th",
          {
            style: {
              borderBottom: "1px dashed #333",
            },
          },
          _header.unit
        );
      });
      const tds = data.map((_data) => {
        return h("tr", [
          ...keys.map((_key) => {
            return h(
              "td",
              {
                style: {
                  // padding: "0 10px"
                },
              },
              _data[_key]
            );
          }),
        ]);
      });
      const tableContent = h(
        "table",
        {
          style: {
            borderCollapse: "collapse",
            // marginBottom: "20px"
          },
          attrs: {
            // border: 1
          },
          class: "table-content",
        },
        [h("tr", [...ths]), h("tr", [...units]), h("tbody", [...tds])]
      );
      return h(
        "div",
        {
          class: "table-container",
        },
        [tName, tableContent]
      );
    });
    return h(
      "div",
      {
        style: {
          padding: "10px",
        },
      },
      [...tables]
    );
  },
};
