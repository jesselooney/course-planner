import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import CourseSearch from '../CourseSearch'

import './style.css'

function TabMenu() {
  return (
    <Tabs className="TabMenu">
      <TabList className="TabMenu__Tabs">
        <Tab className="TabMenu__Tabs__Tab">Courses</Tab>
        <Tab className="TabMenu__Tabs__Tab">Course Requirements</Tab>
        <Tab className="TabMenu__Tabs__Tab">Graduation Requirements</Tab>
      </TabList>

      <TabPanel>
        <CourseSearch />
      </TabPanel>
      <TabPanel>Course reqs</TabPanel>
      <TabPanel>Grad reqs</TabPanel>
    </Tabs>
  )
}

export default TabMenu
