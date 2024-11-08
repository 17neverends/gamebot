import React, { useState } from 'react';
import { Tabs } from 'rsuite';
import User from '../../tables/User';
import Spotting from '../../tables/Spotting';
import Sudoku from '../../tables/Sudoku';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('client');

  const adminTabs = [
    { key: 'user', title: 'Пользователи', component: <User /> },
    { key: 'sudoku', title: 'Судоку', component: <Sudoku /> },
    { key: 'spotting', title: '15', component: <Spotting /> },
  ];

  return (
    <div>
      <Tabs activeKey={activeTab} onSelect={setActiveTab} appearance="pills">
        {adminTabs.map(({ key, title, component }) => (
          <Tabs.Tab key={key} eventKey={key} title={title}>
            <div style={{ padding: 20 }}>
              {component}
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
}

export default MainLayout;
