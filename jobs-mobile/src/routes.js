import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';


import Map from './pages/Map';
import Splash from './pages/Splash';
import SavedNannyProfile from './pages/SavedNannyProfile';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Signin from './pages/Signin';
import EditNannyProfile from './pages/EditNannyProfile';
import LikedNannies from './pages/LikedNannies';
import MainPageFamily from './pages/MainPageFamily';
import OpenWorks from './pages/OpenWorks';
import PastWorks from './pages/PastWorks';
import NannyReviews from './pages/NannyReviews';

const Routes = createAppContainer(
    createStackNavigator({
        SplashScreen: {
            screen: Splash,
            navigationOptions: {
                title: 'Super Nanny',
                headerShown: false
            }
        },
        Welcome: {
            screen: Welcome,
            navigationOptions: {
                title: 'Super Nanny',
                headerShown: false
            }
        },
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
            }
        },
        Signin: {
            screen: Signin,
            navigationOptions: {
                title: 'Sign In',
            },
        },
        EditNannyProfile: {
            screen: EditNannyProfile,
            navigationOptions: {
                title: 'Profile',
            },
        },
        MainPageFamily: {
            screen: MainPageFamily,
            navigationOptions: {
                title: 'Home',
                headerLeft: () => null
            },
        },
        OpenWorks: {
            screen: OpenWorks,
            navigationOptions: {
                title: 'Future Visits',
            },
        },
        PastWorks: {
            screen: PastWorks,
            navigationOptions: {
                title: 'History',
            },
        },
        NannyReviews: {
            screen: NannyReviews,
            navigationOptions: {
                title: 'Reviews',
            },
        },
        Map: {
            screen: Map,
            navigationOptions: {
                title: 'Super Nanny Map'
            }
        },
        SavedNannyProfile: {
            screen: SavedNannyProfile,
            navigationOptions: {
                title: 'Profile',
            },
        },
        LikedNannies: {
            screen: LikedNannies,
            navigationOptions: {
                title: 'Favorites',
            },
        }
    },
    {
        defaultNavigationOptions:{
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerTitleStyle:{
                fontFamily: 'mama'
            },
            headerStyle:{
                backgroundColor: '#8a6e6b',
            }
        }
    })
);
export default Routes;