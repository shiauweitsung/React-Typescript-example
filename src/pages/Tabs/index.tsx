import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

// https://www.npmjs.com/package/react-tabs
export default function NavTabs() {
  return (
    <Tabs
      defaultFocus
      defaultIndex={2}
      //   selectedIndex={3}
      onSelect={(index, last) => {
        console.log(index, last, 'select');
      }}
    >
      <TabList>
        <Tab
          onClick={() => {
            console.log('1');
          }}
        >
          Title 1
        </Tab>
        <Tab>Title 2</Tab>
        <Tab>Title 3</Tab>
        <Tab>Title 4</Tab>
        <p>123</p>
      </TabList>

      <TabPanel>
        <h2>Any content 1</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 2</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 3</h2>
      </TabPanel>
      <TabPanel>
        <h2>Any content 4</h2>
      </TabPanel>
    </Tabs>
  );
}
