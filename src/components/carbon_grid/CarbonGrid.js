import React, { useState, useEffect } from "react";
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
  OverflowMenuItem,
  OverflowMenu,
} from "@carbon/react";
import {
  Download,
  OrderDetails,
  Save,
  TrashCan,
  IntentRequestCreate,
  UpdateNow,
} from "@carbon/icons-react";
import styles from "./CarbonGrid.module.css"; // Import CSS module
import TenantCreateForm from "../forms/TenantCreateForm";
import { useCreate } from "../../hooks/useCreate";
import { useAuthentication } from "../../hooks/useAuthentication";
import axios from "axios";

export const CarbonGrid = ({ name, objectName, rowData, headerData }) => {
  const initialRows = rowData;
  const initialHeaders = headerData;
  const [selectedRows, setSelectedRows] = useState([]);
  const { isUserLoggedOut } = useAuthentication();

  const [state, setState] = useState({
    rows: initialRows,
    headers: initialHeaders,
    id: 0,
  });

  useEffect(() => {
    setState({
      ...state,
      rows: rowData,
    });
  }, [isUserLoggedOut, rowData]);

  const { onCreateNewTab, addedTab } = useCreate();

  const handleOnHeaderAdd = () => {
    // Add logic for adding header if required
  };

  const handleOnRowAdd = () => {
    // Add logic for adding row if required
  };

  const onInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
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

  const onDeleteSelectedRowsFromUIGrid = (selectedRows) => {
    console.log("Selected Rows Before Deletion:", selectedRows.length);

    const updatedRows = state.rows.filter(
      (row) => !selectedRows.some((selectedRow) => selectedRow.id === row.id)
    );

    console.log("Updated Rows After Deletion:", updatedRows.length);

    setState((prevState) => ({
      ...prevState,
      rows: updatedRows,
    }));

    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((selectedRow) =>
        updatedRows.some((row) => row.id === selectedRow.id)
      )
    );
    console.log("Selected Rows After Deletion:", selectedRows);
  };

  const triggerRightFunctionForDelete = (objectName, selectedRows) => {
    const selectedRowToDispatch = selectedRows;
    if (objectName.includes("Arrendatario")) {
      onDeleteSelectedRowsTenants(selectedRowToDispatch);
    } else {
      onDeleteSelectedRowsClients(selectedRowToDispatch);
    }
  };

  const onDeleteSelectedRowsClients = async (selectedRows) => {
    console.log("Selected Rows Before Deletion:", selectedRows.length);

    // Filter selected rows to get the row with isSelected = true
    // const selectedRow = selectedRows.find((row) => row.isSelected);
    try {
      selectedRows.map((item) => {
        console.log(item.cells);
        item.cells.map((inItem) => {
          console.log(inItem.value);
          let emailToDelete = "";
          if (inItem.value.includes("@")) {
            emailToDelete = inItem.value;

            axios
              .delete(
                `${urlToApiCall}api/clients/email/${emailToDelete}`
              )
              .then((res) => {
                console.log(
                  `User with email ${emailToDelete} was deleted successfully`
                );
                console.log(res);
                onDeleteSelectedRowsFromUIGrid(selectedRows);
              })
              .catch((error) => {
                console.log("Error removing the user selected:", error);
              });
          }
        });
      });

      console.log("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row:", error);
    }

    setSelectedRows([]); // Clear selected rows after deletion
  };

  const onDeleteSelectedRowsTenants = async (selectedRows) => {
    console.log(selectedRows + " !!!");
    console.log("Selected Rows Before Deletion:", selectedRows.length);
    console.log("Selected objectName:", objectName);
    // Filter selected rows to get the row with isSelected = true
    // const selectedRow = selectedRows.find((row) => row.isSelected);
    try {
      selectedRows.map((item) => {
        console.log(item.cells);
        item.cells.map((inItem) => {
          console.log(inItem.value);
          let emailToDelete = "";
          if (inItem.value.includes("@")) {
            emailToDelete = inItem.value;

            axios
              .delete(
                `${urlToApiCall}api/tenants/email/${emailToDelete}`
              )
              .then((res) => {
                console.log(
                  `User with email ${emailToDelete} was deleted successfully`
                );
                console.log(res);
                onDeleteSelectedRowsFromUIGrid(selectedRows);
              })
              .catch((error) => {
                console.log("Error removing the user selected:", error);
              });
          }
        });
      });

      console.log("Row deleted successfully!");
    } catch (error) {
      console.error("Error deleting row:", error);
    }

    setSelectedRows([]); // Clear selected rows after deletion
  };

  const onUpdate = (objectName, selectedRows) => {
    selectedRows.map((item) => {
      console.log(item.cells);
      item.cells.map((inItem) => {
        console.log(inItem.value);
        let emailToUpdate = "";
        if (inItem.value.includes("@")) {
          emailToUpdate = inItem.value;

          console.log(emailToUpdate + " <-------------");
          // pass emaillet panelBasedOnLabel = <></>; // Default empty panel
          let panelBasedOnLabel = <></>; // Default empty panel
          const newTab = {
            label: objectName,
            panel: panelBasedOnLabel,
            icon: () => <IntentRequestCreate />, // Use your icon component or an empty fragment
            disabled: false, // or true based on your requirements
            fromCreateGrid: true,
            email: emailToUpdate,
          };
          // Assuming onCreateNewTab is a function to handle tab creation in Redux
          onCreateNewTab(newTab);
        }
      });
    });
  };

  const onCreateNewTabFromNewButton = (objectName) => {
    let panelBasedOnLabel = <></>; // Default empty panel
    const newTenantTab = {
      label: objectName,
      panel: panelBasedOnLabel,
      icon: () => <IntentRequestCreate />, // Use your icon component or an empty fragment
      disabled: false, // or true based on your requirements
      fromCreateGrid: true,
    };

    // Assuming onCreateNewTab is a function to handle tab creation in Redux
    onCreateNewTab(newTenantTab);
  };

  console.log(rowData + " GRID");

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
              title={name}
              description="En esta sección podrás visualizar cada uno de los arriendos que tienes registrados, además de poder crear nuevos registros"
              {...getTableContainerProps()}
            >
              <TableToolbar {...getToolbarProps()}>
                <TableBatchActions {...getBatchActionProps()}>
                  <TableBatchAction
                    renderIcon={TrashCan}
                    iconDescription="Borrar registro"
                    onClick={
                      () =>
                        objectName.includes("Arrendatario")
                          ? onDeleteSelectedRowsTenants(selectedRows)
                          : onDeleteSelectedRowsClients(selectedRows)
                      // triggerRightFunctionForDelete(selectedRows, objectName)
                    }
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  >
                    Borrar
                  </TableBatchAction>
                  <TableBatchAction
                    renderIcon={UpdateNow}
                    iconDescription="Ver detalles del elemento seleccionado"
                    onClick={() => onUpdate(objectName, selectedRows)}
                    tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                  >
                    Actualizar
                  </TableBatchAction>
                </TableBatchActions>
                <TableToolbarContent
                  aria-hidden={batchActionProps.shouldShowBatchActions}
                >
                  <TableToolbarSearch
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    onChange={onInputChange}
                  />
                  {/* <TableToolbarMenu
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  >
                    <TableToolbarAction onClick={handleOnRowAdd}>
                      Add row
                    </TableToolbarAction>
                    <TableToolbarAction onClick={handleOnHeaderAdd}>
                      Add header
                    </TableToolbarAction>
                  </TableToolbarMenu> */}
                  <Button
                    onClick={() => {
                      onCreateNewTabFromNewButton(objectName);
                    }}
                  >
                    {/* New Element Button */}
                    {objectName}
                  </Button>{" "}
                  {/* New Button  */}
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    {/* Remove TableExpandHeader */}
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
                        {header.header != "Content" && header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => {
                    return (
                      <TableRow key={row.id} {...getRowProps({ row })}>
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                          <TableCell key={cell.id}>
                            {!React.isValidElement(cell.value) && (
                              <div>{cell.value}</div>
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {/* Print out selected row */}
            </TableContainer>
          );
        }}
      />
    </div>
  );
};
