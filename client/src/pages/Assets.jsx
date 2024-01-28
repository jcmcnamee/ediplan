import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import CreateAssetForm from '../features/assets/CreateAssetForm';
import { fetchEquip } from '../services/assetsApi';
import Tab from '../ui/Tab';
import TabContainer from '../ui/TabContainer';
import Toolbar from '../ui/Toolbar';
import ToolbarButton from '../ui/ToolbarButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Assets() {
  const [showForm, setShowForm] = useState(false);
  
  const location = useLocation();
  const currentPath = location.pathname.split('/');
  const currentCategory = currentPath[currentPath.length - 1];
  console.log(`Current category: ${currentCategory}`);

  

  return (
    <Container>
      <Toolbar>
        <ToolbarButton onClick={() => setShowForm(!showForm)}>+</ToolbarButton>
      </Toolbar>
      {showForm && <CreateAssetForm category={currentCategory} />}
      <div>
        <TabContainer>
          <Tab route="./equip">Assets</Tab>
          <Tab route="./rooms">Rooms</Tab>
          <Tab route="./people">People</Tab>
        </TabContainer>
        <Outlet />
      </div>
    </Container>
  );
}

export default Assets;
