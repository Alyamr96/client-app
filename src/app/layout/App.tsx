import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  var myActivities: Activity[] = [
    {
      id: 'myId',
      title: 'title',
      date: '1/1/2022',
      description: 'desc',
      category: 'cat',
      city: 'giza',
      venue: 'sheikh zayed'
    },
    {
      id: 'myId1',
      title: 'title1',
      date: '1/2/2022',
      description: 'desc1',
      category: 'cat1',
      city: 'giza1',
      venue: 'sheikh zayed1'
    }
];

  const [activities, setActivities] = useState<Activity[]>(myActivities);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:7194/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  function handleSelectActivity(id: string){
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity(){
    setSelectedActivity(undefined);
  }

  return (
    <Fragment>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
          <ActivityDashboard activities = {activities} 
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity = {handleCancelSelectActivity}
          />
      </Container>
    </Fragment>
  );
}

export default App;
