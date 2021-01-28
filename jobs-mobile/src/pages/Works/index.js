import React, {useState} from 'react';
import { View, Dimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import OpenWorks from '../OpenWorks';
import PastWorks from '../PastWorks';
import styles from './styles';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample({navigation}) {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'open', title: 'Future Works' },
    { key: 'past', title: 'Past works' },
  ]);

  const renderTabBar = props => (
      <TabBar 
        {...props}
        activeColor='#f7c3d6'
        inactiveColor = '#444'
        labelStyle={{fontFamily: 'Montserrat-Medium'}}
        indicatorStyle={{ backgroundColor: '#f7c3d6' }}
        style={{ backgroundColor: '#d16088' }} />
  )
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'open':
        return <OpenWorks navigation={navigation} />;
      case 'past':
        return <PastWorks navigation={navigation}/>;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}