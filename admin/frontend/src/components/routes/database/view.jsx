import React, { useState } from 'react';
import { Tabs } from 'rsuite';
import User from '../../tables/User';
import Spotting from '../../tables/Spotting';
import Sudoku from '../../tables/Sudoku';
import Match from '../../tables/Match';
import King from '../../tables/King';

function MainLayout() {
  const [activeTab, setActiveTab] = useState('user');

  const adminTabs = [
    { key: 'user', title: 'Пользователи', component: <User /> },
    { key: 'sudoku', title: 'Судоку', component: <Sudoku /> },
    { key: 'spotting', title: '15', component: <Spotting /> },
    { key: 'match', title: '3 в ряд', component: <Match /> },
    { key: 'king', title: 'Кинг Конг', component: <King /> },
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
