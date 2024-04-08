import React, { useState } from "react";
import {
  DataTable,
  TableContainer,
  TableToolbar,
  TableBatchActions,
  TableBatchAction,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  TableToolbarAction,
  Table,
  TableHead,
  TableRow,
  TableExpandHeader,
  TableSelectAll,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableSelectRow,
  TableCell,
  TableExpandedRow,
  Link,
  Button,
} from "@carbon/react";
import { Download, Save, TrashCan } from "@carbon/icons-react";
import styles from "./CarbonGrid.module.css"; // Import CSS module
const headerData = [
  {
    header: "Name",
    key: "name",
  },
  {
    header: "Protocol",
    key: "protocol",
  },
  {
    header: "Port",
    key: "port",
  },
  {
    header: "Rule",
    key: "rule",
  },
  {
    header: "Attached groups",
    key: "attached_groups",
  },
  {
    header: "Status",
    key: "status",
  },
];

const rowData = [
  {
    attached_groups: "Kevin’s VM Groups",
    id: "a",
    name: "Load Balancer 3",
    port: 3000,
    protocol: "HTTP",
    rule: "Round robin",
    status: (
      <Link disabled href="#">
        Disabled
      </Link>
    ),
  },
  {
    attached_groups: "Maureen’s VM Groups",
    id: "b",
    name: "Load Balancer 1",
    port: 443,
    protocol: "HTTP",
    rule: "Round robin",
    status: <Link href="#">Starting</Link>,
  },
  {
    attached_groups: "Andrew’s VM Groups",
    id: "c",
    name: "Load Balancer 2",
    port: 80,
    protocol: "HTTP",
    rule: "DNS delegation",
    status: <Link href="#">Active</Link>,
  },
  {
    attached_groups: "Marc’s VM Groups",
    id: "d",
    name: "Load Balancer 6",
    port: 3000,
    protocol: "HTTP",
    rule: "Round robin",
    status: (
      <Link disabled href="#">
        Disabled
      </Link>
    ),
  },
  {
    attached_groups: "Mel’s VM Groups",
    id: "e",
    name: "Load Balancer 4",
    port: 443,
    protocol: "HTTP",
    rule: "Round robin",
    status: <Link href="#">Starting</Link>,
  },
  {
    attached_groups: "Ronja’s VM Groups",
    id: "f",
    name: "Load Balancer 5",
    port: 80,
    protocol: "HTTP",
    rule: "DNS delegation",
    status: <Link href="#">Active</Link>,
  },
];
export const CarbonGrid = () => {
  const initialRows = rowData;
  const initialHeaders = headerData;

  const [state, setState] = useState({
    rows: initialRows,
    headers: initialHeaders,
    id: 0,
  });

  const handleOnHeaderAdd = () => {
    // Add logic for adding header if required
  };

  const handleOnRowAdd = () => {
    // Add logic for adding row if required
  };

  const onInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase(); // Convert input value to lowercase
    setState((prevState) => ({
      ...prevState,
      rows: initialRows.filter((row) =>
        Object.values(row).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchTerm)
        )
      ),
    }));
  };

  return (
    <div className={styles.gridContainer}>
      <DataTable
        rows={state.rows}
        headers={state.headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getSelectionProps,
          getToolbarProps,
          getBatchActionProps,
          getRowProps,
          getExpandedRowProps,
          selectedRows,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              title="Registro de Arriendos"
              description="En esta sección podrás visualizar cada uno de los arriendos que tienes registrados, además de poder crear nuevos registros"
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  {/* Batch actions */}
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}
                >
                  <TableToolbarSearch
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  <TableToolbarMenu
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  >
                    <TableToolbarAction onClick={handleOnRowAdd}>
                      Add row
                    </TableToolbarAction>
                    <TableToolbarAction onClick={handleOnHeaderAdd}>
                      Add header
                    </TableToolbarAction>
                  </TableToolbarMenu>
                  <Button onClick={() => {}}>Nuevo</Button>
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    <TableExpandHeader aria-label="expand row" />
                    <TableSelectAll
                      ariaLabel="Select all rows"
                      checked={true}
                      id="selectAllCheckbox"
                      indeterminate={true}
                      name="selectAll"
                      onSelect={(event) => {}}
                    />
                    {headers.map((header, i) => (
                      <TableHeader
                        key={header.key}
                        onClick={(event) => {}}
                        {...getHeaderProps({ header })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableExpandRow {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableExpandRow>
                      <TableExpandedRow
                        colSpan={headers.length + 3}
                        className="demo-expanded-td"
                        {...getExpandedRowProps({ row })}
                      >
                        <h6>Expandable row content</h6>
                        <div>Description here</div>
                      </TableExpandedRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      />
    </div>
  );
};
