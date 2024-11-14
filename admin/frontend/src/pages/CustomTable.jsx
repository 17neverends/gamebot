import React, { useState } from 'react';
import { Table, TagPicker, Notification, DatePicker, toaster, Button, Pagination, SelectPicker } from 'rsuite';
import DetailModal from '../components/modal/DetailModal';
import { get_table_info, get_filtered_table_info } from '../api/get_info';
import { formatDate } from '../utils/format';
const { Column, HeaderCell, Cell } = Table;

export const CustomTable = ({ tableName, columnsConfig, data, setData, isLoading, filtered = false }) => {
  const [columnKeys, setColumnKeys] = useState(columnsConfig.map(column => column.key));
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [filteredData, setFilteredData] = useState(data);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const selectedColumns = columnsConfig.filter(column => columnKeys.includes(column.key));
  const isButtonDisabled = !startDate || !endDate;

  const showNotification = (message) => {
    toaster.push(<Notification type="error" duration={2000} header="Ошибка">{message}</Notification>, { placement: 'topEnd' });
  };

  const handleStartDateChange = (date) => {
    if (endDate && date > endDate) {
      showNotification('Начальная дата не может быть больше конечной даты');
      return;
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (startDate && date < startDate) {
      showNotification('Конечная дата не может быть меньше начальной даты');
      return;
    }
    if (startDate && date.toDateString() === startDate.toDateString()) {
      showNotification('Нельзя выбирать одну и ту же дату');
      return;
    }
    setEndDate(date);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    setDetailModalOpen(true);
  };


  const CustomCell = (props) => {
    const { dataKey, rowData, ...rest } = props;

    const renderCellValue = (value) => {
      if (typeof value === 'boolean') {
        return value ? '+' : '-';
      }
      return value;
    };
    
    return <Cell {...rest}>{renderCellValue(rowData[dataKey])}</Cell>;
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setPage(1);
    setLimit(newLimit);
  };

  let paginatedData = data.slice((page - 1) * limit, page * limit);


  const handleSubmit = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    try {
      const jsonData = await get_filtered_table_info({ table: tableName, start_date: formattedStartDate, end_date: formattedEndDate });
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleResetFilters = async () => {
    setStartDate(null);
    setEndDate(null);
    try {
      const jsonData = await get_table_info({ table: tableName });
      setData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "1rem", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        Поля для отображения:
        <TagPicker
          style={{ marginLeft: "1rem" }}
          data={columnsConfig}
          labelKey="label"
          valueKey="key"
          value={columnKeys}
          onChange={setColumnKeys}
          cleanable={false}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginTop: "1rem" }}>
        <span>Показывать по:</span>
        <SelectPicker
          data={[
            { label: '10', value: 10 },
            { label: '20', value: 20 },
            { label: '30', value: 30 },
            { label: '50', value: 50 },
          ]}
          value={limit}
          onChange={handleLimitChange}
          cleanable={false}
          style={{ width: 120 }}
        />
        {filtered && <>
        <DatePicker 
          placeholder="Начальная дата"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <DatePicker
          placeholder="Конечная дата"
          value={endDate}
          onChange={handleEndDateChange}
        />

        <Button 
          appearance="primary" 
          onClick={handleSubmit} 
          disabled={isButtonDisabled}
        >
          Отправить
        </Button>

        <Button 
          appearance="default" 
          onClick={handleResetFilters}
        >
          Сбросить фильтры
        </Button>
        </>}
      </div>

      <div>
        <Table
          loading={isLoading}
          hover
          showHeader
          autoHeight
          data={paginatedData}
          bordered
          cellBordered
          headerHeight={40}
          rowHeight={46}
          style={{ marginTop: "1rem" }}
          onRowClick={handleRowClick}
        >
          {selectedColumns.map(column => {
            const { key, ...otherProps } = column;
            return (
              <Column key={key} {...otherProps}>
                <HeaderCell>{column.label}</HeaderCell>
                <CustomCell dataKey={column.key} />
              </Column>
            );
          })}
        </Table>
      </div>

      <Pagination
        ellipsis
        prev
        next
        first
        last
        style={{ marginTop: '1rem', textAlign: 'right' }}
        total={data.length}
        limit={limit}
        activePage={page}
        onChangePage={handlePageChange}
        onChangeLimit={handleLimitChange}
        limitOptions={[10, 20, 30, 50]}
      />

      {detailModalOpen && selectedRow && (
        <DetailModal
          open={detailModalOpen}
          onClose={() => setDetailModalOpen(false)}
          data={selectedRow}
          columnsConfig={columnsConfig}
        />
      )}
    </div>
  );
};
