import { Outlet } from 'react-router-dom';
import Tab from '../ui/Tab';
import TabContainer from '../ui/TabContainer';

function Assets() {
  return (
    <>
      <TabContainer>
        <Tab route="./equip">Assets</Tab>
        <Tab route="./rooms">Rooms</Tab>
        <Tab route="./people">People</Tab>
      </TabContainer>
      <div>Assets page</div>
      <Outlet />
    </>
  );
}

export default Assets;
