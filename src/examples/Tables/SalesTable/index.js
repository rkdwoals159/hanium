/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// Argon Dashboard 2 MUI components
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";

// Argon Dashboard 2 MUI example components
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";

function SalesTable({ socketData, title }) {
  const renderTableCells = socketData ? socketData.map((data, key) => {
    const rowKey = `row-${key}`;
    const cellKey = [`cell-${key}-1`,`cell-${key}-2`];
    const tableRows = [
      <SalesTableCell
      key={cellKey[0]}
      title={"Uuid"}
      content={data.uuid}
    />,
    <SalesTableCell
    key={cellKey[1]}
    title={"결과"}
    content={data.anomal_TF ? "정상" : "비정상"}
  />
    ]
    
    return <TableRow key={rowKey}>{tableRows}</TableRow>;
  }) : [];

  return (
    <TableContainer sx={{ height: "100%" }}>
      <Table>
        <TableHead>
          <ArgonBox component="tr" width="max-content" display="block" mb={1.5}>
            <ArgonTypography color="inherit" fontWeight="bold" variant="h6" component="td">
              {title}
            </ArgonTypography>
          </ArgonBox>
        </TableHead>
        <TableBody>{useMemo(() => renderTableCells, [socketData])}</TableBody>
      </Table>
    </TableContainer>
  );
}

// Setting default values for the props of SalesTable
SalesTable.defaultProps = {
  socketData: [],
};

// Typechecking props for the SalesTable
SalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  socketData : PropTypes.arrayOf(PropTypes.object),
};

export default SalesTable;
