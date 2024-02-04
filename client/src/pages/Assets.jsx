import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CreateAssetForm from '../features/assets/CreateAssetForm';
import { fetchAssets } from '../services/assetsApi';
import Tab from '../ui/Tab';
import TabContainer from '../ui/TabContainer';
import Toolbar from '../ui/Toolbar';
import ToolbarButton from '../ui/ToolbarButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const tableOptions = {
  equip: {
    headers: ['Make', 'Model', 'Description', 'Rate', ''],
    columnTemplate: '1fr 1fr 4fr 0.5fr 0.5fr',
  },
  rooms: {
    headers: ['Name', 'Location', 'Use', 'Price'],
    columnTemplate: '1fr 1fr 1fr 0.5fr',
  },
  personel: {
    headers: ['Name', 'Address', 'Phone', 'email', 'rate'],
    columnTemplate: '1.5fr 2fr 1fr 2fr 1fr',
  },
};

function Assets() {
  const [showForm, setShowForm] = useState(false);

  const location = useLocation();
  const currentPath = location.pathname.split('/');
  const category = currentPath[currentPath.length - 1];

  return (
    <Container>
      <Toolbar>
        <ToolbarButton onClick={() => setShowForm(!showForm)}>+</ToolbarButton>
      </Toolbar>
      {showForm && <CreateAssetForm category={category} />}
      <div>
        <TabContainer>
          <Tab route="./equip">Assets</Tab>
          <Tab route="./rooms">Rooms</Tab>
          <Tab route="./personel">People</Tab>
        </TabContainer>
        <Outlet context={{ tableOptions, category }} />
      </div>
    </Container>
  );
}

export default Assets;
