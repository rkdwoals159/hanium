import { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ArgonTypography from "components/ArgonTypography";
import ArgonBox from "components/ArgonBox";
import SalesTableCell from "examples/Tables/SalesTable/SalesTableCell";
import { TableCell } from "@mui/material";

function SalesTable({ socketData, title }) {
  const containerRef = useRef(null);

  // 속성 또는 상태가 변경될 때 스크롤을 맨 아래로 이동
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [socketData]);
  const renderTableCells = socketData
    ? socketData.map((data, key) => {
        const rowKey = `row-${key}`;
        const cellKey = [`cell-${key}-1`, `cell-${key}-2`];
        const tableRows = [
          <SalesTableCell key={`cell-${key}-1`} title={"Uuid"} content={data.uuid} />,
          <SalesTableCell key={`cell-${key}-2`} title={"결과"} content={data.anomal_TF ? "정상" : "비정상"} />,
          <TableCell TableCell key={`cell-${key}-3`} align="center">
            <ArgonBox display="flex" flexDirection="column">
              <ArgonTypography variant="button" fontWeight="medium" color="warning" textTransform="capitalize">
                상세 보기
              </ArgonTypography>
            </ArgonBox>
          </TableCell>,
        ];

        return <TableRow key={rowKey}>{tableRows}</TableRow>;
      })
    : [];

  return (
    <TableContainer ref={containerRef} sx={{ height: "1000px", overflowY: "auto" }}> {/* 여기서 maxHeight를 조절하여 최대 높이를 변경할 수 있습니다. */}
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

SalesTable.defaultProps = {
  socketData: [],
};

SalesTable.propTypes = {
  title: PropTypes.string.isRequired,
  socketData: PropTypes.arrayOf(PropTypes.object),
};

export default SalesTable;
