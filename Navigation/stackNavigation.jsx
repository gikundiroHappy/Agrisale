import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import Forgot from '../Screens/forgot';
import { Context } from '../Context/context';
import BottomNav from './Bottomnav';
import Register from '../Screens/SignUp';
import Details from '../Screens/description';
import Editprofile from '../Screens/Editprofile'
import FarmerBlog from '../Screens/farmer/farmerblog';
import Onboarding from '../Components/onboarding';
import Checkout from '../Screens/delivery';
import Editproduct from '../Screens/farmer/Editproduct';
import Productsposted from '../Screens/farmer/Productsposted';
import FavoritesScreen from '../Screens/FavoriteScreen';
import ProductsOrderded from '../Screens/farmer/ProductsOrderded';
import Orderdetail from '../Screens/farmer/Orderdetail';
import Checkorders from '../Screens/Checkorders';
import Allmyorders from '../Screens/Allmyorders';



const Stack = createNativeStackNavigator();

export default function StackNavigation() {

  const { isLog, logged} = useContext(Context)

  return (
    <NavigationContainer>

      <Stack.Navigator >

        {isLog == true ?
          (<>
            {logged == "farmer"  ? (
              <>
            <Stack.Screen name="farmer" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="editprofile" component={Editprofile} options={{ headerShown: false }} />
            <Stack.Screen name="farmerblog" component={FarmerBlog} options={{ headerShown: false }} />
            <Stack.Screen name="editproduct" component={Editproduct} options={{ headerShown: false }} />
            <Stack.Screen name="productsposted" component={Productsposted} options={{ headerShown: false }} />
            <Stack.Screen name="productsorders" component={ProductsOrderded} options={{ headerShown: false }} />
            <Stack.Screen name="orderdetail" component={Orderdetail} options={{ headerShown: false }} />
            <Stack.Screen name="favs" component={FavoritesScreen} options={{ headerShown: false }} />
            </>
            ) : null}
            {logged == "buyer" ? (
            <>
            <Stack.Screen name="buyer" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="detail" component={Details} options={{ headerShown: false }} />
            <Stack.Screen name="editprofile" component={Editprofile} options={{ headerShown: false }} />
            <Stack.Screen name="cartpage" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="delivery" component={Checkout} options={{headerShown:false}}/>
            <Stack.Screen name="favs" component={FavoritesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="checkorders" component={Checkorders} options={{ headerShown: false }} />
            <Stack.Screen name="allmyorders" component={Allmyorders} options={{ headerShown: false }} />

            </>
            ) : null}
            {logged == "plant pathologist" ? (
            <>
            <Stack.Screen name="agrono" component={BottomNav} options={{ headerShown: false }} />
            <Stack.Screen name="editprofile" component={Editprofile} options={{ headerShown: false }} /> 
            <Stack.Screen name="favs" component={FavoritesScreen} options={{ headerShown: false }} />
            <Stack.Screen name="farmerblog" component={FarmerBlog} options={{ headerShown: false }} />
            </>
            ) : null}
          </>) :
          (<>
            <Stack.Screen name="boards" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="forgot" component={Forgot} options={{ headerShown: false }} />
          </>)
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};