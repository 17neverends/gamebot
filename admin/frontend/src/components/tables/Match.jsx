import React, { useState, useEffect } from 'react';
import { CustomTable } from "../../pages/CustomTable";
import { get_table_info } from '../../api/get_info';
import {created_at, updated_at} from '../../utils/time_mixin';

let columnsConfig = [
  { key: 'id', label: 'ID', width: 100, align: 'center', fixed: true},
  { key: 'user_id', label: 'User ID', width: 100, type: "numeric"},
  { key: 'entry_date', label: 'Дата входа', width: 300, type: "varchar"},
  { key: 'device', label: 'Устройство (ОС)', width: 300, type: "varchar"},
  { key: 'language', label: 'Язык (ТГ)', width: 300, type: "varchar"}
];

columnsConfig.push(created_at);
columnsConfig.push(updated_at);

const Match = () => {
  const [data, setData] = useState([]);
  const tablename = 'match';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await get_table_info({ table: tablename });
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <CustomTable
      tableName={tablename}
      addFromFile={true}
      columnsConfig={columnsConfig}
      data={data}
      setData={setData}
      filtered={true}
    />
  );
};

export default Match;