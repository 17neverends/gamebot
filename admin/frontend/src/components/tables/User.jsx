import React, { useState, useEffect } from 'react';
import { CustomTable } from "../../pages/CustomTable";
import { get_table_info } from '../../api/get_info';
import {created_at, updated_at} from '../../utils/time_mixin';

let columnsConfig = [
  { key: 'id', label: 'ID', width: 100, align: 'center', fixed: true},
  { key: 'tg_id', label: 'TG ID', width: 100, type: "numeric"},
  { key: 'username', label: 'Ник', width: 200, type: "varchar"},
  { key: 'comings_from', label: 'Откуда пришел', width: 200, type: "varchar"},
  { key: 'visits_count', label: 'Сколько раз заходил', width: 300, type: "numeric"},
  { key: 'referal_count', label: 'Привел пользователей', width: 300, type: "numeric"},
  { key: 'total_time', label: 'Время в боте', width: 300, type: "numeric"},
  { key: 'exit_counts', label: 'Кол-во отказов', width: 300, type: "numeric"},
  { key: 'blocked', label: 'Заблокирован?', width: 200, type: "boolean"},
];

columnsConfig.push(created_at);
columnsConfig.push(updated_at);

const User = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tablename = 'user';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await get_table_info({ table: tablename });
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
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
      isLoading={loading}
      filtered={true}
    />
  );
};

export default User;
