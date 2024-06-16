import {
  Outlet,
  redirect,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';

import styled from 'styled-components';

import Tab from '../ui/Tab';
import TabContainer from '../ui/TabContainer';
import Toolbar from '../ui/Toolbar';
import ToolbarPanel from '../ui/ToolbarPanel';
import AddAsset from '../features/assets/AddAsset';
import { useAssets } from '../features/assets/useAssets';
import Spinner from '../ui/Spinner';
import { useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function Assets() {
  const navigate = useNavigate();
  const { category } = useParams();
  console.log('Assets.jsx render. category: ', category);

  useEffect(() => {
    if (!category) {
      navigate('equipment');
    }
  }, [category, navigate]);

  const { data: assets, error, isPending } = useAssets(category);

  if (error) return <div>{error}</div>;
  if (isPending || !category) return <Spinner />;

  return (
    <Container>
      <Toolbar>
        <Toolbar.Panel side="left">
          <AddAsset category={category} />
        </Toolbar.Panel>
        <ToolbarPanel side="right"></ToolbarPanel>
      </Toolbar>
      <div>
        <TabContainer>
          <Tab route="./equipment">Assets</Tab>
          <Tab route="./rooms">Rooms</Tab>
          <Tab route="./personel">People</Tab>
        </TabContainer>
        {/* This renders an AssetTable componenet on each route */}
        <Outlet context={{ category }} />
      </div>
    </Container>
  );
}

export default Assets;
