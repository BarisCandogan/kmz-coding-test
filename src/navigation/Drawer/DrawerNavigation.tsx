import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from '../../screens/Home/HomeScreen';
import axios from 'axios';
import {Categories} from '../../models/category';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../Main/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/reduxHooks';
import {getCategory} from '../../store/Category/CategorySlice';

export type RootStackDrawerParamList = {
  Categoriler: undefined;
};

type homeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;
const Stack = createDrawerNavigator<RootStackDrawerParamList>();

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const [category, setCategory] = useState<Categories[]>([]);
  const navigation = useNavigation<homeScreenProp>();
  const dispatch = useAppDispatch();

  const onCategoryPressed = (id: number) => {
    console.log(id);

    axios({
      method: 'get',
      url: `https://apiv5.akilliticaretim.com/api/v5/ad/product/categories?parentId=${id}`,
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    }).then(response => {
      dispatch(getCategory(response.data.data.categories));
      navigation.navigate('Category');
    });
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://apiv5.akilliticaretim.com/api/v5/ad/product/categories',
      headers: {
        GUID: '24BE-DB0E-D75E-4060',
      },
    })
      .then(response => {
        setCategory(response.data.data.categories);
      })
      .catch(error => console.log(error));
  }, []);

  const drawerMenu = () => {
    return (
      <>
        <View style={{marginTop: 50}}>
          {category?.map((item, index) => {
            return (
              <Pressable
                key={item.id}
                style={[
                  styles.categoryContainer,
                  {borderTopWidth: index === 0 ? 1 : 0},
                ]}
                onPress={() => onCategoryPressed(item.id)}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#585959',
                    margin: 17,
                  }}>
                  {item.categoryName}
                </Text>
                <AntDesign
                  name="right"
                  size={18}
                  style={{color: 'grey', marginRight: 10}}
                />
              </Pressable>
            );
          })}
        </View>
      </>
    );
  };
  return (
    <>
      <Drawer.Navigator
        screenOptions={{
          headerTintColor: 'grey',
          headerTitleStyle: {color: '#ff6f36', fontSize: 25},
          drawerStyle: {
            width: '100%',
          },
        }}
        drawerContent={drawerMenu}
        initialRouteName="Home">
        <Stack.Screen name="Categoriler" component={HomeScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  text: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
